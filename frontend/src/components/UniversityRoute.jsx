import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer autoClose={1500} />
      {userInfo && userInfo?.data?.role === "university" ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <div className=" container mx-auto flex place-items-center h-screen justify-center">
          <div>
            <h1 className="text-6xl font-bold ">
              This Page Can Be Only Accessed By University
            </h1>
            <div className="flex gap-4 text-center justify-center mt-8">
              <Link to="/teachers">
                <button className=" block shadow-md px-4 py-3 md:px-8 md:py-4 btn btn-primary text-white rounded-lg md:rounded-xl">
                  View Teachers
                </button>
              </Link>
              <Link to={"/semester"}>
                <button className=" block shadow-md px-4 py-3 md:px-8 md:py-4 btn bg-orange-600 hover:bg-orange-500 text-white rounded-lg md:rounded-xl">
                  View Semester
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminRoute;
