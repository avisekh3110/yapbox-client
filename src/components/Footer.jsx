import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2f3136] text-gray-300 py-6">
      <div
        className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center
       items-center gap-4"
      >
        <div className="flex gap-4 text-gray-400">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="mt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} YourAppName. All rights reserved.
      </div>
    </footer>
  );
}
