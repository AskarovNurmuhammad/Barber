import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <footer className="bg-[#111] text-white py-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-30">
          <div>
            <div className="mb-4 flex items-center">
              <img
                src="/barberWhite.png"
                alt="Barber Shop Logo"
                className="h-12"
              />
              <h1 className="text-xl">Trimly</h1>
            </div>
            <p className="text-gray-400 text-sm">
              Welcome to our classic Barber Shop – where tradition meets modern
              style. We provide the finest grooming services in town.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Book Appointment
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4 uppercase">
              Follow Us
            </h4>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-orange-400 transition">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-orange-400 transition">
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Barber Shop. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
