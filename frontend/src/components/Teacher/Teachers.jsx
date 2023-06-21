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

const Teachers = () => {
  const { data: teachers, isLoading, error } = useGetTeachersQuery();

  let topRatedTeachers = [];

  teachers?.data?.forEach((teacher) => {
    if (teacher.rating >= 4.5) {
      topRatedTeachers.push(teacher);
    }
  });

  console.log(topRatedTeachers, "top");

  return (
    <div className=" w-full bg-slate-50 ">
      <div className="container max-w-6xl mx-auto py-20 px-5">
        {/* Top Instructors */}
        <h1 className="text-4xl font-bold ">Top Instructors</h1>
        <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 mb-20">
          {topRatedTeachers.map((teacher) => {
            return (
              <div
                key={teacher._id}
                className="bg-white  shadow rounded-md hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <Link to={`/teacherDetails/${teacher._id}`}>
                  <img
                    src={teacher.image}
                    alt=""
                    className="rounded-t-md w-full h-48"
                  />
                </Link>

                <div className="px-4 py-2">
                  <Link to={`/teacherDetails/${teacher._id}`}>
                    <h1 className="text-lg font-bold my-2 ">{teacher.name}</h1>
                  </Link>

                  <div className="flex gap-2">
                    {teacher.coursesTaught.map((course, index) => {
                      return (
                        <p
                          key={index}
                          className="bg-primary text-[10px] px-2 py-1 rounded text-white"
                        >
                          {course}
                        </p>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center mt-2 py-3">
                    <h4>
                      <Rating value={teacher.rating} />
                    </h4>
                    {teacher.rating >= 4.5 ? (
                      <h5 className="text-[10px] text-white bg-orange-600 px-1 py-0.5 rounded">
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
        {/* / Top Instructors */}

        <h1 className="text-4xl font-bold ">All Teacher</h1>

        {/* All Teachers */}
        <div className="grid  grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {teachers?.data?.map((teacher) => {
            return (
              <div
                key={teacher._id}
                className="bg-white  shadow rounded-md hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <Link to={`/teacherDetails/${teacher._id}`}>
                  <img
                    src={teacher.image}
                    alt=""
                    className="rounded-t-md w-full h-48"
                  />
                </Link>

                <div className="px-4 py-2">
                  <Link to={`/teacherDetails/${teacher._id}`}>
                    <h1 className="text-lg font-bold my-2 ">{teacher.name}</h1>
                  </Link>

                  <div className="flex gap-2">
                    {teacher.coursesTaught.map((course, index) => {
                      return (
                        <p
                          key={index}
                          className="bg-primary text-[10px] px-2 py-1 rounded text-white"
                        >
                          {course}
                        </p>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center mt-2 py-3">
                    <h4>
                      <Rating value={teacher.rating} />
                    </h4>
                    {teacher.rating >= 4.5 ? (
                      <h5 className="text-[10px] text-white bg-orange-600 px-1 py-0.5 rounded">
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
    </div>
  );
};

export default Teachers;
