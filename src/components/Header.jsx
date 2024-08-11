import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import HamberMenu from "./HamberMenu";
import { ecomContext } from "../App";

function Header() {
  const { cart } = useContext(ecomContext);
  const [isShown, setIsShown] = useState(false);
  const [qty, setQyt] = useState(0);

  function handleToggleDiv() {
    if (isShown) {
      setIsShown(false);
    } else {
      setIsShown(true);
    }
  }
  useEffect(() => {
    let quantity = 0;
    cart.forEach((item) => {
      quantity += item.quantity;
    });
    setQyt(quantity);
  }, [cart]);

  return (
    <div>
      <div className="text-end py-3 bg-[#021431] text-white">
        <Link to="/signin" className=" hover:text-gray-300 duration-300">
          Login / Guest
        </Link>
        <Link to="/signup" className="md:px-20 px-6 hover:text-gray-300 duration-300">
          Create Account
        </Link>
      </div>
      <div className="flex justify-between items-center gap-4 bg-[#f0f6ff] md:px-20 px-6 py-2">
        <div className="md:flex hidden justify-between items-center grow">
          <h1 className="p-2 bg-[#021431] rounded-lg font-semibold text-xl text-white">
            Shopping App
          </h1>
          <nav className="flex">
            <Link
              to="/"
              className="py-4 px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431]"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="py-4 px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431]"
            >
              Products
            </Link>

            <Link
              to="/checkout"
              className="py-4 px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431]"
            >
              CheckOut
            </Link>
            
          </nav>
        </div>
        <div className="text-2xl bg-[#f0f6ff] border-2 border-[#021431] p-1 md:hidden block relative">
          <GiHamburgerMenu className="" onClick={handleToggleDiv} />
        </div>
        <HamberMenu isShown={isShown} className="md:hidden block" />
        <Link to="/cart" className="text-2xl p-2 rounded-full bg-gray-300 hover:bg-[#201431] hover:text-white duration-300 relative">
          <MdShoppingCart />
          <span className="absolute -top-2 text-white px-1 right-0 border bg-red-500 rounded-full text-sm">
            {qty}
          </span>
        </Link>
      </div>
    </div>
  );
}
export default Header;
