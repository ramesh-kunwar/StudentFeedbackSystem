import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import {
  useCreateReviewMutation,
  useGetTeachersQuery,
} from "../../slices/teacherApiSlice";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import Rating from "../Rating";
import { motion } from "framer-motion";

import "./Teachers.scss";
const Teachers = () => {
  const { data: teachers, isLoading, error } = useGetTeachersQuery();

  return (
    <motion.div
      initial={{ opacity: 0, y: "0.5%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-50 "
    >
      <div className="container max-w-6xl mx-auto py-20 px-5">
        <h1 className="text-4xl font-bold ">All Teachers</h1>

        {/* All Teachers */}

        {/* <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8"> */}
        <div className="teacher-wrapper">
          {teachers?.data?.map((teacher) => {
            return (
              <div
                key={teacher._id}
                className="card-item"
                // className="bg-white  shadow rounded-md hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <Link to={`/teacherDetails/${teacher._id}`}>
                  <img
                    src={teacher.image}
                    alt=""
                    // className="rounded-t-md w-full h-48"
                  />
                </Link>

                <div
                // className="px-4 py-2"
                className="card-desc"
                >
                  <Link to={`/teacherDetails/${teacher._id}`}>
                    <h1 className="text-lg font-bold my-2 ">{teacher.name}</h1>
                  </Link>

                  <div 
                  // className="flex gap-2"
                  className="courses-taught"
                  >
                    {teacher.coursesTaught.map((course, index) => {
                      return (
                        <p
                          key={index}

                          // className="bg-primary text-[10px] px-2 py-1 rounded text-white"
                        >
                          {course}
                        </p>
                      );
                    })}
                  </div>

                  <div 
                  className="card-bottom"
                  // className="flex justify-between items-center mt-2 py-3"
                  >
                    <h4>
                      <Rating value={teacher.rating} />
                    </h4>
                    {teacher.rating >= 4.5 ? (
                      <h5 
                      // className="text-[10px] text-white bg-orange-600 px-1 py-0.5 rounded"
                      >
                        {" "}
                        Top Instructor{" "}
                      </h5>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* / All Teachers */}
      </div>
    </motion.div>
  );
};

export default Teachers;
