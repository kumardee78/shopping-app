import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Cart from "./components/Cart";
import { useEffect, useState, createContext } from "react";
import ProductsOutlet from "./components/ProductsOutlet";
import CheckOut from "./components/CheckOut";
import SignUp from "./components/SignUp";
import LoginIn from "./components/LoginIn";

export const ecomContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const [subTotal, setsubTotal] = useState();
  const [tax, setTax] = useState(Number(Math.round(subTotal / 10)));
  const [shipping, setShipping] = useState(5);
  const [total, setTotal] = useState();

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += (item.price * item.quantity) / 100;
    });
    setsubTotal(sum);
    let tax = subTotal / 10;
    setTax(Math.round(tax));
    setTotal(Math.round(subTotal + tax + shipping));
  }, [cart, subTotal, tax]);

  useEffect(() => {
    if (cart?.length > 0) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const storeCartItem = JSON.parse(localStorage.getItem("cart"));
    if (storeCartItem) setCart(storeCartItem);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://strapi-store-server.onrender.com/api/products"
        );
        const result = await response.json();
        const newObj = result.data.map((item) => {
          return { ...item.attributes, id: item.id };
        });
        // console.log(result);

        // console.log(newObj);
        setProducts(newObj);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
  }, []);
  // console.log(products);

  return (
    <div>
      <BrowserRouter>
        <ecomContext.Provider
          value={{
            products,
            setProducts,
            cart,
            setCart,
            subTotal,
            tax,
            shipping,
            total,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsOutlet />}>
              <Route index element={<Products />} />
              <Route path=":id" element={<SingleProduct />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/loggedin" element={<LoginIn />} />
          </Routes>
        </ecomContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
