import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import {
  useCreateTeacherMutation,
  useGetTeacherDetailsQuery,
  useGetTeachersQuery,
  useUpdateTeacherMutation,
  useUploadTeacherImageMutation,
} from "../../slices/teacherApiSlice";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const EditTeacher = ({}) => {
  const { id: teacherId } = useParams();
  const { data: teacher, isLoading } = useGetTeacherDetailsQuery(teacherId);

  const [updateTeacher, { isLoading: loading }] = useUpdateTeacherMutation();
  
  const [uploadTeacherImage, { isLoading: loadingImage }] =
    useUploadTeacherImageMutation();
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [description, setDescription] = useState("");
  const [coursesTaught, setCoursesTaught] = useState("");

  console.log(teacher);
  useEffect(() => {
    if (teacher) {
      setName(teacher.data.name);
      setDescription(teacher.data.description);
      setCoursesTaught(teacher.data.coursesTaught);
      setImage(teacher.data.image);
    }
  }, [teacher]);

  function handleCourse(e) {
    const text = e.target.value;
    const splittedText = text.split(",");
    setCoursesTaught(splittedText);
  }

  const editTeacherHandler = async (e) => {
    e.preventDefault();
    console.log(teacherId);
    const updatedTeacher = {
      teacherId,
      name,
      description,
      coursesTaught,
      image,
    };

    const res = await updateTeacher(updatedTeacher);
    console.log(res);
    if (res.errors) {
      toast.error("Unsuccess");
    } else {
      toast.success("updates");
      navigate("/admin/dashboard");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadTeacherImage(formData).unwrap();
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div>
        <div className="container max-w-xl mx-auto">
          <h1 className="text-5xl font-extrabold  mt-20 flex justify-center">
            Edit Teacher <FaUserEdit />
          </h1>

          <form action="" className="px-5 mt-10" onSubmit={editTeacherHandler}>
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Teacher Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div>
            {/* <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Teacher Details
              </label>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div> */}

            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Courses Taught{" "}
                <span className="text-red-600 italic">
                  (Separate using comma)
                </span>
              </label>
              <input
                type="text"
                onChange={handleCourse}
                value={coursesTaught}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="teacherDetails"
                className="block mb-2 text-md   text-gray-700 "
              >
                Teacher Details
              </label>

              <textarea
              value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="message"
                rows="4"
                class="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                placeholder="Write your thoughts here..."
              ></textarea>
            </div>

            <div className="mb-6">
              <input
                type="text"
                hidden
                placeholder="Enter Image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <label className="block mb-2 text-md   text-gray-700 ">
                Upload Image
              </label>
              <input
                type="file"
                onChange={uploadFileHandler}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div>

            <div className="mt-5">
              <button
                type="submit"
                className=" btn btn-primary text-white rounded-lg block w-full p-2.5 "
              >
                Edit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditTeacher;
