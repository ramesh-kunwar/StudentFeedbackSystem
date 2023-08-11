import React, { useEffect, useState } from "react";

import { IoIosCreate, IoMdCodeWorking } from "react-icons/io";
import {
  useGetSemesterDetailsQuery,
  useGetSemestersQuery,
  useUpdateSemesterMutation,
} from "../../slices/semesterApiSlice";
import { useNavigate, useParams } from "react-router-dom";

import { toast } from "react-toastify";
const EditSemester = () => {
  const { id: semesterId } = useParams();
  console.log(semesterId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coursesTaught, setCoursesTaught] = useState([]);

  const { data: semester, refetch } = useGetSemesterDetailsQuery(semesterId);

  const navigate = useNavigate();
  console.log(semester);
  // setting default input values
  useEffect(() => {
    if (semester) {
      setName(semester.data.name);
      setCoursesTaught(semester.data.coursesTaught);
      setDescription(semester.data.description);
    }
  }, [semester]);

  // handle change four course Taught
  function handleCourse(e) {
    const text = e.target.value;
    const splittedText = text.split(",");
    setCoursesTaught(splittedText);
  }

  const [updateSemester] = useUpdateSemesterMutation();

  const updateSemesterHandler = async (e) => {
    e.preventDefault();

    try {
      await updateSemester({ semesterId, name, description, coursesTaught });
      refetch();
      toast.success("Semester updated Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate("/university/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Semester update failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <>
      <div className="container max-w-xl mx-auto">
        <h1 className="text-5xl font-extrabold  mt-20 flex justify-center">
          Edit Semester <IoIosCreate />
        </h1>
        <form onSubmit={updateSemesterHandler} className="px-5 mt-10">
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
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditSemester;
