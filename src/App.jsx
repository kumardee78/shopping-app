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
  const [subtotal, setsubTotal] = useState(0);

  function handleAddToCart(product) {
    const existingProductIndex = cart.find((item) => item.id === product.id);
    if (!existingProductIndex) {
      product.quantity = 1;
      setCart([...cart, product]);
    }
  }

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
        console.log(result);

        console.log(newObj);
        setProducts(newObj);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    }
    fetchData();
  }, []);
  console.log(products);

  useEffect(() => {
    let sum = 0;
    cart.forEach((item) => {
      sum += item.price * item.quantity;
    });
    setsubTotal(sum);
  }, [cart]);

  function addQuantity(index) {
    console.log(index);
    const newCart = [...cart];
    newCart[index].quantity += 1;
    setCart(newCart);
  }

  function removeQuantity(index) {
    let newCart = [...cart];
    if (newCart[index].quantity > 1) newCart[index].quantity -= 1;
    setCart(newCart);
  }

  return (
    <div>
      <BrowserRouter>
        <ecomContext.Provider
          value={{
            products,
            setProducts,
            handleAddToCart,
            cart,
            setCart,
            subtotal,
            addQuantity,
            removeQuantity,
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
