import React from "react";
import "./NavProfileToggle.scss";
import { Link } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
const NavProfileToggle = ({ userInfo }) => {
  return (
    <div>
      <ul className="nav-toggle-profile">
        <Link to={"/profile"}>
          <div className="icon">
            <FaUserCircle className="profile-icon" />
          </div>
          {userInfo?.data?.name}
        </Link>

        <Link to={"/logout"}>
          <div className="icon">
            <RiLogoutCircleRLine />
          </div>
          LogOut
        </Link>
      </ul>
    </div>
  );
};

export default NavProfileToggle;
