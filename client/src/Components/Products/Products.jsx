import React from 'react'
import {Product, Search} from '../../Components';

function Products({products, onAddToCart}) {
   
  return (
    <>
      <div className='productsSearchContainer'>
        <Search placeholderText={"Search cakes..."}/>
      </div>
      <div className='productsContainer'>
      {products?.map(product=><Product key={product.id} product={product} onAddToCart={onAddToCart}/>)}
      </div>
    
    </>
    
  )
}

export default Products;