import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="md:flex items-center md:py-32 py-16 ">
      <div className="flex items-center justify-start md:w-[50%]">
        <div className="md:w-[85%] ">
          <h1 className="md:text-6xl text-4xl font-bold text-[#394e6a]">
            We are changing the way people shop
          </h1>
          <p className="py-10">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
            dignissimos culpa aspernatur aliquid soluta pariatur, repudiandae
            nihil error repellat ipsum! Ad omnis culpa id quisquam, quis quaerat
            libero dolore fugiat.
          </p>
          <Link to="/products" className="bg-blue-400 text-xl text-white py-2 px-3 rounded-md hover:bg-[#394e6a] duration-300">
            Our Products
          </Link>
        </div>
      </div>
      <div className="md:block hidden h-[30rem] p-4 bg-[#021431] rounded-xl w-[50%]">
        <img
          src="hero1-deae5a1f.webp"
          alt=""
          className="h-full w-[30rem] rounded-xl"
        />
      </div>
    </div>
  );
}

export default Hero;
