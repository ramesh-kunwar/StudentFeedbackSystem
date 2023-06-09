import React, { useState } from "react";
import "./CreateTeacherForm.scss";
import { RxCross1 } from "react-icons/rx";
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
    <form
      className="create-teacher-form container"
      onSubmit={createProductHandler}
    >
      <div className="container">
        <h1>Create Teachers</h1>
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
            // value={coursesTaught}
            onChange={handleCourse}
          />
        </div>
        {/* <div className="mb-2">
          <label htmlFor="teacher-name">Teacher Name</label>
          <input type="text" />
        </div> */}

        <button className="create"> Create</button>
      </div>
    </form>
  );
};

export default CreateTeacherForm;
