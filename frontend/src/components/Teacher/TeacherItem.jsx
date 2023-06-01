import React from "react";
// import { AiFillStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

import "./TeacherItem.scss";
const TeacherItem = () => {
  return (
    <div className="teacher-item">
      <div className="teacher-img">
        <img
          src="https://cdn.elearningindustry.com/wp-content/uploads/2019/10/professional-development-tools-for-teachers.jpg"
          alt=""
        />
      </div>

      <div className="teacher-item-content">
        <div className="teacher-description">
          <h3>Brad Traversy</h3>
          <ul>
            <li>MERN STACK</li>

            <li>DSA</li>

            <li>Computer Networks</li>
          </ul>
          <div className="teacher-item-bottom">
            <h4>
              5
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </h4>
            <h5>top Instructor</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherItem;
