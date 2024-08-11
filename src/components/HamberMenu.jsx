import React from "react";
import { Link } from "react-router-dom";

function HamberMenu({isShown}) {
  return (
    <div className="absolute top-[7.5rem] -left-2 z-10">
      <nav
        className={
          isShown ? "w-[15rem] bg-[whiteSmoke] mt-2 rounded-xl ml-4" : "hidden"
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
          to="/checkout"
          className="py-4 px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431] block"
        >
          CheckOut
        </Link>
      </nav>
    </div>
  );
}

export default HamberMenu;
