import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

// import CreateTeacherForm from "./CreateTeacherForm";
import { Link } from "react-router-dom";

import Rating from "../Rating";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import {
  useDeleteSemesterMutation,
  useGetSemestersQuery,
} from "../../slices/semesterApiSlice";

const UniversityDashboard = () => {
  const { data: semesters, refetch } = useGetSemestersQuery();
  const [deleteSemester] = useDeleteSemesterMutation();
  const deleteHandler = async (id) => {
    console.log(id, "id");
    try {
      await deleteSemester(id);
      refetch()
      toast.success("Semester deleted Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log("Semester deleted successfully");
    } catch (error) {
      toast.error("Semester deletion failed", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.log(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: "0.5%" }}
      animate={{ opacity: 1, y: "0%" }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 pt-16 min-h-screen"
    >
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="">
          <Link to="/university/semester/create">
            <button className="px-8 py-4 btn btn-primary  text-white font-bold rounded-lg">
              Create Semester
            </button>
          </Link>
        </div>
        <h1 className="mt-20 text-3xl font-bold ">All Semester</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10 mb-20">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className=" text-gray-700 uppercase  bg-gray-100 text-md  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Semesters
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {semesters?.data?.map((semester) => {
              return (
                <tbody key={semester._id}>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <Link to={`/semesterDetails/${semester._id}`}>
                        <div className="flex items-center gap-5">
                          {/* <img
                            src={semester.image}
                            className="w-14 h-14 rounded-full"
                            alt=""
                          /> */}
                          <h3 className="text-md">{semester.name}</h3>
                        </div>
                      </Link>
                    </th>
                    <td className="px-6 py-4 text-orange-600 text-xl">
                      <Rating value={semester.rating} />
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        className="btn bg-transparent hover:bg-transparent border-none text-xl md:text-3xl text-primary"
                        to={`/university/semester/${semester._id}/edit`}
                      >
                        <FaUserEdit />
                      </Link>
                      <Link
                        className="text-red-600 btn text-xl md:text-3xl bg-transparent hover:bg-transparent border-none"
                        onClick={() => deleteHandler(semester._id)}
                      >
                        <RiDeleteBack2Fill />
                      </Link>
                    </td>
                  </tr>
                </tbody>
              );
            })}

            <tfoot className=" text-gray-700 font-bold uppercase  bg-gray-100 text-md  ">
              <tr>
                <td scope="col" className="px-6 py-3">
                  Total Teachers:
                </td>
                <td scope="col" className="px-6 py-3">
                  {semesters?.data?.length}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default UniversityDashboard;
