import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Products, NavBar, CustomerLogin, CustomerSignUp, 
  ForgotPassword, BakerLogin, BakeryPortal

} from "./Components";
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
      {/* <NavBar totalItems={cart?.total_items}/> */}
      <Routes>
        <Route path="/" element={
          <>
             <NavBar totalItems={cart?.total_items}/>
            <Products products={products} onAddToCart={handleAddToCart}/>
          </> 
        }/>
        <Route path="/login" element={
          <>
            <NavBar totalItems={cart?.total_items}/>
            <CustomerLogin/>
          </>
          
        }/>
        <Route path="/sign-up" element={
          <>
            <NavBar totalItems={cart?.total_items}/>
            <CustomerSignUp/>
          </>
       
        
        }/>
        <Route path="/forgot-password" element={
          <>
              <NavBar totalItems={cart?.total_items}/>
              <ForgotPassword/>
          </>
       
        }/>
    
        <Route path="/admin-forgot-password" element={
          <>
              <NavBar totalItems={cart?.total_items}/>
              <ForgotPassword/>
          </>
       
        }/>
        <Route path="/admin-login" element={
          <>
            <NavBar totalItems={cart?.total_items}/>
            <BakerLogin/>
          </>
        
        }/>
        <Route path="/bakery-portal/*" element={
          <>
            <NavBar totalItems={cart?.total_items}/>
            <BakeryPortal/>
          </>
        
        }/>
      </Routes>
      
    </div>
  );
}

export default App;
