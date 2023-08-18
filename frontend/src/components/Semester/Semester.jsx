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
    <div className="bg-slate-50 pt-24 h-screen ">
      <h1 className="max-w-6xl mx-auto text-4xl mb-8 font-black">
        All Semesters
      </h1>
      <div className="grid md:grid-cols-2  container max-w-6xl mx-auto gap-4">
        {semesters?.data?.map((semester) => {
          // cut text
          const words = semester.description.split(" ");
          const semDescription = words.slice(0, 20).join(" ");
          return (
            <div className="container mx-auto my- rounded shadow  p-8  pt-5 bg-orange-100">
              <div className="flex items-start gap-4 ">
                <img
                  src={imageUrl}
                  className="w-10 h-10 mt-2   rounded-full"
                  alt=""
                />
                <div>
                  <Link
                    to={`/semesterDetails/${semester._id}`}
                    className="hover:text-gray-700"
                  >
                    <h1 className=" text-4xl font-semibold my-2">
                      {semester.name}
                    </h1>
                  </Link>
                  <Rating value={semester.rating} />

                  <p className="my-3">
                    {semester.coursesTaught.map((course) => {
                      return (
                        <span className=" bg-orange-600 inline-block  mr-1 text-[10px] px-2 py-1 rounded text-white">
                          {course}
                        </span>
                      );
                    })}
                  </p>
                  <p className="my-4">{semDescription}</p>
                  {/* <p className="my-4">{semester.description}</p> */}
                  <div>
                    <Link
                      to={`/semesterDetails/${semester._id}`}
                      className="rounded-md btn-primary  px-4 py-2.5    text-white"
                    >
                      View Details
                    </Link>
                  </div>
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
