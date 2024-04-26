import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-3">
        {/* Quick Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">About Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Shipping Information</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="">
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p>Email: info@example.com</p>
            <p>Phone: +1234567890</p>
            <p>Address: 123 Main Street, City, Country</p>
            <div className="mt-8 flex">
              <a href="#" className="text-xl hover:text-gray-300"><FaFacebook /></a>
              <a href="#" className="text-xl hover:text-gray-300 ml-4"><FaTwitter /></a>
              <a href="#" className="text-xl hover:text-gray-300 ml-4"><FaInstagram /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
