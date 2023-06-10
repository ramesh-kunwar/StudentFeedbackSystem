import React, { useState } from "react";
import "./AdminDashboard.scss";
import { useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import TeacherTable from "./TeacherTable";
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
            <button className="px-8 py-4 bg-blue-800 text-white font-bold rounded-lg">
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
              <div className="flex gap-6 text-2xl">
                <p className="text-orange-600">
                  <Rating value={teacher.averageRating} />
                </p>
                <Link
                  className="text-blue-600"
                  to={`/admin/teacher/${teacher._id}/edit`}
                >
                  <FaUserEdit />
                </Link>
                <Link className="text-red-600">
                  <TiDelete />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>

    // {/* <div className="teacher-table ">
    // <h1>All Teachers</h1>
    // {teachers?.data.map((teacher) => {
    //   return (
    //     <div className="teacher-item" key={teacher._id}>
    //       <div className="left">
    //         <img src={teacher.image} alt="" />
    //         <p>{teacher.name}</p>
    //       </div>
    //       <div>
    //         <div className="right">
    //           <Rating value={teacher.averageRating} />
    //           <Link to={`/admin/teacher/${teacher._id}/edit`}>
    //             <FaUserEdit />
    //           </Link>
    //           <Link className="delete">
    //             <TiDelete />
    //           </Link>
    //         </div>
    //       </div>
    //     </div> */}

    // <div className="admin-dashboard">
    //   <div className="container">
    //     <Link to="/admin/teacher/create">
    //       <button
    //         onClick={() => setIsFormOpen(!isFormOpen)}
    //         className="create-teachers"
    //       >
    //         Create Teachers
    //       </button>
    //     </Link>

    //     <TeacherTable />
    //   </div>
    // </div>
  );
};

export default AdminDashBoard;
