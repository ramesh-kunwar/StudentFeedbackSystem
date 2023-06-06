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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/teachers" element={<Teachers />} />
      <Route path="/teacherDetails/:teacherId" element={<TeacherDetails />} />
      {/* <Route path="/product/:id" element={<ProductScreen />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
