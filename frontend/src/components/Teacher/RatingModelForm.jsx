import React, { useState } from "react";
import FormModel from "./FormModel";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateReviewMutation,
  useGetTeacherDetailsQuery,
} from "../../slices/teacherApiSlice";
import {  toast } from "react-toastify";
const RatingModelForm = () => {
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
  const [resourceProvided, setResourceProvided] = useState(0);
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector((state) => state.auth);

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        id, // teacherId
        comment,
        teachingSkill,
        communicationSkill,
        resourceProvided,
        // rating,
      }).unwrap();
      refetch();
    } catch (error) {
      toast.error(error?.data?.error);

      console.log(error);
    }
  };
  console.log(teacher, "teacher");

  return (
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
            <h1 className="text-3xl font-bold  mx-auto ">Rate Teacher</h1>

            {/* <div className="mb-6">
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
            </div> */}
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Communication Skill
              </label>
              <input
                type="number"
                value={communicationSkill}
                onChange={(e) => setCommunicationSkill(e.target.value)}
                placeholder="0 - 5"
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Teaching Skill
              </label>
              <input
                type="number"
                value={teachingSkill}
                onChange={(e) => setTeachingSkill(e.target.value)}
                placeholder="0 - 5"
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Teaching Skill
              </label>
              <input
                type="number"
                value={resourceProvided}
                onChange={(e) => setResourceProvided(e.target.value)}
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
  );
};

export default RatingModelForm;
