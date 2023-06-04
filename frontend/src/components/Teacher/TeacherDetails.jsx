import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const TeacherDetails = () => {
  const [teacher, setTeacher] = useState({});
  const teacherId = useParams();
  const id = teacherId.teacherId;
  console.log(id, "taecher id");

  useEffect(() => {
    const fetchTeacher = async () => {
      const { data } = await axios.get(`/api/v1/teachers/${id}`);
      setTeacher(data.data);
      console.log(data, "data");
    };

    fetchTeacher();
  }, []);
  return <div>{teacher.name}</div>;
};

export default TeacherDetails;
