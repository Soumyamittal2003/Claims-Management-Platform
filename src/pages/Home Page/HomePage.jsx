import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">
            <Link to="/">Claim Management Portal</Link>
          </h1>
          <nav className="flex space-x-4">
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/signup" className="hover:underline">
              Signup
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 bg-gray-100 flex items-center justify-center text-center p-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl font-bold mb-4">
            Simplify Your Claims with Ease
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Manage your insurance claims quickly and effortlessly. Whether
            you're a patient or an insurer, our portal provides the tools you
            need for seamless claim processing.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-8">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border rounded shadow-sm hover:shadow-md">
              <h4 className="text-xl font-bold mb-4">Easy to Use</h4>
              <p className="text-gray-600">
                Submit and track claims with a user-friendly interface designed
                for everyone.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 border rounded shadow-sm hover:shadow-md">
              <h4 className="text-xl font-bold mb-4">Fast Processing</h4>
              <p className="text-gray-600">
                Speed up claim approvals with our efficient backend systems.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 border rounded shadow-sm hover:shadow-md">
              <h4 className="text-xl font-bold mb-4">Secure & Reliable</h4>
              <p className="text-gray-600">
                Your data is protected with top-notch security protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Claim Management Portal</p>
          <p className="text-sm text-gray-400 mt-2">
            Built with ❤️ using React and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
