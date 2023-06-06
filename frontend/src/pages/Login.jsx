import React, { useEffect, useState } from "react";
import logoColor from "../assets/logo/svg/logo-no-background.svg";
import "./Login.scss";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";

import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Login Success");
      navigate("/teachers");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.data.error);
    }
  };
  return (
    <div className="login-screen ">
      <div className="login-container ">
        <h1>
          Login
          <BiLogInCircle />
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="john@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-item">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
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
