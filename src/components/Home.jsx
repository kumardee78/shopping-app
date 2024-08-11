import React from "react";
import Hero from "./Hero";
import FeaturedProduct from "./FeaturedProduct";

function Home() {
  return (
    <div className="md:px-20 px-8">
      <Hero />
      <FeaturedProduct />
    </div>
  );
}

export default Home;
