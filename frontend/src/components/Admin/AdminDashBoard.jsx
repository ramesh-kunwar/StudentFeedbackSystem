import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { TiDelete } from "react-icons/ti";

import CreateTeacherForm from "./CreateTeacherForm";
import { Link } from "react-router-dom";
import { useGetTeachersQuery } from "../../slices/teacherApiSlice";
import Rating from "../Rating";

const AdminDashBoard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { data: teachers, isLoading } = useGetTeachersQuery();

  return (
    <div className="bg-slate-50 pt-16 min-h-screen">
      <div className="container px-4 mx-auto max-w-6xl">
        <div className="">
          <Link to="/admin/teacher/create">
            <button className="px-8 py-4 btn btn-primary  text-white font-bold rounded-lg">
              Create Teachers
            </button>
          </Link>
        </div>
        <h1 className="mt-20 text-3xl font-bold">All Teachers</h1>

        {teachers?.data?.map((teacher) => {
          return (
            <div className="flex items-center justify-between bg-white my-2 px-4 py-2 rounded-md ">
              <div className="flex items-center gap-5">
                <img
                  src={teacher.image}
                  className="w-14 h-14 rounded-full"
                  alt=""
                />
                <h3 className="text-md">{teacher.name}</h3>
              </div>
              <div className="flex gap-3 items-center md:text-2xl">
                <p className="text-orange-600">
                  <Rating value={teacher.averageRating} />
                </p>
                <Link
                  className="btn bg-transparent hover:bg-transparent border-none text-xl md:text-3xl text-primary"
                  to={`/admin/teacher/${teacher._id}/edit`}
                >
                  <FaUserEdit />
                </Link>
                <Link className="text-red-600 btn text-xl md:text-4xl bg-transparent hover:bg-transparent border-none">
                  <RiDeleteBack2Fill />
                </Link>
              </div>
            </div>
          );
        })}
      </div>


    </div>
  );
};

export default AdminDashBoard;
