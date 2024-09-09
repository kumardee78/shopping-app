import React, { useContext, useState } from "react";
import { ecomContext } from "../App";
import { useNavigate } from "react-router-dom";

function CheckOut() {
  const { subTotal, setCart, tax, shipping, total } = useContext(ecomContext);
  const [data, setData] = useState({
    username: "",
    email: "",
    address: "",
    mobile: "",
  });

  const navigate = useNavigate();

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    alert("Your order has been placed successfully!");
    setTimeout(() => navigate("/"), 3000);
    setCart([]);
  }

  return (
    <div className="md:flex md:px-20 px-8 py-16">
      <div className="md:w-[60%] md:px-10 py-6 shadow-lg px-4 bg-[#f0f6ff]">
        <h3 className="text-xl md:text-2xl font-semibold mb-6">
          Place Your Order
        </h3>
        <form action="" onSubmit={handleSubmit} className="">
          <input
            type="text"
            name="username"
            value={data.username}
            onChange={handleChange}
            placeholder="Name"
            className="border w-full p-2 mb-4"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Email"
            className="border w-full p-2 mb-4"
            required
          />
          <br />
          <input
            type="text"
            name="address"
            value={data.address}
            onChange={handleChange}
            placeholder="Addres"
            className="border w-full p-2 mb-4"
            required
          />
          <br />
          <input
            type="tel"
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
            placeholder="Mobile No."
            className="border w-full p-2 mb-8"
            required
          />
          <br />
          <button
            type="submit"
            className="w-full bg-blue-500 border text-white py-2 text-xl hover:bg-white hover:text-blue-500 hover:border hover:border-blue-500 duration-300"
          >
            Order
          </button>
        </form>
      </div>
      <div className="md:w-[35%] md:mx-6 mx-auto">
        <div className="border bg-blue-100 my-4 rounded-lg p-4 ">
          <p className="flex justify-between py-2">
            <span>SubTotal</span>
            <span className="font-semibold">${subTotal}</span>
          </p>
          <hr className="border-gray-300" />
          <p className="flex justify-between py-2">
            <span>Shipping</span>
            <span className="font-semibold">${shipping}</span>
          </p>
          <hr className="border-gray-300" />
          <p className="flex justify-between py-2">
            <span>Tax</span>
            <span className="font-semibold">${tax}</span>
          </p>
          <hr className="border-gray-300" />
          <p className="flex justify-between py-6">
            <span className="font-semibold text-xl">Order Total</span>
            <span className="font-semibold">${total}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
