import React from "react";

const FormModel = () => {
  return (
    <div className="container max-w-xl mx-auto px-5 ">
      <h1 className="text-3xl font-bold  mx-auto ">Rate Teacher</h1>

      <form action="" className="mt-8">
        <div className="mb-6">
          <label className="block mb-2 text-md   text-gray-700 ">
            Teaching Skill
          </label>
          <input
            type="number"
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
            placeholder="0 - 5"
            className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-md   text-gray-700 ">
            Give Your Feedback
          </label>
          <textarea
            placeholder="Feedback Here"
            className="textarea textarea-bordered textarea-sm w-full "
          ></textarea>
        </div>

        <div className="mt-5">
          <button
            type="submit"
            value="Login"
            className=" btn btn-primary text-white rounded-lg block w-full p-2.5 "
          >
            Rate Teacher
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormModel;
