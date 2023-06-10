import React from "react";
import homeImage from "../assets/images/home.jpg";
import "./Home.scss";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home-page">
      <div className="home-page-wrapper">
        <div className="item item-left">
          <h1>
            Lets Make <span>Education</span> More Effective
          </h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo,
            recusandae labore. Non incidunt ab quas beatae consectetur hic
            quaerat natus.
          </p>
          <div className="buttons">
            <Link to="/teachers" className="btn btn-teachers">
              View Teachers
            </Link>
            <Link to="/semester" className="btn btn-semester">
              View Semester
            </Link>
          </div>
        </div>
        <div className="item item-right">
          <img src={homeImage} alt="HOme image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
