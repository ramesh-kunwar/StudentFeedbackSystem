import React, { useState } from "react";

import { IoIosCreate, IoMdCodeWorking } from "react-icons/io";

import { motion } from "framer-motion";
import SemesterDetails from "../Semester/SemesterDetails";
import { useCreateSemesterMutation } from "../../slices/semesterApiSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateSemesterForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coursesTaught, setCoursesTaught] = useState([]);

  const navigate = useNavigate();
  // handle change four course Taught
  function handleCourse(e) {
    const text = e.target.value;
    const splittedText = text.split(",");
    setCoursesTaught(splittedText);
  }

  const [createSemester] = useCreateSemesterMutation();

  const createSemesterHandler = async (e) => {
    e.preventDefault();
    try {
      await createSemester({ name, description, coursesTaught }).unwrap();
      toast.success("Semester created successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/university/dashboard");
      console.log("Semester created successfully");
    } catch (error) {
      toast.error(error.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error.data.error, 'e');
    }
  };
  return (
    <>
      <div className="container max-w-xl mx-auto">
        <h1 className="text-5xl font-extrabold  mt-20 flex justify-center">
          Create Semester <IoIosCreate />
        </h1>

        <form onSubmit={createSemesterHandler} className="px-5 mt-10">
          <div className="mb-6">
            <label className="block mb-2 text-md   text-gray-700 ">
              Semester Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First Semester"
              className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="teacherDetails"
              className="block mb-2 text-md   text-gray-700  "
            >
              Courses Taught{" "}
              <span className="text-red-600 italic">
                (Separate using comma)
              </span>
            </label>
            <input
              type="text"
              name="coursesTaught"
              value={coursesTaught}
              onChange={handleCourse}
              placeholder="Python, Java, DSA"
              className=" border border-gray-300 outline-none focus:border-gray-600  text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="teacherDetails"
              className="block mb-2 text-md   text-gray-700 "
            >
              Semester Details
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="message"
              rows="4"
              className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="Write semester details here..."
            ></textarea>
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className=" btn btn-primary text-white rounded-lg block w-full p-2.5 "
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateSemesterForm;
