import React from "react";
import { useGetSemestersQuery } from "../../slices/semesterApiSlice";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { Toaster, toast } from "react-hot-toast";

const Semester = () => {
  const { data: semesters, isLoading, error } = useGetSemestersQuery();
  console.log(semesters?.data[0]);

  const imageUrl =
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

  return (
    <div className="bg-slate-50 pt-24 min-h-screen pb-16">
      <h1 className="max-w-6xl mx-auto px-4 text-4xl mb-8 font-black">
        All Semesters
      </h1>
      <div className="grid md:grid-cols-2 container max-w-6xl mx-auto gap-4 px-4">
        {semesters?.data?.map((semester) => {
          const words = semester.description.split(" ");
          const semDescription = words.slice(0, 20).join(" ");
          return (
            <div key={semester._id} className="rounded shadow p-6 pt-5 bg-orange-100">
              <div className="flex items-start gap-4">
                <img
                  src={imageUrl}
                  className="w-10 h-10 mt-2 rounded-full flex-shrink-0"
                  alt=""
                />
                <div className="min-w-0 flex-1">
                  <Link
                    to={`/semesterDetails/${semester._id}`}
                    className="hover:text-gray-700"
                  >
                    <h1 className="text-2xl sm:text-3xl font-semibold my-2">
                      {semester.name}
                    </h1>
                  </Link>
                  <Rating value={semester.rating} />

                  <div className="flex flex-wrap gap-1.5 my-3">
                    {semester.coursesTaught.map((course, i) => (
                      <span
                        key={i}
                        className="bg-orange-600 text-[11px] px-2 py-1 rounded text-white"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                  <p className="my-4 text-sm text-gray-700">{semDescription}...</p>
                  <Link
                    to={`/semesterDetails/${semester._id}`}
                    className="rounded-md btn-primary px-4 py-2.5 text-white inline-block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Semester;
