import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
import Rating from "../../components/Rating";

// import RatingModelForm from "./RatingModelForm";
import { motion } from "framer-motion";

import { useGetSemesterDetailsQuery } from "../../slices/semesterApiSlice";
import RateSemesterForm from "./RateSemesterForm";

const SemesterDetails = () => {
  // const [semester, setsemester] = useState({});
  const semesterId = useParams();
  const id = semesterId.semesterId;

  const { data: semester, isLoading, refetch } = useGetSemesterDetailsQuery(id);
  console.log(semester, "semester");
  useEffect(() => {
    refetch();
  }, [semester]);

  return (
    <div className="bg-slate-50 pt-10 min-h-screen">
      <div className=" md:grid grid-cols-3 container  mx-auto max-w-6xl bg-white shadow rounded-xl  px-10 py-10">
        <div className="">
          <h1 className="mx-auto  text-4xl font-bold -8">
            {semester?.data?.name}
          </h1>
          <h1 className="text-8xl  font-black text-orange-600">
            {semester?.data?.rating.toFixed(2)}
          </h1>
          <div className="  my-4">
            <Rating value={semester?.data?.rating} />
            {/* <p className="text-sm mt-3 text-black">Overall Rating</p> */}
          </div>

          <RateSemesterForm />
        </div>
        {/* description */}
        <div className="col-span-2">
          <p className="my-2 text-gray-500">{semester?.data?.description}</p>
          <div className="flex gap-2">
            {semester?.data?.coursesTaught.map((course, index) => {
              return (
                <p
                  key={index}
                  className="bg-primary text-white rounded px-2 py-0.5 my-2"
                >
                  {course}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews Section */}

      <div
        // className="review-container"
        className="mt-20 mx-auto max-w-6xl"
      >
        <div className="container mx-auto">
          <h1 className="text-5xl my-8 font-bold">Reviews</h1>
          {semester?.data?.reviews.length === 0 && (
            <p className="font-bold text-xl">No reviews</p>
          )}
          <div>
            {semester?.data?.reviews.map((review) => {
              const date = new Date(review.createdAt);
              const year = date.getFullYear();
              const month = date.getMonth();
              const day = date.getDay();
              console.log(day);
              console.log("Review", review);

              const months = [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ];

              const monthName = months[month];

              const reviewDate = `${year}-${monthName}-${day}`;
              return (
                <div
                  key={review._id}
                  // className="review-item"
                  className="bg-white container mx-auto p-5 shadow rounded-md my-4"
                >
                  <p className="text-gray-500 text-sm">{reviewDate}</p>

                  <>
                    <div className="flex items-center gap-3 my-2">
                      <h1 className="font-bold text-xl"> {review.name}</h1>

                      <Rating value={review.rating} />
                    </div>
                  </>
                  <p>{review.comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* / Review Section */}
    </div>
  );
};

export default SemesterDetails;
