import React from "react";
// import { AiFillStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./TeacherItem.scss";
import Rating from "../Rating";
const TeacherItem = ({ teacher }) => {
  return (
    <div className="teacher-item">
      <div className="teacher-img">
        <Link to={`/teacherDetails/${teacher._id}`}>
          <img
            src={teacher.image}
            // src="https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg"
            alt=""
          />
        </Link>
      </div>

      <div className="teacher-item-content">
        <div className="teacher-description">
          <Link to={`/teacherDetails/${teacher._id}`}>
            <h3>{teacher.name}</h3>
          </Link>
          <ul>
            {teacher.coursesTaught.map((course) => {
              return <li key={Math.random()}>{course}</li>;
            })}
          </ul>
          <div className="teacher-item-bottom">
            <h4>
              <Rating value={teacher.averageRating} />
            </h4>
            {teacher.averageRating >= 4.5 ? <h5> Top Instructor </h5> : ""}
            {/* <h5>top Instructor</h5> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherItem;
