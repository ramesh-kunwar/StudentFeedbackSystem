import React, { useEffect, useState } from "react";
import "./Teachers.scss";

import TeacherItem from "./TeacherItem";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      const { data } = await axios.get("/api/v1/teachers");

      setTeachers(data.data);
    };

    fetchTeachers();
  }, []);

  console.log(teachers, "teachers");
  const repeat = 10;
  return (
    <div className="teachers">
      <div className="container ">
        <h1>All Teachers</h1>

        <div className="teacher-wrapper">
          {teachers.map((teacher) => {
            return <TeacherItem key={teacher._id} teacher={teacher} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
