import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Products from "./Products";
import FAQ from "../components/FAQ";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="pt-10">
        <div className="py-20 bg-green-700 flex flex-col items-center">
          <p className="text-white text-xl text-center mb-6">
            Explore our wide range of Electronics and Clothing!
          </p>
          <div className="relative max-w-md w-full md:w-1/2 lg:w-1/3 px-4 sm:px-6 lg:px-8">
            <input
              type="text"
              placeholder="I am looking for..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-3 pr-12 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <FaSearch className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>
        <Products searchQuery={searchQuery} />
        <FAQ />
      </div>
    </>
  );
}

export default Home;
