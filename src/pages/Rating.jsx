import React, { useState } from "react";

const Rating = () => {
  const [rating, setRating] = useState(0);

  const handleMouseEnter = (value) => {
    setRating(value);
  };

  const handleMouseLeave = () => {
    setRating(0);
  };

  const handleClick = (value) => {
    setRating(value);
  };

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((value) => (
        <svg
          key={value}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
          onMouseLeave={handleMouseLeave}
          className={`h-10 w-10 cursor-pointer transition-transform duration-200 ${
            value <= rating
              ? "text-yellow-400 transform scale-110"
              : "text-gray-300"
          } hover:text-yellow-500 hover:scale-110`}
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24l-9.19-.73L12 2 10.18 8.51 1 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
      <span className="ml-4 text-lg font-medium text-gray-800">
        {rating ? `Rating: ${rating}` : "Rate it!"}
      </span>
    </div>
  );
};

export default Rating;
