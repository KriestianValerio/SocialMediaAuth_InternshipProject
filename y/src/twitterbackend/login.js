import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import { Strategy as TwitterStrategy } from 'passport-twitter';
import dotenv from 'dotenv';
import Twitter from 'twitter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:5173', // Update this to match your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(session({ 
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false, 
  saveUninitialized: false,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:5000/auth/twitter/callback",
    includeEmail: true
  },
  function(token, tokenSecret, profile, done) {
    profile.token = token;
    profile.tokenSecret = tokenSecret;
    return done(null, profile);
  }
));

app.get('/auth/twitter', passport.authenticate('twitter', { scope: ['email', 'dm_read'] }));

app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res) => {
  res.redirect('http://localhost:5173/Twitter/Authenticated');
});

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ redirect: 'http://localhost:5173/Twitter' }); // Send the redirect URL in the response
  });
});

app.get('/auth/status', (req, res) => {
  console.log('Auth status request received');
  if (req.isAuthenticated()) {
    console.log('User is authenticated');
    res.json({ authenticated: true });
  } else {
    console.log('User is not authenticated');
    res.json({ authenticated: false });
  }
});

app.post('/tweet', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const tweet = req.body.tweet;

  
  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  client.post('statuses/update', { status: tweet }, (error, tweet, response) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: 'Tweet posted successfully' });
  });
});

app.get('/likes', async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  try {
    const params = { screen_name: 'KriestianS97621', count: 200 }; // Adjust count as needed
    const tweets = await client.get('favorites/list', params);
    let totalLikes = 0;
    tweets.forEach(tweet => {
      totalLikes += tweet.favorite_count;
    });
    res.json({ totalLikes });
  } catch (error) {
    console.error('Error getting total likes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});