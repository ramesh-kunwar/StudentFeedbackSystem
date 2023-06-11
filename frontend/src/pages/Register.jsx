import React, { useEffect, useState } from "react";
import logoColor from "../assets/logo/svg/logo-no-background.svg";
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
    <div>
      <div className="container max-w-xl mx-auto">
        <h1 className="text-5xl font-extrabold  mt-20 flex justify-center">
          Register <IoCreateOutline />
        </h1>

        <form action="" className="px-5 mt-10" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-md   text-gray-700 ">Name</label>
            <input
              type="name"
              placeholder="ramesh"
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
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
              Register
            </button>
          </div>

          <div className="text-center mt-5">
            <p>Already have an account ? </p>
            <Link to="/login" className="text-blue-700 mt-2 block">
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
