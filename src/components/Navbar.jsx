import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

function Navbar({ cartCount }) {
  // Receive cartCount as a prop
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle menu link click
  const handleLinkClick = () => {
    setIsOpen(false); // Close the menu
  };

  return (
    <>
      <nav className="text-white bg-green-700 fixed top-0 left-0 z-50 w-full p-8 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-xl font-bold">
              Erick Solutions
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 text-md">
            <Link to="/about" className="hover:text-gray-300">
              About Us
            </Link>
            <Link
              to="/signup"
              className="hidden md:block text-md hover:text-gray-300"
            >
              Be Our Customer?
            </Link>
            <Link to="/contact" className="hover:text-gray-300">
              Contact Us
            </Link>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link
              to="/cart"
              className="hover:text-gray-300 flex items-center relative"
            >
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <button
            className="md:hidden flex items-center px-3 py-2 rounded text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden w-full px-2 pt-4 pb-3 space-y-1 transition-transform transform ease-in-out duration-300 relative">
            <Link
              to="/about"
              className="block text-base font-medium hover:text-gray-300 cursor-pointer"
              onClick={handleLinkClick} // Close menu on click
            >
              About Us
            </Link>
            <Link
              to="/signup"
              className="block text-base font-medium hover:text-gray-300 cursor-pointer"
              onClick={handleLinkClick} // Close menu on click
            >
              Be Our Customer?
            </Link>
            <Link
              to="/contact"
              className="block text-base font-medium hover:text-gray-300 cursor-pointer"
              onClick={handleLinkClick} // Close menu on click
            >
              Contact Us
            </Link>
            <Link
              to="/login"
              className="block text-base font-medium hover:text-gray-300 cursor-pointer"
              onClick={handleLinkClick} // Close menu on click
            >
              Login
            </Link>
            <Link
              to="/cart"
              className="hover:text-gray-300 flex items-center relative cursor-pointer"
              onClick={handleLinkClick} // Close menu on click
            >
              <FaShoppingCart className="text-xl" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-2 py-1">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Navbar;
