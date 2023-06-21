import React from "react";
import { useGetSemesterDetailsQuery } from "../../slices/semesterApiSlice";
import { useParams } from "react-router-dom";

const SemesterDetails = () => {
  const id = useParams();
  const semesterId = id.semesterId;
  console.log(semesterId);

  const { data: semester } = useGetSemesterDetailsQuery(semesterId);
  return (
    <div>
      <h1 className="text-6xl">{semester?.data?.name}</h1>
      <p className="text-xl">{semester?.data?.description}</p>
    </div>
  );
};

export default SemesterDetails;
