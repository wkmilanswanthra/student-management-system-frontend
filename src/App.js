import React from "react";
import { AuthPage } from "./components/AuthPage";
import { Dashboard } from "./components/Dashboard";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { UserAuth } from "./context/AuthContext";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<AuthPage />}>
          <Route path="/" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
