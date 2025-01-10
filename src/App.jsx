import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthProvider from "./utils/AuthContext"; // Import AuthProvider
import PrivateRoute from "./utils/PrivateRoute";

// Pages
import HomePage from "./pages/Home Page/HomePage";
import LoginPage from "./pages/AuthPages/LoginPage";
import SignupPage from "./pages/AuthPages/SignupPage";
import Patient from "./pages/Patient-Dashboard/PortalPatient";
import Insurer from "./pages/Insurer-Dashboard/PortalInsurer";
import Error404 from "./pages/AuthPages/Error404";

// Components
import Header from "./components/Header";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="font-sans max-h-screen">
          <Header />
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
              element={<HomePage />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

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
    </AuthProvider>
  );
}

export default App;
