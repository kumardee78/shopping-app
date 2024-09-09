import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function HamberMenu({ isShown }) {
  return (
    <div className="absolute top-[7.2rem] left-2 z-10">
      <nav
        className={
          isShown ? "w-[15rem] bg-[whitesmoke] mt-2 rounded-xl ml-4 mb-4" : "hidden"
        }
      >
        <Link
          to="/"
          className="py-4 px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431] block"
        >
          Home
        </Link>
        <Link
          to="/products"
          className="py-4 px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431] block"
        >
          Products
        </Link>
        <Link
          to="/cart"
          className="py-4 px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431] block"
        >
          Cart
        </Link>

        {auth.currentUser && (
          <Link
            to="/checkout"
            className="py-4 px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431] block"
          >
            CheckOut
          </Link>
        )}
      </nav>
    </div>
  );
}

export default HamberMenu;
