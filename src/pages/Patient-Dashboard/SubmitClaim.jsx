import React, { useState } from "react";
import Cookies from "js-cookie"; 

const SubmitClaim = ({ onClose }) => {
  const [formData, setFormData] = useState({
    policyName: "",
    claimAmount: "",
    description: "",
    uploadedDocument: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = Cookies.get("token"); 
      if (!token) {
        throw new Error("Authentication token is missing. Please log in again.");
      }

      const formDataToSend = new FormData();
      formDataToSend.append("policyName", formData.policyName);
      formDataToSend.append("claimAmount", formData.claimAmount);
      formDataToSend.append("description", formData.description);
      if (formData.uploadedDocument) {
        formDataToSend.append("uploadedDocument", formData.uploadedDocument);
      }

      const response = await fetch("http://localhost:5000/claims/new-create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit claim.");
      }

      setSuccess("Claim submitted successfully!");
      
      setFormData({
        policyName: "",
        claimAmount: "",
        description: "",
        uploadedDocument: null,
      });

      
      window.location.reload();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Submit a Claim</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium">Policy Name</label>
          <input
            type="text"
            name="policyName"
            className="w-full p-2 border rounded"
            value={formData.policyName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Claim Amount</label>
          <input
            type="number"
            name="claimAmount"
            className="w-full p-2 border rounded"
            value={formData.claimAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            className="w-full p-2 border rounded"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Upload Document (optional)</label>
          <input
            type="file"
            name="uploadedDocument"
            className="w-full p-2"
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Claim"}
        </button>
      </form>
    </div>
  );
};

export default SubmitClaim;
