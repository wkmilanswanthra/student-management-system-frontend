import React from "react";
import "../styles/AuthPage.css";
import { Outlet } from "react-router-dom";

export const AuthPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-16 py-16">
      <h1 className="text-3xl font-semibold mb-6 text-center text-white">
        Student Management System
      </h1>
      <div className="w-full bg-[#1f2937] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
        <Outlet />
      </div>
    </div>
  );
};
