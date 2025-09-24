import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#2f3136] text-white">
      {/* Big 404 */}
      <h1 className="text-[8rem] font-bold text-gray-400 mb-4">404</h1>

      {/* Description */}
      <p className="text-xl text-gray-300 mb-8 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Home button */}
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
      >
        Return to Home
      </Link>

      <div className="text-gray-500 mt-12 text-sm">
        &copy; 2025 BakBak • Made with ❤️
      </div>
    </div>
  );
}
