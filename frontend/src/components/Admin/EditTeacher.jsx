import React, { useState } from "react";
import "./EditTeacher.scss";
import { FaUserEdit } from "react-icons/fa";
import {
  useCreateTeacherMutation,
  useGetTeacherDetailsQuery,
  useGetTeachersQuery,
  useUpdateTeacherMutation,
} from "../../slices/teacherApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setTeachers } from "../../slices/teacherSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditTeacher = ({ isFormOpen, setIsFormOpen }) => {
  const { id: teacherId } = useParams();
  console.log(teacherId, "sdfasdf");
  const { data: teacher, isLoading } = useGetTeacherDetailsQuery(teacherId);
  console.log(teacher, "t");

  const [name, setName] = useState(teacher?.data?.name || "");
  const [description, setDescription] = useState(
    teacher?.data?.description || ""
  );
  const [coursesTaught, setCoursesTaught] = useState(
    teacher?.data?.coursesTaught || []
  );

  const dispatch = useDispatch();
  //   const [teacher, { isLoading }] = useGetTeachersQuery();

  function handleCourse(e) {
    // const text = e.target.value;
    // const splittedText = text.split(",");
    // setCoursesTaught(splittedText);
  }
  // const createProductHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await updateTeacher({
  //       name,
  //       description,
  //       coursesTaught,
  //     }).unwrap();
  //     console.log(res);
  //     // dispatch(setTeachers({ ...res }));
  //     toast.success("Teacher Added Successfully");

  //     setName("");
  //     setDescription("");
  //     setCoursesTaught("");
  //   } catch (error) {
  //     toast.error(error.data.error);
  //     console.log(error.data.error);
  //     // toast.success("User Registered Successfully");
  //   }
  // };

  return (
    <form
      className="create-teacher-form container"
      // onSubmit={createProductHandler}
    >
      <div className="container">
        <h1>
          Edit Teacher
          <FaUserEdit />
        </h1>
        <div className="mb-2">
          <label htmlFor="teacher-name">Teacher Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="teacher-details">Teacher Details</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="teacher-details">
            Courses Taught <span>(Separate using comma)</span>{" "}
          </label>
          <input
            type="text"
            name="coursesTaught"
            value={coursesTaught}
            onChange={handleCourse}
          />
        </div>
        {/* <div className="mb-2">
          <label htmlFor="teacher-name">Teacher Name</label>
          <input type="text" />
        </div> */}

        <button className="create"> Edit</button>
      </div>
    </form>
  );
};

export default EditTeacher;
