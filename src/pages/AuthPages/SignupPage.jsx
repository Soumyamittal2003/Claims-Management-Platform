import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient", // Default role is patient
    phone: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign up");
      }

      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      

      {/* Signup Form */}
      <main className="flex-1 bg-gray-100 flex items-center justify-center p-6">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded">
          <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Address</label>
              <input
                type="text"
                name="address"
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                className="w-full px-3 py-2 border rounded focus:outline-none"
                value={formData.role}
                onChange={handleInputChange}
              >
                <option value="patient">Patient</option>
                <option value="insurer">Insurer</option>
              </select>
            </div>
            <button
              type="submit"
              className={`w-full py-2 text-white rounded ${loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </main>

      
    </div>
  );
};

export default SignupPage;
