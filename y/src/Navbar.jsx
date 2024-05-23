import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
          <a href="/Twitter">Twitter</a>
          <a href="/Instagram">Instagram</a>
          <a href="/Facebook">Facebook</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
