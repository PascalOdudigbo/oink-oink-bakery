import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconContext } from "react-icons/lib";
import { MdAddShoppingCart } from "react-icons/md";


function Product({ product }) {
  const ButtonsIconStyle = { color: "black" };

  return (
    <div className='product'>
      <img className="productMedia" src={product.image} alt={product.name} title={product.name} />
      <div className='productContent'>
        <div className='productNameAndPrice'>
          <h4 className='productName'>{product.name}</h4>
          <h4 className='productprice'>{product.price}</h4>
        </div>
        <p className='productDescription'>{product.description}</p>
      </div>
      <div className='productButtonsAndIconsContainer'>
        <Tooltip title="Add to cart" arrow>
          <button className="btn-addToCart">
            <IconContext.Provider value={{ size: '24px' }}>
              <MdAddShoppingCart style={ButtonsIconStyle}/>
            </IconContext.Provider>
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
export default Product;