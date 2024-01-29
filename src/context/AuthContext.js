import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import urls from "../constants/Urls";

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    getFromLocalStorage();
  }, [user]);

  const createUser = async (email, password) => {
    try {
      const response = await axios.post(urls.auth + "/register", {
        email,
        password,
      });
      console.log(response);
      setUser(response.data.idToken.jwtToken);
      saveToLocalStorage(response.data.idToken.jwtToken);
      localStorage.setItem("email", email);
    } catch (error) {
      console.log(error);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(urls.auth + "/login", {
        email,
        password,
      });
      console.log(response);
      setUser(response.data.idToken.jwtToken);
      saveToLocalStorage(response.data.idToken.jwtToken);
      localStorage.setItem("email", email);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = () => {
    try {
      // axios.post(
      //   urls.auth + "/logout",
      //   {
      //     email: user,
      //   },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${user}`,
      //     },
      //   }
      // );
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("email");
    } catch (error) {
      console.log(error);
    }
  };

  const saveToLocalStorage = (user) => {
    localStorage.setItem("user", user);
  };

  const getFromLocalStorage = () => {
    const userL = localStorage.getItem("user");
    if (userL) {
      setUser(userL);
    }
  };

  return (
    <UserContext.Provider value={{ createUser, logoutUser, loginUser, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
