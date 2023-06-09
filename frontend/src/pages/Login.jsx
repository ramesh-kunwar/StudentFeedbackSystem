import React, { useEffect, useState } from "react";
import logoColor from "../assets/logo/svg/logo-no-background.svg";
import "./Login.scss";
import { BiLogInCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(email, "ad");
    console.log(password, "ad");
    // e.preventDefault();
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

        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="ramesh@gmail.com"
              // onChange={(e) => setEmail(e.target.value)}
              {...register("email", { required: true })}
            />
            {errors.email?.type === "required" && (
              <p className="text-danger text-italic mt-1">Email is required</p>
            )}
          </div>

          <div className="form-item">
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="form-control"
              // onChange={(e) => setPassword(e.target.value)}
              {...register("password", { required: true })}
            />
            {errors.password?.type === "required" && (
              <p className="text-danger text-italic mt-1">
                Password is required
              </p>
            )}
          </div>

          <div className="form-item">
            <input type="submit" value="Login" />
          </div>

          <div className="sign-up-message">
            <p>Don't have an account ? </p>
            <Link to="/register">Signup Here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
