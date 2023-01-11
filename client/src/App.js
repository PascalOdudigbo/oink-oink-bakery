import React, { useEffect, useState } from "react";
import {Products, NavBar} from "./Components";
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
      <Products products={products} onAddToCart={handleAddToCart}/>
    </div>
  );
}

export default App;
