import React, { useState } from "react";
import "./AdminDashboard.scss";
import { useSelector } from "react-redux";
import TeacherTable from "./TeacherTable";
import CreateTeacherForm from "./CreateTeacherForm";
import { Link } from "react-router-dom";

const AdminDashBoard = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="admin-dashboard">
      <div className="container">
        <Link to="/admin/teacher/create">
          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="create-teachers"
          >
            Create Teachers
          </button>
        </Link>

        <TeacherTable />
      </div>
    </div>
  );
};

export default AdminDashBoard;
