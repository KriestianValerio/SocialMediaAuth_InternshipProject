import React from "react";
import Navbar from "./Navbar";
import Boxone from "./Box1";
import Boxtwo from "./Box2";


const Home = () => {
  return (
    <div>
      <Navbar/>
      <div className="titlebox">
        <h1>Social Media Analysis</h1>
      </div>
      <div className="container">
        <div className="box">
          <Boxone/></div>
        <div className="box"><Boxtwo/></div>
       
      </div>
    </div>
  );
};

export default Home;