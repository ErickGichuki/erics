import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem("accessToken");
    // Redirect to home page
    navigate("/");
  };
  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(/backgroundadmin.png)` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute top-24 left-0 w-full p-4 flex justify-center items-center z-50">
        <nav className="flex space-x-4">
          <Link
            to="/createproduct"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Create Product
          </Link>
          <Link
            to="/retrievecontacts"
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Messages
          </Link>
          <button
            className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        </nav>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen text-center relative z-10">
        <h2 className="text-3xl font-bold mt-12 text-green-400 mb-12">
          Hi Admin! Welcome to your dashboard
        </h2>
        <p className="text-white text-lg mb-4">
          As an admin you are able to create, update and even delete products.
        </p>
        <div className="flex space-x-8">
          <Link
            to="/updateproduct"
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded text-xl"
          >
            Manage Products
          </Link>
        </div>
        <p className="my-5 text-lg text-white">A home of managing products!</p>
      </div>
    </div>
  );
}

export default Admin;
