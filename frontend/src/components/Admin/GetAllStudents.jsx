import React from "react";
import { useGetAllStudentsQuery } from "../../slices/userApiSlice";

const GetAllStudents = () => {
  const { data: students } = useGetAllStudentsQuery();
  console.log(students);
  return (
    <div className="bg-slate-50 py-10 h-screen">
      <div className="container px-4 mx-auto max-w-4xl ">
        <h1 className="text-4xl font-bold py-10 ">All Students</h1>
        {/* <div class="relative overflow-x-auto"> */}
        <table class="w-full text-sm text-left text-gray-500 shadow ">
          <thead class="text-md  text-gray-700 uppercase bg-gray-100 ">
            <tr>
              <th scope="col" class="px-6 py-3 rounded-l-lg">
                S.N
              </th>
              <th scope="col" class="px-6 py-3 rounded-l-lg">
                Name
              </th>
              <th scope="col" class="px-6 py-3">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {students?.data?.map((student, index) => {
              return (
                <tr class="bg-white border">
                  <th scope="row" class="px-6 py-4  text-gray-900  ">
                    {index + 1}
                  </th>
                  <td class="px-6 py-4">{student.name}</td>
                  <td class="px-6 py-4">{student.email}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-gray-100">
            <tr class="font-semibold text-gray-900  ">
              <td class=" pl-4 py-3 text-base">Total Students</td>
              <td class="px-6 py-3">{students?.data?.length}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        {/* </div> */}
      </div>
    </div>
  );
};

export default GetAllStudents;
