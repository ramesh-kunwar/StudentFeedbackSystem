import React from "react";
import "./Teachers.scss";
import TeacherItem from "./TeacherItem";
const Teachers = () => {
  const repeat = 10;
  return (
    <div className="teachers">
      <div className="container ">
        <h1>All Teachers</h1>

        <div className="teacher-wrapper">
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
          <TeacherItem />
        </div>
      </div>
    </div>
  );
};

export default Teachers;
