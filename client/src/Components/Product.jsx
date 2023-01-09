import React from 'react'
import Tooltip from "@mui/material/Tooltip";

function Product({product}) {
  return (
    <div className='product'>
        <img className="productMedia" src={product.image} alt={product.name} title={product.name}/>
        <div className='productContent'>
            <h5 className='productName'>{product.name}</h5>
            <h5 className='productprice'>{product.price}</h5>
            <p className='productDescription'>{product.description}</p>
        </div>
    </div>
  )
}
export default Product;