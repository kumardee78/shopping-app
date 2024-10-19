import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useEffect, useState } from "react";
import { MdShoppingCart } from "react-icons/md";
import HamberMenu from "./HamberMenu";
import { ecomContext } from "../App";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Header() {
  const { cart } = useContext(ecomContext);
  const [isShown, setIsShown] = useState(false);
  const [qty, setQyt] = useState(0);
  const navigate = useNavigate();

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

  const logout = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((err) => alert(err.message));
  };

  return (
    <div>
      <div className="text-end py-3 bg-[#021431] text-white">
        {auth.currentUser ? (
          <div data-aos="fade-left">
            <span className="hover:text-gray-300 duration-300">
              Welcome! {auth.currentUser && auth.currentUser.displayName}
            </span>
            <button
              className="md:px-20 px-6 hover:text-gray-300 duration-300"
              onClick={logout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <>
            <Link to="/loggedin" className=" hover:text-gray-300 duration-300">
              Login / Guest
            </Link>
            <Link
              to="/register"
              className="md:px-20 px-6 hover:text-gray-300 duration-300"
            >
              Create Account
            </Link>
          </>
        )}
      </div>
      <div className="flex justify-between items-center gap-4 bg-[#f0f6ff] md:px-12 lg:px-20  px-6 py-2">
        <div className="md:flex hidden justify-between items-center grow">
          <Link
            to="/"
            className="p-2 bg-[#021431] rounded-lg font-semibold text-xl text-white"
          >
            Shopping App
          </Link>
          <nav className="flex text-xl">
            <Link
              to="/"
              className="py-4 md:px-6 lg:px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431]"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="py-4 md:px-6 lg:px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431]"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="py-4 md:px-6 lg:px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431]"
            >
              Cart
            </Link>

            {auth.currentUser && (
              <Link
                to="/checkout"
                className="py-4 md:px-6 lg:px-8 hover:bg-gray-300 rounded-lg duration-300 font-semibold text-[#021431]"
              >
                CheckOut
              </Link>
            )}
          </nav>
        </div>
        <div className="text-2xl bg-[#f0f6ff] border-2 border-[#021431] p-1 md:hidden block relative">
          <GiHamburgerMenu className="" onClick={handleToggleDiv} />
        </div>
        <HamberMenu isShown={isShown} className="md:hidden block" />
        <p
          className="text-2xl p-4 rounded-full hover:bg-gray-300 duration-300 relative"
          onClick={() => navigate("/cart")}
        >
          <MdShoppingCart />
          <span className="absolute top-0 text-white px-1 right-2 border bg-red-500 rounded-full text-sm">
            {qty}
          </span>
        </p>
      </div>
    </div>
  );
}
export default Header;
