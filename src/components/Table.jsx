import React, { useEffect, useState } from "react";
import axios from "axios";
import urls from "../constants/Urls";

export const Table = ({
  students,
  setStudents,
  setShow,
  setFormData,
  setTitle,
  setButtonText,
  page,
  setPage,
  limit,
  setLimit,
  totalPages,
  keyword,
  setKeyword,
  handleSearch,
  resetFilters,
  maxDOB,
  setMaxDOB,
  minDOB,
  setMinDOB,
  filterStudents,
}) => {
  const [pageElements, setPageElements] = useState([]);
  console.log(totalPages);

  useEffect(() => {
    setPageNumber();
  }, [totalPages, page]);

  const setPageNumber = () => {
    let x = [];
    for (let i = 0; i < totalPages; i++) {
      x.push(
        <li>
          <a
            onClick={() => setPage(i + 1)}
            class={`flex items-center justify-center px-3 h-8 leading-tight  bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              page === i + 1
                ? "dark:bg-slate-600 dark:text-white"
                : "dark:bg-gray-800 dark:text-gray-400"
            }  dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white`}
          >
            {i + 1}
          </a>
        </li>
      );
    }
    setPageElements(x);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <label
            for="limit"
            class="block my-auto   mr-2 text-xs font-medium text-gray-900 dark:text-white"
          >
            Number of rows
          </label>
          <select
            id="limit"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-15 p-0.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              setLimit(e.target.value);
              setPage(1);
            }}
          >
            <option value="5">5</option>
            <option selected value="10">
              10
            </option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
        </div>
        <div className="flex items-center">
          <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px text-sm">
              <li>
                <a
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                    }
                  }}
                  class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </a>
              </li>
              {pageElements}
              <li>
                <a
                  onClick={() => {
                    if (page < totalPages) {
                      setPage(page + 1);
                    }
                  }}
                  class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="flex justify-start mb-4">
        <input
          type="text"
          name="search"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="button"
          class="ml-5 text-white font-medium rounded-lg text-sm  text-center "
          onClick={handleSearch}
        >
          Search
        </button>

        <button
          type="button"
          class="ml-5 text-red-600 font-medium rounded-lg text-sm  text-center "
          onClick={resetFilters}
        >
          Reset
        </button>
      </div>
      <div className="flex justify-start mb-4">
        <label class="block my-auto  mr-2 text-xs font-medium text-gray-900 dark:text-white">
          Min DOB
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={minDOB}
          onChange={(e) => setMinDOB(e.target.value)}
          className="py-1 px-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <label class="block my-auto ml-5  mx-2 text-xs font-medium text-gray-900 dark:text-white">
          Max DOB
        </label>
        <input
          type="date"
          name="dateOfBirth"
          value={maxDOB}
          onChange={(e) => setMaxDOB(e.target.value)}
          className="py-1 px-2.5 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        <button
          type="button"
          class="ml-5 text-white font-medium rounded-lg text-sm  p  text-center "
          onClick={filterStudents}
        >
          Filter
        </button>
      </div>
      <table class="w-full text-sm text-left mb-4 rtl:text-right text-gray-500 dark:text-gray-400 ">
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
          {students?.map((student) => {
            const birthdate = new Date(student.dateOfBirth);
            const createdAt = new Date(student.created_at);

            const handleEdit = () => {
              console.log(`Editing student with ID: ${student.id}`);
              setTitle("Edit Student");
              setButtonText("Update");
              setFormData({
                id: student.id,
                firstName: student.firstName,
                lastName: student.lastName,
                dateOfBirth: new Date(student.dateOfBirth)
                  .toISOString()
                  .split("T")[0],
                email: student.email,
                phone: student.phone,
                address: student.address,
              });
              setShow(true);
            };

            const handleDelete = () => {
              try {
                if (
                  window.confirm("Are you sure you want to delete this record?")
                ) {
                  axios.delete(urls.students + "/" + student.id);
                  const newStudents = students.filter(
                    (s) => s.id !== student.id
                  );
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
    </>
  );
};
