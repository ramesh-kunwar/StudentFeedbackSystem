import React from "react";
import FormModel from "./FormModel";

const RatingModelForm = ({ userInfo }) => {
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
        <form method="dialog" className="modal-box">
          <FormModel />
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default RatingModelForm;
