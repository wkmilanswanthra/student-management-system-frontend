import React, { useState, useEffect } from "react";
import axios from "axios";
import urls from "../constants/Urls";

export const Dashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getStudents();
      setStudents(students);
    };
    fetchStudents();
  }, []);

  const getStudents = async () => {
    try {
      const response = await axios.get(urls.students);
      console.log(response.data.data);
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center  h-screen px-16 py-16">
      <h1 className="text-3xl font-semibold mb-6 text-center text-white">
        Student Management System
      </h1>

      <div class="relative  shadow-md sm:rounded-lg ">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                ID
              </th>
              <th scope="col" class="px-4 text-left py-3">
                First Name
              </th>
              <th scope="col" class="px-4 text-left py-3">
                Last Name
              </th>
              <th scope="col" class="px-4 text-left py-3">
                Date of Birth
              </th>
              <th scope="col" class="px-4 text-left py-3">
                Email
              </th>
              <th scope="col" class="px-4 text-left py-3">
                Phone
              </th>
              <th scope="col" class="px-4 text-left py-3">
                Address
              </th>
              <th scope="col" class="px-4 text-left py-3">
                Created at
              </th>
              <th scope="col" class="px-4 text-left py-3">
                Edit
              </th>
              <th scope="col" class="px-4 text-left py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody class="overflow-y-auto">
            {students.map((student) => {
              const birthdate = new Date(student.dateOfBirth);
              const createdAt = new Date(student.createdAt);
              return (
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {student.id}
                  </th>
                  <td class="px-4 py-4">{student.firstName}</td>
                  <td class="px-4 py-4">{student.lastName}</td>
                  <td class="px-4 py-4">
                    {birthdate.toLocaleDateString("en-US")}
                  </td>
                  <td class="px-4 py-4">{student.email}</td>
                  <td class="px-4 py-4">{student.phone}</td>
                  <td class="px-4 py-4">{student.address}</td>
                  <td class="px-4 py-4">
                    {createdAt.toLocaleDateString("en-US")}
                  </td>
                  <td class="px-4 py-4">
                    <a
                      href="#"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a>
                  </td>
                  <td class="px-4 py-4">
                    <a
                      href="#"
                      class="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
