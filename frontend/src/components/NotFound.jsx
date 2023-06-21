import React from "react";
import NotFoundImage from "../assets/images/NotFound.jpg";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div>
      <div className="flex  justify-center w-screen text-center  ">
        <div>
          <div className="flex place-content-center  h-1/2">
            <img src={NotFoundImage} alt="" className="w-1/2" />
          </div>
          <div className="flex gap-4  pt-5 place-content-center">
            <Link to="/teachers">
              <button className="block shadow-md px-4 py-3 md:px-8 md:py-4 btn btn-primary text-white rounded-lg md:rounded-xl">
                View Teachers
              </button>
            </Link>
            <Link to={"/semester"}>
              <button className=" block shadow-md px-4 py-3 md:px-8 md:py-4 btn bg-orange-600 hover:bg-orange-500 text-white rounded-lg md:rounded-xl">
                View Semester
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
