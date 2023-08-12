import React, { useState } from "react";
import {
  useCreateSemesterReviewMutation,
  useGetSemesterDetailsQuery,
} from "../../slices/semesterApiSlice";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const RateSemesterForm = () => {
  const [rateSemester] = useCreateSemesterReviewMutation();
  const { data: semester, refetch } = useGetSemesterDetailsQuery();
  const { semesterId: id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const rateSemesterHandler = async ({ rating, comment }) => {
    try {
      await rateSemester({ id, rating, comment }).unwrap();
      // refetch()
      toast.success("Semester Reviewed Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <div>
      {/* Open the modal using ID.showModal() method */}

      <button
        className="btn btn-primary text-white block w-56"
        onClick={() => window.my_modal_2.showModal()}
      >
        Rate Semester
      </button>
      <dialog id="my_modal_2" className="modal">
        <form
          onSubmit={handleSubmit(rateSemesterHandler)}
          method="dialog"
          className="modal-box  pb-8"
        >
          <h1 className="text-3xl font-bold  mx-auto my-6 ">Rate Semester</h1>

          <div className="mb-6">
            <label className="block mb-2 text-md   text-gray-700 ">
              Rate Semester
            </label>
            <input
              type="number"
              placeholder="0 - 5"
              {...register("rating", {
                required: true,
                min: 1,
                max: 5,
              })}
              className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
            />
            {errors.rating?.type === "min" && (
              <p className="text-red-600 italic text-sm">
                Rate between 1 and 5
              </p>
            )}
            {errors.rating?.type === "max" && (
              <p className="text-red-600 italic text-sm">
                Rate between 1 and 5
              </p>
            )}
            {errors.rating?.type === "required" && (
              <p className="text-red-600 italic text-sm">Rating is required</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-md   text-gray-700 ">
              Give Your Feedback
            </label>
            <textarea
              {...register("comment", {
                required: true,
              })}
              placeholder="Feedback Here"
              className="textarea textarea-bordered textarea-sm w-full "
            ></textarea>

            {errors.comment?.type === "required" && (
              <p className="text-red-600 italic text-sm">Rating is required</p>
            )}
          </div>

          <div className="mt-5">
            <button
              type="submit"
              value="Login"
              className=" btn btn-primary text-white rounded-lg block w-full p-2.5 "
            >
              Rate Semester
            </button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default RateSemesterForm;
