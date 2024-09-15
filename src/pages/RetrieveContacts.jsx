import React, { useEffect, useState } from "react";
import { db } from "../components/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import "../App.css";

function RetrieveContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const contactsCollection = collection(db, "contacts");
    const contactsQuery = query(
      contactsCollection,
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(contactsQuery, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 background min-h-screen pt-24 mt-2">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-black mb-12">
          Messages
        </h1>
        <button
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 block mx-auto"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        {loading ? (
          <p className="text-center mt-4 text-gray-600">Loading...</p>
        ) : (
          <div className="space-y-6">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-md border border-gray-200"
              >
                <div className="mb-4">
                  <span className="font-bold">Email: </span>
                  {contact.email}
                </div>
                <div className="mb-4">
                  <span className="font-bold">Name: </span>
                  {contact.name}
                </div>
                <div className="mb-4">
                  <span className="font-bold">Subject: </span>
                  {contact.subject}
                </div>
                <div className="mb-4">
                  <span className="font-bold">Message: </span>
                  {contact.message}
                </div>
                <div className="text-gray-500">
                  <span className="font-bold">Time: </span>
                  {new Date(contact.timestamp?.seconds * 1000).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RetrieveContacts;
