import React, { useEffect, useState } from "react";
import logoColor from "../assets/logo/svg/logo-no-background.svg";

import { BiLogInCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSubmit = async (e) => {


    e.preventDefault();
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
    <div>
      <div className="container max-w-xl mx-auto">
        <h1 className="text-5xl font-extrabold  mt-20 flex justify-center">
          Login <BiLogInCircle />
        </h1>

        <form action="" className="px-5 mt-10" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-md   text-gray-700 ">Email</label>
            <input
              type="email"
              placeholder="ramesh@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>

          <div className="">
            <label
              htmlFor="password"
              className="block mb-2 text-md   text-gray-700 "
            >
              Password
            </label>
            <input
              type="password"
              placeholder="password"
              className=" border border-gray-300 outline-none focus:border-gray-600  text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-5">
            <button
              type="submit"
              value="Login"
              className=" btn btn-primary text-white rounded-lg block w-full p-2.5 "
            >
              Login
            </button>
          </div>

          <div className="text-center mt-5">
            <p>Don't have an account ? </p>
            <Link to="/register" className="text-blue-700 mt-2 block">
              Signup Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
