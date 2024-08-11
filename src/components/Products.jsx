import React, { useContext, useEffect, useState } from "react";
import { ecomContext } from "../App";
import { Link } from "react-router-dom";

function Products() {
  const { products, setProducts } = useContext(ecomContext);
  const [inputValue, setInputValue] = useState("");
  const [filterProducts, setFilterProducts] = useState(products);

  const filterProduct = () => {
    const temp = [...products];
    const filtered = temp.filter((product) => {
      return product.attributes.title.toLowerCase().includes(inputValue);
    });
    // console.log(filtered);
    setFilterProducts(filtered);
  };
  useEffect(() => {
    filterProduct();
  }, [inputValue, products]);

  const filterCompany = (e) => {
    let target = e.target.value;
    if (
      target === "modenza" ||
      target === "luxora" ||
      target === "artifex" ||
      target === "comfora" ||
      target === "homestead"
    ) {
      console.log(target);
      let temp = [...products];
      const filtered = temp.filter((item) =>
        item.attributes.company.toLowerCase().includes(target)
      );
      setFilterProducts(filtered);
    } else if (target === "all") {
      setFilterProducts(products);
    }
  };

  const filterCategory = (e) => {
    let target = e.target.value;
    if (
      target === "table" ||
      target === "chairs" ||
      target === "kids" ||
      target === "sofa" ||
      target === "bed"
    ) {
      console.log(target);
      let temp = [...products];
      const filtered = temp.filter((item) =>
        item.attributes.category.toLowerCase().includes(target)
      );
      setFilterProducts(filtered);
    } else if (target === "all") {
      setFilterProducts(products);
    }
  };

  const sortedProduct = (e) => {
    let target = e.target.value;
    let temp = [...products];
    if (target === "a-z") {
      const filtered = temp.sort((a, b) =>
        a.attributes.title.localeCompare(b.attributes.title)
      );
      setFilterProducts(filtered);
    }
    if (target === "z-a") {
      const filtered = temp.sort((a, b) =>
        b.attributes.title.localeCompare(a.attributes.title)
      );
      setFilterProducts(filtered);
    }
    if (target === "lowhigh") {
      const filtered = temp.sort(
        (a, b) => a.attributes.price - b.attributes.price
      );
      setFilterProducts(filtered);
    }
    if (target === "highlow") {
      const filtered = temp.sort(
        (a, b) => b.attributes.price - a.attributes.price
      );
      setFilterProducts(filtered);
    }
  };

  const clearFilter = () =>{
    setFilterProducts(products)
  }

  return (
    <div className="md:flex py-16 md:px-16 px-8">
      <div className="h-[32rem] bg-[#f0f6ff] rounded-lg">
        <div className="p-4">
          <h3 className="mb-2 font-semibold">Search Products</h3>
          <input
            type="text"
            placeholder="Search Products...."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="p-2 border md:w-[12rem] w-full"
          />
        </div><hr  className="w-[12.3rem] mx-auto"/>
        <div className="p-4">
          <h3 className="mb-2 font-semibold">Search Category</h3>
          <select
            name=""
            id=""
            className="border w-full p-2"
            onChange={filterCategory}
          >
            <option value="all">All</option>
            <option value="table">Table</option>
            <option value="chairs">Chair</option>
            <option value="kids">Kids</option>
            <option value="sofa">Sofas</option>
            <option value="bed">Beds</option>
          </select>
        </div><hr  className="w-[12.3rem] mx-auto"/>
        <div className="p-4">
          <h3 className="mb-2 font-semibold">Select Company</h3>
          <select
            name=""
            id=""
            className="border w-full p-2"
            onChange={filterCompany}
          >
            <option value="all">All</option>
            <option value="modenza">Modenza</option>
            <option value="luxora">Luxora</option>
            <option value="artifex">Artifex</option>
            <option value="comfora">Comfora</option>
            <option value="homestead">Homestead</option>
          </select>
        </div><hr  className="w-[12.3rem] mx-auto"/>
        <div className="p-4">
          <h3 className="mb-2 font-semibold">Sorted by</h3>
          <select
            name=""
            id=""
            className="border w-full p-2"
            onChange={sortedProduct}
          >
            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
            <option value="lowhigh">low-high</option>
            <option value="highlow">high-low</option>
          </select>
        </div><hr  className="w-[12.3rem] mx-auto"/>
        <p className="text-center bg-blue-500 rounded-lg py-2 text-xl text-white w-[80%] mx-auto cursor-pointer mt-3" onClick={clearFilter}>ClearFilter</p>
      </div>
      <div className="flex flex-wrap gap-y-6 justify-around text-center px-2 md:py-0 py-6">
        {filterProducts.map((product) => {
          return (
            <div
              className="w-[20rem] h-[20rem] rounded-lg shadow-xl hover:shadow-2xl p-4 bg-[whiteSmoke] duration-300"
              key={product.id}
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.attributes.image}
                  alt=""
                  className="w-full rounded-lg h-[70%]"
                />
                <p className="md:text-3xl text-xl py-3 font-semibold">
                  {product.attributes.title}
                </p>
                <p className="text-xl">${product.attributes.price / 100}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
