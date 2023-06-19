import React from "react";
import "./NavProfileToggle.scss";
import { Link, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { useLogoutMutation } from "../../slices/userApiSlice";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { toast } from "react-toastify";
const NavProfileToggle = ({ userInfo }) => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(userInfo);
  const handleLogout = async () => {
    console.log("logout");
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logout Successful");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <ul className="nav-toggle-profile">
        {userInfo?.data?.role === "admin" ? (
          <Link to={"/admin/dashboard"}>
            <div className="icon">
              <FaUserCircle className="profile-icon" />
            </div>
            {userInfo?.data?.name}
          </Link>
        ) : (
          <Link to={"/user/profile"}>
            <div className="icon">
              <FaUserCircle className="profile-icon" />
            </div>
            {userInfo?.data?.name}
          </Link>
        )}

        <Link to={"/logout"} onClick={handleLogout}>
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
