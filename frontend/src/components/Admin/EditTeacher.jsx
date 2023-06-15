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
import { setTeachers } from "../../slices/teacherSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditTeacher = ({}) => {
  const { id: teacherId } = useParams();
  const { data: teacher, isLoading } = useGetTeacherDetailsQuery(teacherId);

  const [updateTeacher, { isLoading: loading }] = useUpdateTeacherMutation();
  const [uploadTeacherImage, { isLoading: loadingImage }] =
    useUploadTeacherImageMutation();

  const [name, setName] = useState("");
  const [image, setImage] = useState('');
  const [photos, setPHotos] = useState(null);
  const [description, setDescription] = useState("");
  const [coursesTaught, setCoursesTaught] = useState("");

  useEffect(() => {
    if (teacher) {
      setName(teacher.data.name);
      setDescription(teacher.data.description);
      setCoursesTaught(teacher.data.coursesTaught);
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
    };

    const res = await updateTeacher(updatedTeacher);
    console.log(res);
    if (res.errors) {
      toast.error("Unsuccess");
    } else {
      toast.success("updates");
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();

    formData.append("image", e.target.files[0]);
    console.log(e.target.files[0]);

    try {
      const res = await uploadTeacherImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      console.log(error.error);
      toast.error(err?.data?.message || error.error);
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
              <input type="text" placeholder="Enter Image url" value={image} onChange={(e)=> setImage} />
              <label className="block mb-2 text-md   text-gray-700 ">
                Upload Image
              </label>
              <input
                type="file"
                // value={image}
                onChange={uploadFileHandler}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div>
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
            <div className="mb-6">
              <label className="block mb-2 text-md   text-gray-700 ">
                Teacher Details
              </label>
              <input
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="border border-gray-300 outline-none focus:border-gray-600 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
              />
            </div>
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
