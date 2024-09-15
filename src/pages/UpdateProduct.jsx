import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  doc,
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../components/firebase";

function UpdateProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    imageUrl: "",
  });
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Error fetching products:", error);
      setMessage("Failed to fetch products.");
    }
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing product
        await updateDoc(doc(db, "products", product.id), {
          name: product.name,
          description: product.description,
          price: parseFloat(product.price),
          category: product.category,
          stock: parseInt(product.stock, 10),
          imageUrl: product.imageUrl,
          updatedAt: new Date(),
        });
        setMessage("Product updated successfully!");
      }
      setProduct({
        id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        stock: "",
        imageUrl: "",
      });
      setIsEditing(false);
      fetchProducts(); // Refresh the product list
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error updating product:", error);
      setMessage("Failed to update product.");
    }
  };

  const handleEdit = (productToEdit) => {
    setProduct(productToEdit);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setMessage("Product deleted successfully!");
      fetchProducts(); // Refresh the product list
      setTimeout(() => {
        setMessage("");
      }, 1500);
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("Failed to delete product.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 pt-24 mt-4 border border-gray-200 rounded-lg shadow-lg">
      <button
        onClick={() => navigate("/admin")}
        className="mb-4 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go Back
      </button>
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        {isEditing ? "Edit Product" : "Product List"}
      </h2>
      {message && (
        <p
          className={`text-center mb-6 p-2 rounded ${
            message.includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={product.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2" htmlFor="price">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={product.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={product.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1">
              <label className="block text-gray-700 mb-2" htmlFor="category">
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={product.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-2" htmlFor="stock">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={product.stock}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="imageUrl">
              Image URL
            </label>
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              value={product.imageUrl}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Product
            </button>
          </div>
        </form>
      ) : (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6">Products</h3>
          <ul className="space-y-6">
            {products.map((p) => (
              <li
                key={p.id}
                className="bg-gray-50 p-6 border border-gray-200 rounded-lg shadow-sm"
              >
                <div className="flex flex-col md:flex-row md:space-x-6">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full md:w-40 h-40 object-cover rounded-lg"
                  />
                  <div className="flex-1 mt-4 md:mt-0">
                    <h4 className="text-xl font-semibold mb-2">{p.name}</h4>
                    <p className="text-gray-600 mb-2">{p.description}</p>
                    <p className="text-gray-800 font-semibold">
                      Price: Kshs {p.price}
                    </p>
                    <p className="text-gray-800">Category: {p.category}</p>
                    <p className="text-gray-800">Stock: {p.stock}</p>
                    <div className="mt-4 flex space-x-4">
                      <button
                        onClick={() => handleEdit(p)}
                        className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UpdateProduct;
