import React, { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import {Link} from 'react-router-dom'
import "./Navbar.scss";
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);


  return (
    <div className="navbar">
      <div className="">
        <div className="nav-wrapper">
          <div className="nav-logo">
            <h3>Feedback Loop</h3>
            <div className="toggleMenu">
              <a href="#" onClick={() => setToggleMenu(!toggleMenu)}>
                {toggleMenu ? <CgMenuLeft /> : <GrClose />}
              </a>
            </div>
          </div>
          <div className="nav-links">
            <ul className={toggleMenu ? "close" : ""}>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/teachers">All Teachers</Link>
              </li>
              <li>
                <Link to="#">Login</Link>
              </li>
              <li>
                <Link to="#">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
