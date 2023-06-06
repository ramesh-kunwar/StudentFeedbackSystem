import React, { useEffect, useState } from "react";
import logoColor from "../assets/logo/svg/logo-no-background.svg";
import "./Register.scss";
import { IoArrowForwardCircleOutline, IoCreateOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";

import { toast } from "react-toastify";
import { useRegisterMutation } from "../slices/userApiSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useDispatch((state) => state.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate("/teachers");
    }
  }, []);
  const [register] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User Registered Successfully");
      navigate("/teachers");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || error.error);
    }
  };
  return (
    <div className="register-screen ">
      <div className="register-container ">
        <h1>
          Register
          <IoCreateOutline />
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="form-item">
            <label htmlFor="name">name</label>
            <input
              type="name"
              className="form-control"
              placeholder="ramesh"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="ramesh@gmail.com"
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
            <input type="submit" value="Register" />
          </div>

          <div className="sign-up-message">
            <p>Already have an account ? </p>
            <Link to="/login">Login Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
