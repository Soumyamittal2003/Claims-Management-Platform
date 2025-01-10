import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Footer from "./components/Footer"; // Import Footer component

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="font-sans flex flex-col min-h-screen">
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
          <main className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
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
          </main>
          <Footer /> {/* Add Footer component */}
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
