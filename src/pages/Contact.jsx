import React, { useState } from "react";
import { db } from "../components/firebase";
import { collection, addDoc } from "firebase/firestore";

function Contact() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !name || !subject || !message) {
      setStatus("Please fill out all fields.");
      return;
    }

    try {
      await addDoc(collection(db, "contacts"), {
        email,
        name,
        subject,
        message,
        timestamp: new Date(),
      });
      setStatus("Your message has been sent successfully!");
      setEmail("");
      setName("");
      setSubject("");
      setMessage("");
      setTimeout(() => {
        setStatus();
      }, 1500);
    } catch (error) {
      console.error("Error adding document: ", error);
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="pt-24 bg-gray-100 mt-6 mb-4 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-2">Contact us?</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">
              Feel free to <span className="text-violet-500">get in touch</span>{" "}
              with us
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Your satisfaction is our priority. If you have any questions or
              need support, we're here to help. Connect with us and experience
              exceptional service!
            </p>

            {status && <p className="text-green-500 mb-4">{status}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-blue-700 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/premium-photo/torn-white-paper-revealing-blue-section-with-contact-us-inviting-immediate-communication_1230983-3793.jpg?semt=ais_hybrid"
              alt="Contact Us"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
