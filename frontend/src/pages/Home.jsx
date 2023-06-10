import React from "react";
import homeImage from "../assets/images/home.jpg";
import "./Home.scss";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="flex flex-wrap flex-col-reverse md:flex-row items-center min-h-screen">
          <div className="px-6 md:w-1/2">
            <h1 className="text-3xl md:text-5xl font-bold">
              Lets Make <span className="text-blue-600">Education</span> More
              Effective
            </h1>
            <p className="my-8">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Eligendi, ab! Lorem ipsum dolor, sit amet consectetur adipisicing
              elit. Dicta, architecto!
            </p>
            <div className="flex gap-4">
              <Link to="/teachers">
                <button className="block shadow-md px-4 py-3 md:px-8 md:py-4 bg-blue-800 hover:bg-blue-700 text-white rounded-lg md:rounded-xl">
                  View Teachers
                </button>
              </Link>
              <Link>
                <button className=" block shadow-md px-4 py-3 md:px-8 md:py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-lg md:rounded-xl">
                  View Teachers
                </button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <img src={homeImage} alt="HOme image" />
          </div>
        </div>
      </div>
    </div>

    // <div className="home-page">
    //   <div className="home-page-wrapper">
    //     <div className="item item-left">
    //       <h1>
    //         Lets Make <span>Education</span> More Effective
    //       </h1>
    //       <p>
    //         Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo,
    //         recusandae labore. Non incidunt ab quas beatae consectetur hic
    //         quaerat natus.
    //       </p>
    //       <div className="buttons">
    //         <Link to="/teachers" className="btn btn-teachers">
    //           View Teachers
    //         </Link>
    //         <Link to="/semester" className="btn btn-semester">
    //           View Semester
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="item item-right">
    //       <img src={homeImage} alt="HOme image" />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
