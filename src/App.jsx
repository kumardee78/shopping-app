import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import { useEffect, useState } from "react";
import { createContext } from "react";
import ProductsOutlet from "./components/ProductsOutlet";
import CheckOut from "./components/CheckOut";

export const ecomContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [subtotal, setsubTotal] = useState(0);

  function handleAddToCart(e, product) {
    product.quantity = 1;
    console.log(product);
    setCart([...cart, product]);
  }

  // console.log(products);
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

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://strapi-store-server.onrender.com/api/products"
      );
      const result = await response.json();
      // console.log(result.data);
      setProducts(result.data);
    }
    if (products.length <= 0) {
      fetchData();
    }
  }, []);

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
            removeQuantity,
            addQuantity,
            subtotal,
          }}
        >
          <Header />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/products" element={<ProductsOutlet />}>
              <Route index element={<Products />} />
              <Route path=":id" element={<SingleProduct />} />
            </Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/checkout" element={<CheckOut />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
          </Routes>
        </ecomContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
