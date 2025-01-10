import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ClaimDetails = ({ claimId, onClose }) => {
  const [claim, setClaim] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClaimDetails = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch(`https://claims-management-platform-backend.onrender.com/claims/${claimId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch claim details.");
        }

        const data = await response.json();
        setClaim(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchClaimDetails();
  }, [claimId]);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!claim) {
    return <p>Loading claim details...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{claim.policyName}</h2>
      <p><strong>Claim Amount:</strong> {claim.claimAmount}</p>
      <p><strong>Description:</strong> {claim.description}</p>
      <p><strong>Status:</strong> {claim.status}</p>
      <p><strong>Approved Amount:</strong> {claim.approvedAmount || "N/A"}</p>
      <p><strong>Insurer Comments:</strong> {claim.insurerComments || "N/A"}</p>
      <p>
        <strong>Submission Date:</strong>{" "}
        {new Date(claim.submissionDate).toLocaleDateString()}
      </p>
      {claim.reviewedDate && (
        <p>
          <strong>Reviewed Date:</strong>{" "}
          {new Date(claim.reviewedDate).toLocaleDateString()}
        </p>
      )}
      {claim.uploadedDocument && (
        <p>
          <strong>Uploaded Document:</strong>{" "}
          <a
            href={`https://claims-management-platform-backend.onrender.com/${claim.uploadedDocument}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            View Document
          </a>
        </p>
      )}
    </div>
  );
};

export default ClaimDetails;
