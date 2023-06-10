import React, { useState } from "react";
import "./CreateTeacherForm.scss";
import { Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { IoIosCreate } from "react-icons/io";
import { useCreateTeacherMutation } from "../../slices/teacherApiSlice";
import { useDispatch } from "react-redux";
import { setTeachers } from "../../slices/teacherSlice";
import { toast } from "react-toastify";
const CreateTeacherForm = ({ isFormOpen, setIsFormOpen }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coursesTaught, setCoursesTaught] = useState([]);

  const dispatch = useDispatch();
  const [createTeacher, { isLoading }] = useCreateTeacherMutation();
  function handleCourse(e) {
    const text = e.target.value;
    const splittedText = text.split(",");
    setCoursesTaught(splittedText);
  }
  const createProductHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createTeacher({
        name,
        description,
        coursesTaught,
      }).unwrap();
      console.log(res);
      // dispatch(setTeachers({ ...res }));
      toast.success("Teacher Added Successfully");

      setName("");
      setDescription("");
      setCoursesTaught("");
    } catch (error) {
      toast.error(error.data.error);
      console.log(error.data.error);
      // toast.success("User Registered Successfully");
    }
  };

  return (
    <>
      <div>
        <div className="container max-w-xl mx-auto">
          <h1 className="text-5xl font-extrabold  mt-20 flex justify-center">
            Create Teacher <IoIosCreate />
          </h1>

          <form
            action=""
            className="px-5 mt-10"
            onSubmit={createProductHandler}
          >
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Teacher Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => name(e.target.value)}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="teacherDetails"
                className="block mb-2 text-md   text-gray-700 "
              >
                Teacher Details
              </label>
              <input
                type="text"
                value={description}
                className=" border border-gray-300 outline-none focus:border-gray-600  text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="teacherDetails"
                className="block mb-2 text-md   text-gray-700 "
              >
                Courses Taught <span>(Separate using comma)</span>
              </label>
              <input
                type="text"
                name="coursesTaught"
                onChange={handleCourse}
                className=" border border-gray-300 outline-none focus:border-gray-600  text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
              />
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className=" bg-blue-700 text-white rounded-lg block w-full p-2.5 "
              >
                Create
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
    </>
    // <div className="create-teacher">
    //   <form
    //     className="create-teacher-form container"
    //     onSubmit={createProductHandler}
    //   >
    //     <div className="container">
    //       <h1>
    //         Create Teachers
    //         <IoIosCreate />
    //       </h1>
    //       <div className="mb-2">
    //         <label htmlFor="teacher-name">Teacher Name</label>
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //         />
    //       </div>
    //       <div className="mb-2">
    //         <label htmlFor="teacher-details">Teacher Details</label>
    //         <input
    //           type="text"
    //           value={description}
    //           onChange={(e) => setDescription(e.target.value)}
    //         />
    //       </div>
    //       <div className="mb-2">
    //         <label htmlFor="teacher-details">
    //           Courses Taught <span>(Separate using comma)</span>{" "}
    //         </label>
    //         <input
    //           type="text"
    //           name="coursesTaught"
    //           // value={coursesTaught}
    //           onChange={handleCourse}
    //         />
    //       </div>

    //       <button className="create"> Create</button>
    //     </div>
    //   </form>
    // </div>
  );
};

export default CreateTeacherForm;
