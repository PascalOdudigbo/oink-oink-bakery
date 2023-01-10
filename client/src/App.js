import React, { useEffect, useState } from "react";
import {Products, NavBar} from "./Components";
import {commerce} from "./lib/commerce";


function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const {data} = await commerce.products.list();
    setProducts(data);
  }
  
  useEffect(()=>{
    fetchProducts()
  }, []);

  console.log(products);

  return (
    <div>
      <NavBar/>
      <Products products={products}/>
    </div>
  );
}

export default App;
