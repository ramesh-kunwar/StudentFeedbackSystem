import React from "react";
import homeImage from "../assets/images/home.jpg";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-page">
      <div className="home-image">
        <img src={homeImage} alt="" />
      </div>
      <div className="home-content">
        <h1>
          Let's Make Education <br /> More Effective
        </h1>

        <a href="#">
          <button className="btn btn-border">View Teachers</button>
        </a>
        <a href="#">
          <button className="btn btn-color">View Semesters</button>
        </a>
      </div>
    </div>
  );
};

export default Home;
