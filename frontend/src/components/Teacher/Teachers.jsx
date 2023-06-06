import React, { useEffect, useState } from "react";
import "./Teachers.scss";
import TeacherItem from "./TeacherItem";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { useGetTeachersQuery } from "../../slices/teacherApiSlice";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

const Teachers = () => {
  const { data: teachers, isLoading, error } = useGetTeachersQuery();
  console.log(teachers, "teach");
  return (
    <div className="teachers">
      <div className="container ">
        <h1>All Teachers</h1>

        <div className="teacher-wrapper">
          {isLoading ? (
            <LoadingIcon />
          ) : (
            teachers?.data?.map((teacher) => {
              return <TeacherItem key={teacher._id} teacher={teacher} />;
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Teachers;
