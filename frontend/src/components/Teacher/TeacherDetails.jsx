import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTeacherDetailsQuery } from "../../slices/teacherApiSlice";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import Rating from "../../components/Rating";
import "./TeacherDetails.scss";
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
        <div className="teacher-detail">
          <div className="teacher-image">
            <img src={teachers?.data?.image} alt="" />
          </div>
          <div className="teacher-desc">
            <h1>{teachers?.data?.name}</h1>
            {teachers?.data?.coursesTaught.map((course) => {
              return <h3>{course}</h3>;
            })}
            <p>{teachers?.data?.description}</p>
            <h2>
              <Rating value={teachers?.data?.averageRating} />
            </h2>
          </div>
          <div className="review-button">
            <button>Add Review</button>
          </div>
        </div>
      )}

      <h1>All Reviews</h1>
      {/* review component goes here */}
    </div>
  );
};

export default TeacherDetails;
