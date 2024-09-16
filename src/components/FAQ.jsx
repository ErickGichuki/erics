import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questions = [
    {
      question: "What is Ericks solutions?",
      answer:
        " An e-commerce platform that offers a wide variety of clothing and home appliances products.",
    },
    {
      question: "How do I become a customer?",
      answer:
        "You can create an account by clicking on the 'Be our customer?' button in the navigation bar and filling out the registration form.",
    },
    {
      question: "Which products do Erick solutions offer?",
      answer:
        "We offer an extensive selection of clothing and home appliances. Our clothing range includes fashionable options for men, women, and children, from casual outfits to formal wear. In home appliances, we provide the latest in technology, including kitchen appliances, entertainment systems, and smart home devices, all from trusted and reliable brands.",
    },
    {
      question: "Where are you located?",
      answer:
        "We are located in Nairobi, Kenya, Muthaiga wambui road, near Muthaiga primary school.",
    },
    {
      question: "What is the return policy?",
      answer:
        "You can return any product within 3 days of purchase as long as it is in its original condition.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach out to our customer support team via email at gichukierick2@gmail.com or call us at +254 713 860 226.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24">
      <h2 className="text-xl text-blue-600 font-bold text-center mb-4">FAQS</h2>
      <h3 className="text-2xl font-bold text-center mb-4">
        You have <span className="text-blue-600">Questions?</span>
      </h3>
      <p className="text-lg mb-8 font-semibold text-gray-700 text-center">
        We've got answers to all of them, so don't worry at all. We are here to
        ensure you get covered.
      </p>
      <div className="space-y-4">
        {questions.map((faq, index) => (
          <div
            key={index}
            className={`border border-gray-300 rounded-md p-4 ${
              activeIndex === index ? "bg-gray-100" : "bg-gray-200"
            }`}
          >
            <button
              onClick={() => toggleAnswer(index)}
              className="w-full text-left text-lg font-bold text-gray-700 flex justify-between items-center focus:outline-none"
            >
              {faq.question}
              <span className="ml-2">
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
