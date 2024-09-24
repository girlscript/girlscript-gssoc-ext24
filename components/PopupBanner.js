import React from "react";
import Image from "next/image";
import Link from "next/link";

const PopupBanner = ({ onClose }) => {
  return (
    <div className="fixed font-sans inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg relative shadow-lg text-center animate-fadeIn w-full max-w-xl">
        <div className="relative w-full h-64">
          <img
            src="/GSSOC-extd-banner.png"
            layout="fill"
            alt="GSSOC Registration Banner"
            draggable="false"
            sizes="(max-width: 640px) 100vw, 
                                (max-width: 768px) 100vw, 
                                (max-width: 1024px) 100vw, 
                                100vw"
          />
        </div>
        <button
          onClick={onClose}
          className="absolute top-1 right-4 text-gray-500 hover:text-gray-800 h-7 w-7 text-2xl"
        >
          &times;
        </button>
        <div className="text-3xl font-bold text-center text-[#f57d33] max-[400px] mt-4 w-full max-w-3xl m-auto">
          🎉 Registrations are now open 🎉
          <div className="flex justify-center items-center mt-4">
            <Link href="/registration">
              <button
                className="bg-[#f57d33] z-10 text-white px-4 cursor-pointer py-2 rounded-lg text-xl font-bold  transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                onClick={onClose}
              >
                Register here
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupBanner;
