import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("token"));
  const [role, setRole] = useState(Cookies.get("role"));

  const login = () => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");
    setIsLoggedIn(!!token);
    setRole(role);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
    setIsLoggedIn(false);
    setRole(null);
  };

  useEffect(() => {
    login(); 
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
