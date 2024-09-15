import React from "react";
import {
  FaThumbsUp,
  FaBriefcase,
  FaShieldAlt,
  FaClock,
  FaLightbulb,
  FaUsers,
} from "react-icons/fa";

function About() {
  return (
    <div className="p-8 py-24 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row mb-12 gap-8 items-center">
          <div className="md:w-1/2">
            <h2 className="text-2xl font-semibold mt-2 mb-4 text-blue-600">
              About us
            </h2>
            <p className="text-lg text-gray-700 ">
              Founded with a passion for innovation and customer satisfaction,
              Erick solutions has quickly become a trusted name in e-commerce.
              Our platform is designed to provide you with an effortless and
              enjoyable journey as you explore a curated selection of clothing
              and interiors. We believe in delivering not only high-quality
              products but also exceptional service that exceeds your
              expectations.
            </p>
            <div className="my-6">
              <a href="">
                <button className="bg-purple-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-purple-700 transition-colors duration-300 cursor-pointer">
                  Talk to Us
                </button>
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/premium-photo/collection-camera-camera-sunglasses-hat-table_1086760-81866.jpg?semt=ais_hybrid"
              alt="About Clickshop Haven"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row mb-12 gap-8">
          <div className="md:w-1/2">
            <img
              src="https://img.freepik.com/free-photo/composition-with-neatly-organized-arranged-sport-items_23-2150275273.jpg?semt=ais_hybrid"
              alt="Vision"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700">
              Our mission is to connect you with the best in fashion and home
              appliances from the comfort of your home. We strive to offer a
              user-friendly platform where you can easily find and purchase
              products that meet your needs and preferences.
              <br />
              <br />
              We are dedicated to ensuring a seamless shopping experience,
              offering high-quality products from trusted brands at competitive
              prices. Our goal is to make fashion and home styling accessible to
              everyone, whether you're looking for the latest trends or timeless
              pieces that fit your style.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-8">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-12">
            <div className="flex flex-col items-center text-center">
              <FaThumbsUp className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">Customer Satisfaction</h3>
              <p className="text-gray-600 mt-2">
                Our customers are our number one focus. Customer feedback has
                brought us this far.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaBriefcase className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">Professionalism</h3>
              <p className="text-gray-600 mt-2">
                We strive for excellence in every aspect of our work, ensuring
                quality and professionalism in all we do.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaLightbulb className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-gray-600 mt-2">
                At Erick solutions we challenge status quo by embracing change;
                we encourage uncoventional thinking and creativity.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaUsers className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">Team Work</h3>
              <p className="text-gray-600 mt-2">
                We encourage and enable each other's growth. We collaborate to
                meet customer needs and drive company growth.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaClock className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">On Time Delivery</h3>
              <p className="text-gray-600 mt-2">
                We consistently deliver our services on time, ensuring client
                satisfaction.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <FaShieldAlt className="text-4xl text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">Integrity</h3>
              <p className="text-gray-600 mt-2">
                We uphold the highest standards of honesty and integrity in all
                our dealings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
