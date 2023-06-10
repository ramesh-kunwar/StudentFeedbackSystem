import React from "react";
import { useGetTeachersQuery } from "../../slices/teacherApiSlice";
import "./TeacherTable.scss";
import Rating from "../Rating";
import { FaUserEdit } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { Link } from "react-router-dom";
const TeacherTable = () => {
  const { data: teachers, isLoading } = useGetTeachersQuery();

  return (
    <div className="teacher-table ">
      <h1>All Teachers</h1>
      {teachers?.data.map((teacher) => {
        return (
          <div className="teacher-item" key={teacher._id}>
            <div className="left">
              <img src={teacher.image} alt="" />
              <p>{teacher.name}</p>
            </div>
            <div>
              <div className="right">
                <Rating value={teacher.averageRating} />
                <Link to={`/admin/teacher/${teacher._id}/edit`}>
                  <FaUserEdit />
                </Link>
                <Link className="delete">
                  <TiDelete />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherTable;
