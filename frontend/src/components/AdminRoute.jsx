import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer autoClose={1500} />
      {userInfo && userInfo?.data?.role === "admin" ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <h1>Not allowed to access this route</h1>
      )}
    </>
  );
};

export default AdminRoute;
