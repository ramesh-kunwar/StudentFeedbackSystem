import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Teacher", "Student", "User", "Semester"], // Types of data we are going to fetch from api
  endpoints: (builder) => ({}), // you can inject other endpoints using injectEndpoints
});
