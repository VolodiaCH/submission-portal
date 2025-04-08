import React from "react";
import { useRouter } from "next/navigation";

const ThankYou = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xlrounded-xl p-8 text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Thank you for submitting your assignment!
        </h1>
        <div className="text-center">
          <button
            onClick={() => router.replace("/")}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-700 transition"
          >
            Back to Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
