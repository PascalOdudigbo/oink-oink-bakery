import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {Products, NavBar, CustomerLogin, CustomerSignUp} from "./Components";
import {commerce} from "./lib/commerce"; 


function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const item = await commerce.cart.add(productId, quantity);
    setCart(item.cart);
    console.log(cart);
  }
  
  useEffect(()=>{
    fetchProducts();
    fetchCart();
  }, [cart]);

  // console.log(products);

  return (
    <div>
      <NavBar totalItems={cart?.total_items}/>
      <Routes>
        <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart}/>}/>
        <Route path="/login" element={<CustomerLogin/>}/>
        <Route path="/sign-up" element={<CustomerSignUp/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
