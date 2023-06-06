import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTeacherDetailsQuery } from "../../slices/teacherApiSlice";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

const TeacherDetails = () => {
  // const [teacher, setTeacher] = useState({});
  const teacherId = useParams();
  const id = teacherId.teacherId;
  const { data: teachers, isLoading, error } = useGetTeacherDetailsQuery(id);
  console.log(teachers);

  return (
    <div className="container">
      {isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          <h3>{teachers?.data?.name}</h3>
          <p>{teachers?.data?.description}</p>
          <img src={teachers?.data?.image} alt="" />
        </>
      )}
    </div>
  );
};

export default TeacherDetails;
