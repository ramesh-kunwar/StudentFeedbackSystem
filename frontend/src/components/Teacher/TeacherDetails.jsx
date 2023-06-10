import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTeacherDetailsQuery } from "../../slices/teacherApiSlice";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import Rating from "../../components/Rating";

const TeacherDetails = () => {
  // const [teacher, setTeacher] = useState({});
  const teacherId = useParams();
  const id = teacherId.teacherId;
  const { data: teacher, isLoading, error } = useGetTeacherDetailsQuery(id);

  return (
    <div className="bg-slate-50 pt-10 min-h-screen">
      <div className="container mx-auto max-w-6xl bg-white shadow-xl rounded-xl ">
        <div className="lg:grid pb-10 sm:block px-8 md:px-0 gap-6 items-center mx-3 md:grid-cols-5 ">
          <div className="row-start-1 row-span-1">
            <img
              src={teacher?.data?.image}
              alt=""
              className=" rounded-md h-fit w-fit"
            />
            <p className="text-2xl my-3 mx-2  text-orange-600 ">
              <Rating value={teacher?.data?.averageRating} />
            </p>
          </div>

          <div className="col-span-3 md:p-5 items-center">
            <h1 className="text-4xl font-extrabold my-2">
              {teacher?.data?.name}
            </h1>
            <div className="flex gap-2">
              {teacher?.data?.coursesTaught.map((course, index) => {
                return (
                  <p className="bg-orange-600 text-white rounded px-2 py-0.5 my-2">
                    {course}
                  </p>
                );
              })}
            </div>
            <p className="my-2">{teacher?.data?.description}</p>
          </div>
          <div className="col-span-1">
            <button className="bg-purple-700 px-6 py-3 rounded-md text-white font-bold hover:bg-purple-800">
              Rate Teacher
            </button>
          </div>
        </div>
      </div>
    </div>
    // <div className="container">
    //   {isLoading ? (
    //     <LoadingIcon />
    //   ) : (
    //     <div className="teacher-detail">
    //       <div className="teacher-image">
    //         <img src={teachers?.data?.image} alt="" />
    //       </div>
    //       <div className="teacher-desc">
    //         <h1>{teachers?.data?.name}</h1>
    //         {teachers?.data?.coursesTaught.map((course, index) => {
    //           return <h3 key={index}>{course}</h3>;
    //         })}
    //         <p>{teachers?.data?.description}</p>
    //         <h2>
    //           <Rating value={teachers?.data?.averageRating} />
    //         </h2>
    //       </div>
    //       <div className="review-button">
    //         <button>Add Review</button>
    //       </div>
    //     </div>
    //   )}

    //   <h1>All Reviews</h1>
    //   {/* review component goes here */}
    // </div>
  );
};

export default TeacherDetails;
