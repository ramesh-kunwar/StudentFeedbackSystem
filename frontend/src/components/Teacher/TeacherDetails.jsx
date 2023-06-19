import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetTeacherDetailsQuery,
} from "../../slices/teacherApiSlice";
import LoadingIcon from "../LoadingIcon/LoadingIcon";
import Rating from "../../components/Rating";
import { useDispatch, useSelector } from "react-redux";
import RatingModelForm from "./RatingModelForm";
import FormModel from "./FormModel";

const TeacherDetails = () => {
  // const [teacher, setTeacher] = useState({});
  const teacherId = useParams();
  const id = teacherId.teacherId;

  const {
    data: teacher,
    refetch,
    isLoading,
    error,
  } = useGetTeacherDetailsQuery(id);

  const [createReview, { isLoading: loadingTeacherReview }] =
    useCreateReviewMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [teachingSkill, setTeachingSkill] = useState(0);
  const [communicationSkill, setCommunicationSkill] = useState(0);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  console.log(teacher, "teacher");

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id, // teacherId
        comment,
        // teachingSkill,
        // communicationSkill,
        rating,
      }).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(teacher, "teacher");
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

            <div className="text-xl my-3 mx-2  text-orange-600 flex items-center gap-3 ">
              <Rating value={teacher?.data?.rating} />
              {/* <Rating value={teacher?.data?.averageRating} /> */}
              <p className="text-sm text-black">
                {teacher?.data?.numOfReviews} Reviews
              </p>
            </div>
            {/* <RatingModelForm userInfo={userInfo} /> */}

            {/* rating model */}

            <RatingModelForm />
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
                    className="bg-primary text-white rounded px-2 py-0.5 my-2"
                  >
                    {course}
                  </p>
                );
              })}
            </div>
            <p className="my-2">{teacher?.data?.description}</p>
            <div className="grid grid-cols-3">
              <div>
                <p className="font-bold font-xl my-2">Teaching Skill</p>

                <Rating value={teacher?.data?.teachingSkill?.toFixed(2)} />
              </div>
              <div>
                <p className="font-bold font-xl my-2">Communication Skill</p>
                <Rating value={teacher?.data?.communicationSkill?.toFixed(2)} />
              </div>
              <div>
                <p className="font-bold font-xl my-2"> Resource Provided</p>
                <Rating value={teacher?.data?.resourceProvided?.toFixed(2)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}

      <div className="mt-20 mx-auto max-w-6xl">
        <div className="container mx-auto">
          <h1 className="text-5xl my-8 font-bold">Reviews</h1>
          {teacher?.data?.reviews.length === 0 && (
            <p className="font-bold text-xl">No reviews</p>
          )}
          <div>
            {teacher?.data?.reviews.map((review) => {
              const date = new Date(review.createdAt);
              const year = date.getFullYear();
              const month = date.getMonth();
              const day = date.getDate();
              console.log("Review", review);

              const reviewDate = `${year}-${month}-${day}`;
              return (
                <div
                  key={review._id}
                  className="bg-white container mx-auto p-5 shadow rounded-md my-4"
                >
                  <p className="text-gray-700 text-sm">{reviewDate}</p>
                  <>
                    <div className="flex items-center gap-3 my-1">
                      <h1 className="font-bold text-xl"> {review.name}</h1>
                      <Rating value={review.averageRating} />
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

export default TeacherDetails;
