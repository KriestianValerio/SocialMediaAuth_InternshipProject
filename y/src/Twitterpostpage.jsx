import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TwitterPostingPage() {
  const [tweet, setTweet] = useState('');
  const [message, setMessage] = useState('');
  const [totalLikes, setTotalLikes] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/status', { withCredentials: true })
      .then(response => {
        setIsAuthenticated(response.data.authenticated);
      })
      .catch(error => {
        console.error('Error during authentication check:', error);
      });
  }, []);

  const handleTweetChange = (event) => {
    setTweet(event.target.value);
  };

  const handleTweetSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:5000/tweet', { tweet }, { withCredentials: true })
      .then(response => {
        setMessage(response.data.message);
        setTweet('');
      })
      .catch(error => {
        console.error('Error posting tweet:', error);
        setMessage('Error posting tweet: ' + error.message);
      });
  };

  const handleGetLikes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/likes', { withCredentials: true });
      setTotalLikes(response.data.totalLikes);
    } catch (error) {
      console.error('Error getting total likes:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:5000/logout');
      setIsAuthenticated(false);
      if (response.data.redirect) {
        window.location.href = response.data.redirect; // Redirect to the specified URL
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!isAuthenticated) {
    return <p>Please login to Twitter to access this page.</p>;
  }

  return (
    <div className="TwitterPostingPage">
      <h1>Post a Tweet</h1>
      <form onSubmit={handleTweetSubmit} className="tweetbox">
        <textarea className='textarea'
          value={tweet}
          onChange={handleTweetChange}
          placeholder="What's happening?"
          rows="20"
          cols="200"
        />
        <button type="submit" className='submitbutton'>Tweet</button>
      </form>
      <p>{message}</p>
      <button onClick={handleGetLikes} className='getlikebutton'>Get Total Likes</button>
      {totalLikes !== null && <p>Total Likes: {totalLikes}</p>}
      <button onClick={handleLogout} className='logoutbutton'>Logout</button>
    </div>
  );
}

export default TwitterPostingPage;