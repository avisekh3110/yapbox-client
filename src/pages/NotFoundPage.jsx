import React from "react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-secondary-c">
      <h1 className="text-[8rem] font-bold text-secondary-a mb-4">404</h1>

      <p className="text-xl text-secondary-a mb-8 text-center max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-lg font-semibold"
      >
        Return to Home
      </Link>
    </div>
  );
}
