import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./utils/PrivateRoute";
import Cookies from "js-cookie";
import HomePage from "./pages/Home Page/HomePage";
import LoginPage from "./pages/AuthPages/LoginPage";
import Patient from "./pages/Patient-Dashboard/PortalPatient";
import Insurer from "./pages/Insurer-Dashboard/PortalInsurer";
import Error404 from "./pages/AuthPages/Error404";

function App() {
  const token = Cookies.get("token");
  const role = Cookies.get("role"); // Retrieve the role from cookies

  return (
    <BrowserRouter>
      <div className="font-sans max-h-screen">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              token ? (
                role === "insurer" ? (
                  <Navigate to="/insurer-dashboard" />
                ) : (
                  <Navigate to="/patient-dashboard" />
                )
              ) : (
                <HomePage />
              )
            }
          />
          <Route path="/login" element={<LoginPage />} />

          {/* Private Routes */}
          <Route
            path="/patient-dashboard/*"
            element={
              <PrivateRoute>
                <Patient />
              </PrivateRoute>
            }
          />
          <Route
            path="/insurer-dashboard/*"
            element={
              <PrivateRoute>
                <Insurer />
              </PrivateRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
