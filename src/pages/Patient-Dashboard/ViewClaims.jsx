import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ViewClaims = ({ onKnowMore }) => {
  const [claims, setClaims] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch("http://localhost:5000/claims/myclaims", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch claims.");
        }

        const data = await response.json();
        setClaims(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClaims();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {error && <p className="text-red-500">{error}</p>}
      {claims.map((claim) => (
        <div key={claim._id} className="p-4 bg-white rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">{claim.policyName}</h3>
          <p className="text-gray-700">Claim Amount: {claim.claimAmount}</p>
          <p className="text-gray-700">Status: {claim.status}</p>
          <button
            onClick={() => onKnowMore(claim._id)}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Know More
          </button>
        </div>
      ))}
    </div>
  );
};

export default ViewClaims;
