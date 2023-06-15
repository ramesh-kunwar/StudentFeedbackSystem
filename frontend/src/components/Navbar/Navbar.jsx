import React, { useState } from "react";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { FaUserCircle } from "react-icons/fa";
// import { BiSolidDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { useSelector } from "react-redux";
import NavProfileToggle from "./NavProfileToggle";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <>
      <div className="nav px-6  md:py-4 md:px-20">
        <div className="">
          <div className="nav-wrapper">
            <div className="nav-logo">
              <h3>
                <Link>Feedback Loop</Link>
              </h3>
              <div className="toggleMenu">
                <a href="#" onClick={() => setToggleMenu(!toggleMenu)}>
                  {toggleMenu ? <CgMenuLeft /> : <GrClose />}
                </a>
              </div>
            </div>
            <div className="nav-links">
              <ul className={toggleMenu ? "close" : ""}>
                <Link to="/teachers">All Teachers</Link>

                <Link to="/semester">Semester</Link>

                {userInfo ? (
                  <Link
                    to={"#"}
                    onClick={() => setToggleProfile(!toggleProfile)}
                  >
                    <FaUserCircle className="profile-icon" />
                  </Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {toggleProfile ? <NavProfileToggle userInfo={userInfo} /> : null}
    </>
  );
};

export default Navbar;
