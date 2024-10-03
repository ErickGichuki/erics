const StarRating = ({ productId, initialRating }) => {
  const [userRating, setUserRating] = useState(initialRating); // Track the current rating

  const handleRatingClick = async (newRating) => {
    setUserRating(newRating); // Update the rating UI immediately

    try {
      // Update the rating in Firestore
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { ratings: newRating });

      console.log(`Rating for product ${productId} updated to ${newRating}`);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
  };

  return (
    <div className="flex">
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < userRating ? "text-yellow-500" : "text-gray-300"}
          onClick={() => handleRatingClick(index + 1)} // Set rating on star click
        />
      ))}
    </div>
  );
};
