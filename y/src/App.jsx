import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import Twitter from "./Twitter";
import TwitterPostingPage from "./Twitterpostpage";


function App() {
  return (
    <div className="App">
      {/* <Navbar/> */}
      <BrowserRouter>
      <Routes>
      
        <Route path='/' element={<Home />}/>
        <Route path='/Twitter' element = {<Twitter/>}/>
        <Route path='/Twitter/Authenticated' element= {<TwitterPostingPage/>}/>
      </Routes>
      </BrowserRouter>
  
    </div>
  );
}

export default App;
