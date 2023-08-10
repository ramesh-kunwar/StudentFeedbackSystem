import React from "react";
import { useGetSemestersQuery } from "../../slices/semesterApiSlice";
import { Link } from "react-router-dom";

const Semester = () => {
  const { data: semesters, isLoading, error } = useGetSemestersQuery();
  console.log(semesters?.data[0]);

  return (
    <div className="bg-slate-50 pt-24 h-screen ">
      <div className="grid md:grid-cols-2  container max-w-6xl mx-auto gap-8">
        {semesters?.data?.map((semester) => {
          return (
            <div className="container mx-auto my-4 rounded shadow  p-10 bg-white pt-5">
              <h1 className=" text-4xl font-black my-2"> {semester.name}</h1>
              <p className="my-5">{semester.description}</p>
              <p>{semester.coursesTaught.map((course)=>{
                <span>{course}</span>
              })}</p>
              <Link
                to={`/semesterDetails/${semester._id}`}
                className="rounded-md btn-primary px-6  py-2 inline-block   text-white"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Semester;
