import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Claim Management Portal</p>
        <p className="text-sm text-gray-400 mt-2">
          Built by soumya using React and Tailwind css
        </p>
      </div>
    </footer>
  );
};

export default Footer;
