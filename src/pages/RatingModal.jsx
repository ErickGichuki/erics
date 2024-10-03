import React from "react";
import StarRating from "./StarRating"; // Ensure the path is correct

function RatingModal({ isOpen, onClose, rating, setRating, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Rate this product</h2>
        {/* Pass both the rating and setRating to StarRating */}
        <StarRating rating={rating} setRating={setRating} />
        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={onSubmit}
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
