import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  useCreateReviewMutation,
  useGetTeacherDetailsQuery,
} from "../../slices/teacherApiSlice";
import { toast } from "react-toastify";
const RatingModelForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const { userInfo } = useSelector((state) => state.auth);

  const submitReviewHandler = async ({
    teachingSkill,
    communicationSkill,
    resourceProvided,
    comment,
  }) => {
    try {
      await createReview({
        id, // teacherId
        comment,
        teachingSkill,
        communicationSkill,
        resourceProvided,
      }).unwrap();
      refetch();
      toast.success("Reviewed successfully");
    } catch (error) {
      toast.error(error?.data?.error);

      console.log(error);
    }
  };

  return (
    <>
      {/* Open the modal using ID.showModal() method */}
      <button
        onClick={() => window.my_modal_2.showModal()}
        className="btn  btn-primary btn-wide rounded-md text-white font-bold "
        disabled={!(userInfo?.data?.role === "student")}
      >
        Rate Teacher
      </button>
      <dialog id="my_modal_2" className="modal">
        <form
          method="dialog"
          className="modal-box"
          // onSubmit={submitReviewHandler}
          onSubmit={handleSubmit(submitReviewHandler)}
        >
          {/* <FormModel /> */}
          <div className="container max-w-xl mx-auto px-5 ">
            <h1 className="text-3xl font-bold  mx-auto  my-3 mb-7">
              Rate Teacher
            </h1>

            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Communication Skill
              </label>

              <input
                type="number"
                {...register("communicationSkill", {
                  required: true,
                  min: 1,
                  max: 5,
                })}
                placeholder="0 - 5"
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
              {errors.communicationSkill?.type === "min" && (
                <p className="text-red-600 italic text-sm">
                  Rate between 1 and 5
                </p>
              )}
              {errors.communicationSkill?.type === "max" && (
                <p className="text-red-600 italic text-sm">
                  Rate between 1 and 5
                </p>
              )}
              {errors.communicationSkill?.type === "required" && (
                <p className="text-red-600 italic text-sm">
                  Rating is required
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Teaching Skill
              </label>

              <input
                type="number"
                {...register("teachingSkill", {
                  required: true,
                  min: 1,
                  max: 5,
                })}
                placeholder="0 - 5"
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
              {errors.teachingSkill?.type === "min" && (
                <p className="text-red-600 italic text-sm">
                  Rate between 1 and 5
                </p>
              )}
              {errors.teachingSkill?.type === "max" && (
                <p className="text-red-600 italic text-sm">
                  Rate between 1 and 5
                </p>
              )}
              {errors.teachingSkill?.type === "required" && (
                <p className="text-red-600 italic text-sm">
                  Rating is required
                </p>
              )}
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Resources Provided
              </label>

              <input
                type="number"
                {...register("resourceProvided", {
                  required: true,
                  min: 1,
                  max: 5,
                })}
                placeholder="0 - 5"
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
              {errors.resourceProvided?.type === "min" && (
                <p className="text-red-600 italic text-sm">
                  Rate between 1 and 5
                </p>
              )}
              {errors.resourceProvided?.type === "max" && (
                <p className="text-red-600 italic text-sm">
                  Rate between 1 and 5
                </p>
              )}
              {errors.resourceProvided?.type === "required" && (
                <p className="text-red-600 italic text-sm">
                  Rating is required
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Give Your Feedback
              </label>

              <input
                type="text"
                {...register("comment", {
                  required: true,
                })}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />

              {errors.comment?.type === "required" && (
                <p className="text-red-600  italic text-sm">
                  Feedback is required
                </p>
              )}
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
