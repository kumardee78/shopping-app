import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Products from "./Products";
import { ecomContext } from "../App";

function SingleProduct() {
  const { id } = useParams();
  const { handleAddToCart } = useContext(ecomContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        const response = await fetch(
          `https://strapi-store-server.onrender.com/api/products/${id}`
        );
        const result = await response.json();
        console.log(result.data.attributes);
        setProduct(result.data.attributes);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleProduct();
  }, [id]);


  return (
    <>
      {Object.keys(product).length > 0 ? (
        <div className="lg:flex md:px-12 px-8 py-24">
          <div className="md:w-[25rem] w-[16rem] md:h-[25rem] h-[17rem]">
            <img
              src={product.image}
              alt=""
              className="rounded-xl w-full h-full"
            />
          </div>
          <div className="lg:w-1/2 grow lg:px-16">
            <h1 className="md:text-5xl text-3xl font-bold capitalize text-[#394e6a] py-2">
              {product.title}
            </h1>
            <p className="text-xl md:text-3xl font-semibold text-blue-300 md:py-4">
              {product.company}
            </p>
            <p className="md:text-2xl py-4 ">${product.price / 100}</p>
            <p className="md:text-xl  md:py-6">{product.description}</p>
            <button className="bg-blue-300 text-white py-2 px-4 md:mb-4 md-0 my-6 md:my-0 " onClick={(e)=> handleAddToCart(e, product)}>Add To Cart</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SingleProduct;
