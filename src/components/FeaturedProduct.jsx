import React, { useContext } from "react";
import { ecomContext } from "../App";
import { Link } from "react-router-dom";

function FeaturedProduct() {
  const { products } = useContext(ecomContext);
  const featuredProducts = products.filter((product, index) => {
    return product.attributes.featured === true;
  });
  // console.log(featuredProducts);

  return (
    <div>
      <h1 className="md:text-4xl text-2xl font-semibold py-6">Featured Products</h1>
      <hr />
      <div className="flex flex-wrap gap-4 text-center text-xl py-20">
        {featuredProducts.map((prod, index) => {
          return (
            <div className="w-[20rem] h-[25rem] rounded-lg shadow-xl hover:shadow-2xl p-4 bg-[whiteSmoke] duration-300" key={index}>
              <Link to={`/products/${prod.id}`}>
                <img
                  src={prod.attributes.image}
                  alt=""
                  className="w-full rounded-lg h-[70%]"
                />
                <p className="text-3xl py-3 font-semibold">
                  {prod.attributes.title}
                </p>
                <p className="text-xl py-3">${prod.attributes.price / 100}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedProduct;
