import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Insurer = () => {
  const [claims, setClaims] = useState([]); // All claims
  const [filteredClaims, setFilteredClaims] = useState([]); // Filtered claims
  const [selectedClaim, setSelectedClaim] = useState(null); // Selected claim for review
  const [filter, setFilter] = useState({ status: "", minAmount: "", maxAmount: "" });
  const [error, setError] = useState("");

  // Fetch all claims when the component mounts
  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch("http://localhost:5000/claims/all-claims", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch claims.");
        }

        const data = await response.json();
        const claimsWithPatientDetails = await Promise.all(
          data.map(async (claim) => {
            const patientResponse = await fetch(
              `http://localhost:5000/users/${claim.createdBy}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (!patientResponse.ok) {
              return { ...claim, patientDetails: null }; // Handle missing patient details
            }

            const patientData = await patientResponse.json();
            return { ...claim, patientDetails: patientData.data };
          })
        );

        setClaims(claimsWithPatientDetails);
        setFilteredClaims(claimsWithPatientDetails); // Initialize filtered claims
      } catch (err) {
        setError(err.message);
      }
    };

    fetchClaims();
  }, []);

  // Filter claims based on current filter values
  const applyFilters = (filters) => {
    const filtered = claims.filter((claim) => {
      const matchesStatus = filters.status ? claim.status === filters.status : true;
      const matchesMinAmount = filters.minAmount ? claim.claimAmount >= Number(filters.minAmount) : true;
      const matchesMaxAmount = filters.maxAmount ? claim.claimAmount <= Number(filters.maxAmount) : true;
      return matchesStatus && matchesMinAmount && matchesMaxAmount;
    });
    setFilteredClaims(filtered);
  };

  // Handle changes in the filter inputs
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilter = { ...filter, [name]: value };
    setFilter(updatedFilter); // Update filter state
    applyFilters(updatedFilter); // Apply filters immediately
  };

  const handleManageClaim = (claim) => {
    setSelectedClaim(claim);
  };

  const handleUpdateClaim = async (updatedClaim) => {
    try {
      const token = Cookies.get("token");
      const response = await fetch(`http://localhost:5000/claims/update/${selectedClaim._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedClaim),
      });

      if (!response.ok) {
        throw new Error("Failed to update claim.");
      }

      const updatedClaimData = await response.json();
      setClaims((prev) =>
        prev.map((claim) =>
          claim._id === updatedClaimData.claim._id ? updatedClaimData.claim : claim
        )
      );
      setFilteredClaims((prev) =>
        prev.map((claim) =>
          claim._id === updatedClaimData.claim._id ? updatedClaimData.claim : claim
        )
      );
      setSelectedClaim(null); // Close the popup
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-green-500 text-white py-4">
        <h1 className="text-center text-2xl">Insurer Dashboard</h1>
      </header>
      <main className="p-6">
        <h2 className="text-xl font-bold mb-4">All Claims</h2>

        {error && <p className="text-red-500">{error}</p>}

        {/* Filters */}
        <div className="mb-4 flex space-x-4">
          <select
            name="status"
            value={filter.status}
            onChange={handleFilterChange}
            className="border rounded p-2"
          >
            <option value="">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input
            type="number"
            name="minAmount"
            placeholder="Min Amount"
            value={filter.minAmount}
            onChange={handleFilterChange}
            className="border rounded p-2"
          />
          <input
            type="number"
            name="maxAmount"
            placeholder="Max Amount"
            value={filter.maxAmount}
            onChange={handleFilterChange}
            className="border rounded p-2"
          />
        </div>

        {/* Claims Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Policy Name</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Patient Name</th>
                <th className="border px-4 py-2">Submission Date</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim) => (
                <tr key={claim._id}>
                  <td className="border px-4 py-2">{claim.policyName}</td>
                  <td className="border px-4 py-2">{claim.claimAmount}</td>
                  <td className="border px-4 py-2">{claim.patientDetails?.name || "N/A"}</td>
                  <td className="border px-4 py-2">
                    {new Date(claim.submissionDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">{claim.status}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleManageClaim(claim)}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Manage Claim Popup */}
        {selectedClaim && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
              <button
                onClick={() => setSelectedClaim(null)}
                className="absolute top-3 right-3 text-red-500 text-xl"
              >
                &times;
              </button>
              <h2 className="text-xl font-bold mb-4">Manage Claim</h2>
              <p><strong>Policy:</strong> {selectedClaim.policyName}</p>
              <p><strong>Description:</strong> {selectedClaim.description}</p>
              <p><strong>Patient:</strong> {selectedClaim.patientDetails?.name || "N/A"}</p>
              <p><strong>Submission Date:</strong> {new Date(selectedClaim.submissionDate).toLocaleDateString()}</p>
              {selectedClaim.uploadedDocument && (
                <p>
                  <strong>Document:</strong>{" "}
                  <a
                    href={`http://localhost:5000/${selectedClaim.uploadedDocument}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View Document
                  </a>
                </p>
              )}
              <textarea
                name="insurerComments"
                placeholder="Enter comments"
                className="w-full border rounded p-2 mb-4"
                onChange={(e) =>
                  setSelectedClaim((prev) => ({
                    ...prev,
                    insurerComments: e.target.value,
                  }))
                }
              ></textarea>
              <input
                type="number"
                name="approvedAmount"
                placeholder="Approved Amount"
                className="w-full border rounded p-2 mb-4"
                onChange={(e) =>
                  setSelectedClaim((prev) => ({
                    ...prev,
                    approvedAmount: e.target.value,
                  }))
                }
              />
              <button
                onClick={() =>
                  handleUpdateClaim({
                    status: "Approved",
                    approvedAmount: selectedClaim.approvedAmount,
                    insurerComments: selectedClaim.insurerComments,
                  })
                }
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
              >
                Approve
              </button>
              <button
                onClick={() => handleUpdateClaim({ status: "Rejected" })}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Insurer;
