import React, { useState, useEffect } from "react";
import axios from "axios";
import urls from "../constants/Urls";
import { Table } from "./Table";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FormModal } from "./FormModal";

export const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
  });
  const { logoutUser, user } = UserAuth();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getStudents();
      setStudents(students);
    };
    if (user != "") fetchStudents();
  }, [user]);

  useEffect(() => {
    const fetchStudents = async () => {
      const students = await getStudents();
      setStudents(students);
    };
    if (user !== "") {
      if (keyword === "") fetchStudents();
      else searchStudents();
    }
  }, [page, limit]);

  const getStudents = async () => {
    try {
      console.log("User : " + user);

      const response = await axios.get(
        urls.students + "?page=" + page + "&limit=" + limit,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      console.log(response.data.data);
      setTotalPages(parseInt(response.data.meta.last_page));
      return response.data.data;
    } catch (e) {
      console.log(e);
    }
  };

  const searchStudents = async () => {
    try {
      const response = await axios.get(
        urls.students +
          "?keyword=" +
          keyword +
          "&page=" +
          page +
          "&limit=" +
          limit,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      console.log(response.data.data);
      setTotalPages(parseInt(response.data.meta.last_page));
      setStudents(response.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const addNewStudent = async () => {
    const birthdate = new Date(formData.dateOfBirth);

    const newStudentData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: birthdate,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };

    try {
      const response = await axios.post(urls.students, newStudentData, {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      });
      console.log(response.data);
      const students = await getStudents();
      setStudents(students);
      setShow(false);
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editStudent = async () => {
    const birthdate = new Date(formData.dateOfBirth);

    const newStudentData = {
      id: formData.id,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: birthdate,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
    };

    try {
      const response = await axios.patch(
        urls.students + "/" + formData.id,
        newStudentData,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        }
      );
      console.log(response.data);
      refreshStudents();
      setShow(false);
      setFormData({
        id: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const refreshStudents = async () => {
    const students = await getStudents();
    setStudents(students);
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  const resetFilters = async () => {
    setKeyword("");
    setPage(1);
    setLimit(10);
    refreshStudents();
  };

  return (
    <div className="flex flex-col items-center  h-screen px-16 py-16 mb-16">
      <div className="flex  items-center w-full justify-between">
        <div className="flex flex-2 items-center">
          <button
            type="button"
            class="w-30 text-white font-medium rounded-lg text-sm mb-6 px-5 py-2.5 text-center "
            onClick={async () => {
              refreshStudents();
            }}
          >
            &#10227; Refresh
          </button>
          <button
            type="button"
            class="w-30 text-white font-medium rounded-lg text-sm mb-6 px-5 py-2.5 text-center "
            style={{ flex: 2 }}
            onClick={() => {
              setTitle("Add Student");
              setButtonText("Add");
              setShow(true);
            }}
          >
            + Add new
          </button>
        </div>
        <h1
          className="text-3xl flex-6 text-center font-semibold mb-6 text-white"
          style={{ flex: 6 }}
        >
          Student Management System
        </h1>
        <div className="flex justify-end items-center" style={{ flex: 2 }}>
          <button
            type="button"
            class="w-30   text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm mb-6 px-5 py-2.5 text-center "
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      <div class="relative  shadow-md sm:rounded-lg ">
        <Table
          students={students}
          setStudents={setStudents}
          show={show}
          setShow={setShow}
          formData={formData}
          setFormData={setFormData}
          setTitle={setTitle}
          setButtonText={setButtonText}
          page={page}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
          totalPages={totalPages}
          keyword={keyword}
          setKeyword={setKeyword}
          handleSearch={searchStudents}
          resetFilters={resetFilters}
        />
      </div>
      <FormModal
        show={show}
        setShow={setShow}
        formData={formData}
        setFormData={setFormData}
        title={title}
        buttonText={buttonText}
        addNewStudent={addNewStudent}
        editStudent={editStudent}
      />
    </div>
  );
};
