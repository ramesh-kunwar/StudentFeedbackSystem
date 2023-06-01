import React from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

const App = () => {
  return (
    <div className="">
      <Navbar />
      {/* <Login /> */}
      <Outlet />
    </div>
  );
};

export default App;
