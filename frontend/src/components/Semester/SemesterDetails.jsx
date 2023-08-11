import React from "react";
import { useGetSemesterDetailsQuery } from "../../slices/semesterApiSlice";
import { useParams } from "react-router-dom";

const SemesterDetails = () => {
  const id = useParams();

  console.log(id.semesterId, 'id');

  const { data: semester } = useGetSemesterDetailsQuery(id.semesterId);
  return (
    <div className="flex place-content-center min-h-screen items-center text-center">
      <div>
        <h1 className="text-8xl font-black my-4">{semester?.data?.name}</h1>
        <h2 className="text-4xl font-bold my-4">Coming Soon........</h2>
        <p className="text-xl">{semester?.data?.description}</p>
      </div>
    </div>
  );
};

export default SemesterDetails;
