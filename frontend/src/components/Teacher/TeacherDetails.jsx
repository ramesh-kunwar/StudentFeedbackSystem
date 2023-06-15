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
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  console.log(teacher, "teacher");

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id, // teacherId
        comment,
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
              <Rating value={5} />
              {/* <Rating value={teacher?.data?.averageRating} /> */}
              <p className="text-sm text-black">
                {teacher?.data?.numOfReviews} Reviews
              </p>
            </div>
            {/* <RatingModelForm userInfo={userInfo} /> */}

            {/* rating model */}

            <>
              {/* Open the modal using ID.showModal() method */}
              <button
                onClick={() => window.my_modal_2.showModal()}
                className="btn  btn-primary btn-wide rounded-md text-white font-bold "
                disabled={!userInfo?.data?._id}
              >
                Rate Teacher
              </button>
              <dialog id="my_modal_2" className="modal">
                <form
                  method="dialog"
                  className="modal-box"
                  onSubmit={submitReviewHandler}
                >
                  {/* <FormModel /> */}
                  <div className="container max-w-xl mx-auto px-5 ">
                    <h1 className="text-3xl font-bold  mx-auto ">
                      Rate Teacher
                    </h1>

                    <div className="mb-6">
                      <label className="block mb-2 text-md   text-gray-700 ">
                        Rating
                      </label>
                      <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        placeholder="0 - 5"
                        className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 text-md   text-gray-700 ">
                        Give Your Feedback
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Feedback Here"
                        className="textarea textarea-bordered textarea-sm w-full "
                      ></textarea>
                    </div>

                    <div className="mt-5">
                      <button
                        type="submit"
                        value="Login"
                        className=" btn btn-primary text-white rounded-lg block w-full p-2.5 modal-backdrop "
                        method="dialog"
                      >
                        Rate Teacher
                      </button>
                    </div>
                  </div>
                  {/* formm model */}
                </form>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </>
            {/* / rating model */}
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

      <div className="mt-20 mx-auto max-w-6xl">
        <div className="container mx-auto">
          <h1 className="text-5xl my-8 font-bold">Reviews</h1>
          {teacher?.data?.reviews.length === 0 && (
            <p className="font-bold text-xl">No reviews</p>
          )}
          <div className="bg-white container mx-auto p-5 shadow rounded-md">
            {teacher?.data?.reviews.map((review) => {
              return (
                <div key={review._id}>
                  <div className="flex items-center gap-3">
                    <h1 className="font-bold text-xl">{review.name}</h1>
                    <p>{review.rating}</p>
                  </div>
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
