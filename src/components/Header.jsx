import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const Header = () => {
  const { isLoggedIn, role, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to home page after logout
  };

  const isDashboardRoute = location.pathname.includes("dashboard");

  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold">
          <Link to="/">Claim Management Portal</Link>
        </h1>
        <nav className="flex space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/signup" className="hover:underline">
                Signup
              </Link>
            </>
          ) : (
            <>
              {isDashboardRoute ? (
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              ) : (
                <Link
                  to={
                    role === "patient"
                      ? "/patient-dashboard"
                      : "/insurer-dashboard"
                  }
                  className="hover:underline"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="hover:underline text-red-500"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
