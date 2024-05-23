import React from 'react';

function TwitterLike() {
  return (
    <div className="TwitterLike">
      <div>
        <a href="http://localhost:5000/auth/twitter" className='logintwitter'>Log in with Twitter</a>
      </div>
      <div>
        <img id="twitterimage" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/512px-Logo_of_Twitter.svg.png?20220821125553" alt="Twitter Logo" />
      </div>
    </div>
  );
}

export default TwitterLike;