import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoIosCreate, IoMdCodeWorking } from "react-icons/io";
import axios, { Axios } from "axios";
import {
  useCreateTeacherMutation,
  useUploadTeacherImageMutation,
} from "../../slices/teacherApiSlice";
import { useDispatch } from "react-redux";
import { setTeachers } from "../../slices/teacherSlice";
import { toast } from "react-toastify";

import { motion } from "framer-motion";

const CreateTeacherForm = ({ isFormOpen, setIsFormOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coursesTaught, setCoursesTaught] = useState([]);
  const [image, setImage] = useState("");
  const dispatch = useDispatch();

  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  const [uploadTeacherImage, { isLoading: loadingUpload }] =
    useUploadTeacherImageMutation();
 
  function handleCourse(e) {
    const text = e.target.value;
    const splittedText = text.split(",");
    setCoursesTaught(splittedText);
  }

  const createTeacherHandler = async (e) => {
    e.preventDefault();

    try {
      await createTeacher({
        name,
        description,
        coursesTaught,
        image,
      }).unwrap();

      // dispatch(setTeachers({ ...res }));
      toast.success("Teacher Added Successfully");

      setName("");
      setDescription("");
      setCoursesTaught("");

    } catch (error) {
      toast.error(error.data.error);
      console.log(error?.data?.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadTeacherImage(formData).unwrap();
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: "0.5%" }}
        animate={{ opacity: 1, y: "0%" }}
        transition={{ duration: 0.5 }}
      >
        <div className="container max-w-xl mx-auto">
          <h1 className="text-5xl font-extrabold  mt-20 flex justify-center">
            Create Teacher <IoIosCreate />
          </h1>

          <form
            method="POST"
            className="px-5 mt-10"
            onSubmit={createTeacherHandler}
          >
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Teacher Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                className=" border border-gray-300 outline-none focus:border-gray-600  text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="teacherDetails"
                className="block mb-2 text-md   text-gray-700 "
              >
                Teacher Details
              </label>

              <textarea
              value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="message"
                rows="4"
                class="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>

            <div className="mb-6">
              <input
                type="text"
                value={image}
                hidden
                onChange={(e) => setImage(e.target.value)}
              />
              <label className="block mb-2 text-md   text-gray-700 ">
                Upload Image
              </label>
              <input
                type="file"
                onChange={uploadFileHandler}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
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
      </motion.div>
    </>
  );
};

export default CreateTeacherForm;
