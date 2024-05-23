import React from "react";
import Navbar from "./Navbar";
import TwitterLike from "./Twitterlike";



const Twitter = () => {
  return (
    <div>
    <Navbar/>
    <div>
      <h1 id="twittertitle">SIGN IN/LOG IN TO TWITTER</h1>
    </div>
    <TwitterLike/>
  
    </div>
  );
};

export default Twitter;
