import React, { useEffect, useState } from "react";
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

const EditTeacher = ({}) => {
  const { id: teacherId } = useParams();
  const { data: teacher, isLoading } = useGetTeacherDetailsQuery(teacherId);

  const [updateTeacher, { isLoading: loading }] = useUpdateTeacherMutation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [coursesTaught, setCoursesTaught] = useState("");

  useEffect(() => {
    if (teacher) {
      setName(teacher.data.name);
      setDescription(teacher.data.description);
      setCoursesTaught(teacher.data.coursesTaught);
    }
  }, [teacher]);

  function handleCourse(e) {
    const text = e.target.value;
    const splittedText = text.split(",");
    setCoursesTaught(splittedText);
  }

  const editTeacherHandler = async (e) => {
    e.preventDefault();
    console.log(teacherId);
    const updatedTeacher = {
      teacherId,
      name,
      description,
      coursesTaught,
    };

    const res = await updateTeacher(updatedTeacher);
    console.log(res);
    if (res.errors) {
      toast.error("Unsuccess");
    } else {
      toast.success("updates");
    }
  };

  return (
    <form
      className="create-teacher-form container"
      onSubmit={editTeacherHandler}
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
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="teacher-details">
            Courses Taught <span>(Separate using comma)</span>{" "}
          </label>
          <input type="text" onChange={handleCourse} value={coursesTaught} />
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
