import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconContext } from "react-icons/lib";
import { MdAddShoppingCart } from "react-icons/md";


function Product({ product }) {
  // const ButtonsIconStyle = { color: "black" };

  return (
    <div className='product'>
      <img className="productMedia" src={product.image} alt={product.name} title={product.name} />
      <div className='productContent'>
        <h4 className='productName'>{product.name}</h4>
        <h4 className='productprice'>{product.price}</h4>
        <p className='productDescription'>{product.description}</p>
      </div>
      <div className='productButtonsAndIconsContainer'>
        <Tooltip title="Add to cart" arrow>
          <btn className="btn-addToCart">
            <IconContext.Provider value={{ className: 'react-icons-addToCart' }}>
              <MdAddShoppingCart />
            </IconContext.Provider>
          </btn>
        </Tooltip>
      </div>
    </div>
  )
}
export default Product;