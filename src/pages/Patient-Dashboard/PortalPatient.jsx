import React, { useState } from "react";
import SubmitClaim from "./SubmitClaim";
import ClaimDetails from "./ClaimDetails"; // New component for showing claim details
import ViewClaims from "./ViewClaims";

const Patient = () => {
  const [showSubmitPopup, setShowSubmitPopup] = useState(false); // Control for Submit Claim popup
  const [showDetailsPopup, setShowDetailsPopup] = useState(false); // Control for Claim Details popup
  const [selectedClaim, setSelectedClaim] = useState(null); // For storing the selected claim details

  const handleOpenSubmitPopup = () => setShowSubmitPopup(true);
  const handleCloseSubmitPopup = () => setShowSubmitPopup(false);

  const handleOpenDetailsPopup = (claimId) => {
    setSelectedClaim(claimId);
    setShowDetailsPopup(true);
  };
  const handleCloseDetailsPopup = () => setShowDetailsPopup(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-yellow-500 text-white py-4">
        <h1 className="text-center text-2xl">Patient Dashboard</h1>
      </header>
      <main className="p-6 space-y-6">
        {/* Submit Claim Button */}
        <div className="text-center">
          <button
            onClick={handleOpenSubmitPopup}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg"
          >
            Submit New Claim
          </button>
        </div>

        {/* My Claims Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">My Claims</h2>
          <ViewClaims onKnowMore={handleOpenDetailsPopup} />
        </section>
        {/* Submit Claim Popup */}
        {showSubmitPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              {/* Close Button */}
              <button
                onClick={handleCloseSubmitPopup}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <SubmitClaim onClose={handleCloseSubmitPopup} />
            </div>
          </div>
        )}

        {/* Claim Details Popup */}
        {showDetailsPopup && selectedClaim && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
              {/* Close Button */}
              <button
                onClick={handleCloseDetailsPopup}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              <ClaimDetails
                claimId={selectedClaim}
                onClose={handleCloseDetailsPopup}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Patient;
