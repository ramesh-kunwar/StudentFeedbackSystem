import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTeacherDetailsQuery } from "../../slices/teacherApiSlice";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import Rating from "../../components/Rating";
import { useSelector } from "react-redux";
import RatingModelForm from "./RatingModelForm";

const TeacherDetails = () => {
  // const [teacher, setTeacher] = useState({});
  const teacherId = useParams();
  const id = teacherId.teacherId;
  const { data: teacher, isLoading, error } = useGetTeacherDetailsQuery(id);

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  return (
    <div className="bg-slate-50 pt-10 min-h-screen">
      <div className="container  mx-auto max-w-6xl bg-white shadow rounded-xl ">
        <div className="lg:grid sm:block px-8 md:px-0 gap-6  py-6 mx-3 md:grid-cols-4 ">
          <div className="col-span-1">
            <img
              src={teacher?.data?.image}
              alt=""
              className=" rounded-md h-fit w-fit"
            />

            <div className="text-xl my-3 mx-2  text-orange-600 ">
              <Rating value={teacher?.data?.averageRating} />
            </div>
            <RatingModelForm userInfo={userInfo} />
  
          </div>

          <div className="col-span-3 md:p-5">
            <h1 className="text-4xl font-extrabold  my-2">
              {teacher?.data?.name}
            </h1>
            <div className="flex gap-2">
              {teacher?.data?.coursesTaught.map((course, index) => {
                return (
                  <p
                    key={index}
                    className="bg-orange-600 text-white rounded px-2 py-0.5 my-2"
                  >
                    {course}
                  </p>
                );
              })}
            </div>
            <p className="my-2">{teacher?.data?.description}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}

      <div className="mt-20 container mx-auto max-w-6xl">
        <h1 className="text-5xl my-8 font-bold">Reviews</h1>
        <div className="bg-white container mx-auto p-5 shadow rounded-md">
          <h1 className="font-bold text-xl  text-gray-600">User 1 Reivew</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            eveniet. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Aliquam, doloremque.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            eveniet. Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Aliquam, doloremque.
          </p>
        </div>
      </div>
      {/* / Review Section */}
    </div>
  );
};

export default TeacherDetails;
