import React, { useEffect, useState } from "react";
import { AiFillInfoCircle, AiFillDelete } from "react-icons/ai";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [notification, setNotification] = useState(""); // State for notification
  const [notificationType, setNotificationType] = useState(""); // State for notification type

  useEffect(() => {
    const fetchCartItems = () => {
      const items = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(items);
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    setNotification("Item removed from cart");
    setNotificationType("error"); // Set notification type to error for removal
    setTimeout(() => {
      setNotification("");
      setNotificationType(""); // Clear type after notifiction disappears
    }, 3000);
  };

  const handleBookItem = (item) => {
    // Implement your booking logic here
    setNotification(`Booking ${item.name} will be implemented soon.`);
    setNotificationType("info"); // Set notification type to info for booking
    setTimeout(() => {
      setNotification("");
      setNotificationType(""); // Clear type after notification disappears
    }, 3000);
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const notificationStyles = {
    error: "text-red-500",
    info: "text-blue-500",
  };

  const notificationIcons = {
    error: <AiFillDelete className="mr-2 text-lg" />, // Red delete icon
    info: <AiFillInfoCircle className="mr-2 text-lg" />, // Blue info icon
  };

  return (
    <div className="max-w-6xl mx-auto p-4 pt-24">
      <h2 className="text-2xl font-bold mb-6 mt-6 text-center">
        Welcome to your cart
      </h2>
      {notification && (
        <p
          className={`mb-4 text-center ${notificationStyles[notificationType]} text-lg flex items-center justify-center`}
        >
          {notificationIcons[notificationType]}
          {notification}
        </p>
      )}
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border p-4 rounded shadow hover:scale-105 transition-transform duration-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-700 mb-2">{item.description}</p>
                <p className="text-gray-900 font-bold">Kshs {item.price}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleBookItem(item)}
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold">Total Amount</h3>
            <p className="text-2xl font-bold">Kshs {calculateTotalAmount()}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
