import React from "react";
import logoColor from "../assets/logo/svg/logo-no-background.svg";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-screen ">
      <div className="item-left  ">
        <img src={logoColor} alt="" className="logo-color" />
      </div>
      <div className="item-right ">
        <h1>Login</h1>

        <form action="">
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="john@gmail.com"
            />
          </div>

          <div className="form-item">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="form-control"
              placeholder="password"
            />
          </div>

          <div className="form-item">
            <input type="submit" value="Login" />
          </div>

          <div className="sign-up-message">
            <p>Don't have an account ? </p>
            <a href="#">Signup Here</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;