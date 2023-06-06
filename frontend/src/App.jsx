import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return (
    <div className="">
      <Navbar />
      {/* <Login /> */}
      <Outlet />
      <ToastContainer />
    </div>
  );
};

export default App;
