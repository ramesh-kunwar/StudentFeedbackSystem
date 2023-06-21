import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
// import 'bootstrap/dist/css/bootstrap.css'
import "./index.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Teachers from "./components/Teacher/Teachers.jsx";
import TeacherDetails from "./components/Teacher/TeacherDetails.jsx";
import { Provider } from "react-redux";
import store from "./store.js";
import Register from "./pages/Register.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminDashBoard from "./components/Admin/AdminDashBoard.jsx";
import { ToastContainer } from "react-toastify";
import CreateTeacherForm from "./components/Admin/CreateTeacherForm.jsx";
import EditTeacher from "./components/Admin/EditTeacher.jsx";
import Semester from "./components/Semester/Semester.jsx";
import SemesterDetails from "./components/Semester/SemesterDetails.jsx";
import GetAllStudents from "./components/Admin/GetAllStudents.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teacherDetails/:teacherId" element={<TeacherDetails />} />

        <Route path="/semester" element={<Semester />} />
        <Route
          path="/semesterDetails/:semesterId"
          element={<SemesterDetails />}
        />
      </Route>
      {/* admin route */}
      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashBoard />} />
        <Route path="/admin/students" element={<GetAllStudents />} />
        <Route path="/admin/teacher/create" element={<CreateTeacherForm />} />
        <Route path="/admin/teacher/:id/edit" element={<EditTeacher />} />

      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
