import React from "react";
import { FaYoutube, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-green-800 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">ERICK SOLUTIONS</h2>
            <p className="mb-4">
              Your go-to online shopping destination for clothing and home
              appliances. Customers are our number one focus we care about them.
            </p>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
            <a href="/" className="mb-2">
              Home
            </a>
            <a href="/about" className="mb-2">
              About
            </a>
            <a href="/contact" className="mb-2">
              Contact
            </a>
            <a href="/login">Login</a>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Contact</h2>
            <a href="mailto:gichukierick2@gmail.com" className="mb-2">
              Email Us
            </a>
            <a href="#" className="mb-2">
              Telephone
            </a>
            <a href="/faq" className="mb-2">
              FAQ
            </a>
            <a href="">Facebook</a>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">Location</h2>
            <p className="mb-4">We are located in Kenya.</p>
            <p className="mb-4">Muthaiga, Nairobi</p>
            <p>Near Muthaiga Primary Sch</p>
          </div>
        </div>
      </div>
      <div className=" -500 py-4 mt-10">
        <div className="container mx-auto text-center text-white">
          All Rights Reserved. &copy;{new Date().getFullYear()} Erick Solutions
        </div>
      </div>
    </div>
  );
}

export default Footer;
