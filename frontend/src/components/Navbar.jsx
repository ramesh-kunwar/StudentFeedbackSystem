import React from "react";
import "./Navbar.css"
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="nav-wrapper">
          <div className="nav-logo">
            <h3>Feedback Loop</h3>
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <a href="/login">Login</a>
              </li>
              <li>
                <a href="/teachers">All Teachers</a>
              </li>
              <li>
                <a href="#">Login</a>
              </li>
              <li>
                <a href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
