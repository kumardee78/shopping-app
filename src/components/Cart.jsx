import React, { useContext, useEffect, useState } from "react";
import { ecomContext } from "../App";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Cart() {

  const { cart, setCart, removeQuantity, addQuantity } =
    useContext(ecomContext);

  const [subTotal, setsubTotal] = useState();
  const [tax, setTax] = useState(Number(Math.round(subTotal/10)));
  const [shipping, setShipping] = useState(5);

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += (item.price * item.quantity)/100;
    });
    setsubTotal(sum);
  }, [cart]);

  useEffect(()=>{
    let tax = subTotal/10
    setTax(Math.round(tax))
  },[subTotal])

  function removeFromCart(index) {
    let newCart = cart.filter((item, idx) => {
      if (idx != index) return item;
    });
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  }

  return (
    <div className="py-10 md:px-20 px-6">
      <h2 className="py-4 text-2xl font-semibold">Shopping Cart</h2>
      <hr className="mb-6" />
      <div>
        {cart.length > 0 ? (
          <div className="md:flex justify-between">
            <div className="grow">
              {cart.map((item, index) => {
                return (
                  <div
                    className="sm:flex bg-[whiteSmoke] grow rounded-lg p-4 relative mb-3"
                    key={index}
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-[8rem] h-[8rem]"
                    />
                    <div className="sm:px-8  grow">
                      <h3 className="text-2xl font-semibold text-[#0f20ff]">
                        {item.title}
                      </h3>
                      <p>
                        Amount:
                        <span className="font-semibold">
                          ${item.price / 100}
                        </span>
                      </p>
                      <div className="text-xl flex items-center w-[6rem] justify-between my-2">
                        <span className="border rounded-full p-1">
                          <FaPlus
                            className=""
                            onClick={(e) => {
                              addQuantity(index);
                            }}
                          />
                        </span>
                        <span className="p-2">{item.quantity}</span>
                        <span className="border rounded-full p-1">
                          <FaMinus
                            onClick={(e) => {
                              removeQuantity(index);
                            }}
                          />
                        </span>
                      </div>
                      <div className="text-xl text-end hover:underline text-blue-500">
                        <button
                          type="button"
                          onClick={(e) => {
                            removeFromCart(index);
                          }}
                        >
                          remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="md:w-[35%] md:mx-6 mx-auto">
              <div className="border bg-blue-100 md:my-0 my-6 rounded-lg p-4 ">
                <p className="flex justify-between py-2">
                  <span>SubTotal</span>
                  <span className="font-semibold">${subTotal.toFixed(2)}</span>
                </p>
                <hr className="border-gray-300" />
                <p className="flex justify-between py-2">
                  <span>Shipping:</span>
                  <span className="font-semibold">${shipping}</span>
                </p>
                <hr className="border-gray-300" />
                <p className="flex justify-between py-2">
                  <span>Tax:</span>
                  <span className="font-semibold">${tax}</span>
                </p>
                <hr className="border-gray-300" />
                <p className="flex justify-between py-6">
                  <span className="font-semibold text-xl">Order Total</span>
                  <span className="font-semibold">
                    ${(subTotal + shipping + tax).toFixed(2)}
                  </span>
                </p>
              </div>
              <p className="text-center my-6">
                {auth.currentUser ? (
                  <Link
                    to="/checkout"
                    className="py-2 px-4 bg-blue-300 text-white mx-auto"
                  >
                    checkout
                  </Link>
                ) : (
                  <Link
                    to="/loggedin"
                    className="py-2 px-4 bg-blue-300 text-white mx-auto"
                  >
                    Please LOGIN
                  </Link>
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center md:text-3xl font-semibold  md:h-[20rem] h-[10rem] bg-[#f0f6ff]">
            <h4>Your Cart is Empty</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
