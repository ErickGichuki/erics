import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; // Added updateDoc
import { db } from "../components/firebase";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

function Products({ searchQuery = "" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [notification, setNotification] = useState("");

  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || "Unnamed Product",
            imageUrl: data.imageUrl || "default-image-url.jpg",
            description: data.description || "No description available",
            price: data.price || 0,
            stock: data.stock || 0,
            category: data.category || "Uncategorized",
            views: data.views || 0,
            ratings: data.ratings || 0,
          };
        });
        setProducts(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      (product.name || "")
        .toLowerCase()
        .includes((searchQuery || "").toLowerCase())
    )
    .filter((product) => (category ? product.category === category : true))
    .filter((product) => {
      if (!priceRange) return true;
      if (priceRange === "low") return product.price < 2000;
      if (priceRange === "medium")
        return product.price >= 2000 && product.price < 10000;
      if (priceRange === "high") return product.price >= 10000;
      return false;
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "stock") {
      return a.stock - b.stock;
    }
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    setNotification(`${product.name} added to cart!`);
    setTimeout(() => setNotification(""), 3000);
  };

  // Star Rating Component
  const StarRating = ({ productId, initialRating }) => {
    const [rating, setRating] = useState(initialRating);

    const handleRating = async (newRating) => {
      setRating(newRating); // Update the rating locally

      try {
        // Update the rating in Firebase
        const productRef = doc(db, "products", productId);
        await updateDoc(productRef, { ratings: newRating });

        console.log("Rating updated successfully!");
      } catch (error) {
        console.error("Error updating rating:", error);
      }
    };

    return (
      <div className="flex">
        {[...Array(5)].map((_, index) => {
          const starRating = index + 1;
          return (
            <FaStar
              key={index}
              className={`cursor-pointer ${
                starRating <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => handleRating(starRating)}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pt-20 mt-2">
      {notification && (
        <div className="bg-green-500 text-white p-2 mb-4 text-center rounded">
          {notification}
        </div>
      )}
      <h2 className="text-2xl font-bold mb-6 text-center">
        Welcome to Erick solutions where innovation meets elegance.
      </h2>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        {/* Category Filter */}
        <div className="flex-1 min-w-[200px]">
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="border rounded p-2 w-full"
          >
            <option value="">All Categories</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex-1 min-w-[200px]">
          <select
            onChange={(e) => setPriceRange(e.target.value)}
            value={priceRange}
            className="border rounded p-2 w-full"
          >
            <option value="">All Prices</option>
            <option value="low">Below Kshs 2,000</option>
            <option value="medium">Kshs 2,000 - Kshs 10,000</option>
            <option value="high">Above Kshs 10,000</option>
          </select>
        </div>

        {/* Sort By Filter */}
        <div className="flex-1 min-w-[200px]">
          <select
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
            className="border rounded p-2 w-full"
          >
            <option value="">Sort By</option>
            <option value="name">Name</option>
            <option value="stock">Stock</option>
          </select>
        </div>
      </div>

      {error ? (
        <p className="text-red-500">
          Failed to load products. Please try again later.
        </p>
      ) : loading ? (
        <div className="flex justify-center items-center">
          <AiOutlineLoading3Quarters className="text-4xl text-blue-700 animate-spin" />
        </div>
      ) : currentProducts.length === 0 ? (
        <p>No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:scale-105 transition-transform duration-200"
            >
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-900 font-bold">Kshs {product.price}</p>
              <p className="text-gray-900">{product.stock} items remaining</p>

              {/* Flex container for button and star rating */}
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Add to Cart
                </button>

                {/* Dynamic Star Rating */}
                <StarRating
                  productId={product.id}
                  initialRating={product.ratings}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

// Pagination Component
function Pagination({
  productsPerPage,
  totalProducts,
  currentPage,
  onPageChange,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`mx-1 py-2 px-4 rounded ${
            currentPage === number ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          {number}
        </button>
      ))}
    </div>
  );
}

export default Products;
