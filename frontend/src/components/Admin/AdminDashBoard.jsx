import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

import CreateTeacherForm from "./CreateTeacherForm";
import { Link } from "react-router-dom";
import {
  useDeleteTeacherMutation,
  useGetTeachersQuery,
} from "../../slices/teacherApiSlice";
import Rating from "../Rating";
import { toast } from "react-toastify";

const AdminDashBoard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: teachers, isLoading } = useGetTeachersQuery();
  const [deleteTeacher, { isLoading: isDeleting }] = useDeleteTeacherMutation();

  const deleteHandler = async (id) => {
    try {
      await deleteTeacher(id);
      toast.success("Teacher deelted successfully");
    } catch (error) {
      toast.error(error.error);
      console.log(error);
    }
  };
  return (
    <div className="bg-slate-50 pt-16 min-h-screen">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="">
          <Link to="/admin/teacher/create">
            <button className="px-8 py-4 btn btn-primary  text-white font-bold rounded-lg">
              Create Teachers
            </button>
          </Link>
          <Link to="/admin/students">
            <button className="px-8 py-4 ml-5 btn btn-warning  text-black font-bold rounded-lg">
              Get all Students
            </button>
          </Link>
        </div>
        <h1 className="mt-20 text-3xl font-bold ">All Teachers</h1>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-10 mb-20">
          <table className="w-full text-sm text-left text-gray-500 ">
            <thead className=" text-gray-700 uppercase  bg-gray-100 text-md  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Teacher
                </th>
                <th scope="col" className="px-6 py-3">
                  Rating
                </th>

                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            {teachers?.data?.map((teacher) => {
              return (
                <tbody key={teacher._id}>
                  <tr className="bg-white border-b ">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      <div className="flex items-center gap-5">
                        <img
                          src={teacher.image}
                          className="w-14 h-14 rounded-full"
                          alt=""
                        />
                        <h3 className="text-md">{teacher.name}</h3>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-orange-600 text-xl">
                      <Rating value={teacher.rating} />
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        className="btn bg-transparent hover:bg-transparent border-none text-xl md:text-3xl text-primary"
                        to={`/admin/teacher/${teacher._id}/edit`}
                      >
                        <FaUserEdit />
                      </Link>
                      <Link
                        className="text-red-600 btn text-xl md:text-3xl bg-transparent hover:bg-transparent border-none"
                        onClick={() => deleteHandler(teacher._id)}
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
                  {teachers?.data?.length}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
