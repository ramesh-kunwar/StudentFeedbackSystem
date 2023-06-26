import React, { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <div className="">
      {/* <img src={"/uploads/image-1687785246489.jpeg"} alt="" /> */}
      <Navbar />
      <Outlet />
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default App;
