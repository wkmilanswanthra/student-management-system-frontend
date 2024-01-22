import React from "react";
import axios from "axios";
import urls from "../constants/Urls";

export const Table = ({ students, setStudents, setShow, show }) => {
  return (
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

          const handleEdit = () => {
            console.log(`Editing student with ID: ${student.id}`);
            setShow(true);
          };

          const handleDelete = () => {
            try {
              if (
                window.confirm("Are you sure you want to delete this record?")
              ) {
                axios.delete(urls.students + "?id=" + student.id);
                const newStudents = students.filter((s) => s.id !== student.id);
                setStudents(newStudents);
              }
            } catch (e) {
              console.log(e.message);
            }
          };
          return (
            <>
              <tr class=" border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {student.id}
                </th>
                <td class="px-[1 rem] py-4">{student.firstName}</td>
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
                  <button
                    onClick={handleEdit}
                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                </td>
                <td class="px-4 py-4">
                  <button
                    onClick={handleDelete}
                    class="font-medium text-red-600 dark:text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
};
