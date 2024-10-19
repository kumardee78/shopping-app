import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
// import Products from "./Products";
import { ecomContext } from "../App";
import { toast } from "react-toastify";


function SingleProduct() {
  const { id } = useParams();
  const { cart, setCart } = useContext(ecomContext);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchSingleProduct() {
      try {
        const response = await fetch(
          `https://strapi-store-server.onrender.com/api/products/${id}`
        );
        const result = await response.json();
        let newObj = { ...result?.data?.attributes, id };
        setProduct(newObj);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleProduct();
  }, [id]);

  function handleAddToCart(product) {
    const existingProductIndex = cart.find((item) => item.id === product.id);
    if (!existingProductIndex) {
      product.quantity = 1;
      setCart([...cart, product]);
      toast.success("Item added successfully to cart");
    }
  }

  return (
    <>
      {Object.keys(product).length > 0 ? (
        <div className="lg:flex md:px-12 px-8 py-24">
          <div data-aos="zoom-in" className="md:w-[25rem] w-[16rem] md:h-[25rem] h-[17rem]">
            <img
              src={product.image}
              alt=""
              className="rounded-xl w-full h-full"
            />
          </div>
          <div className="lg:w-1/2 grow lg:px-16">
            <h1 data-aos="fade-right" className="md:text-5xl text-3xl font-bold capitalize text-[#394e6a] py-2">
              {product.title}
            </h1>
            <p data-aos="fade-left" className="text-xl md:text-3xl font-semibold text-blue-300 md:py-4">
              {product.company}
            </p>
            <p className="md:text-2xl py-4 ">${product.price / 100}</p>
            <p data-aos="fade-left" className="md:text-xl  md:py-6">{product.description}</p>
            <button
              data-aos="zoom-in"
              className="bg-blue-300 text-white py-2 px-4 md:mb-4 md-0 my-6 md:my-0 "
              onClick={() => handleAddToCart(product)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default SingleProduct;
