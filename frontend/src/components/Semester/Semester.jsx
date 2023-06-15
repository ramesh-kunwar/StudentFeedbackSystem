import React from "react";

const Semester = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-6xl pt-8 font-bold">Semester</h1>

        <div className="grid grid-cols-2 gap-4 mt-16">
          <div className="bg-white max-w-4xl h-4xl">
            <img
              src={""}
              alt=""
              srcset=""
              className="bg-slate-600 w-full h-48"
            />
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-semibold my-3 ">Semester 1</h1>
            </div>
          </div>
          <div className="bg-white max-w-4xl h-4xl">
            <img
              src={""}
              alt=""
              srcset=""
              className="bg-slate-600 w-full h-48"
            />
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-semibold my-3 ">Semester 1</h1>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Semester;
