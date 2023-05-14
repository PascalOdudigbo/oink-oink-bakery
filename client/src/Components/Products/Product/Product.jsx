import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconContext } from "react-icons/lib";
import { MdAddShoppingCart } from "react-icons/md";


function Product({ product, onAddToCart, setTargetProduct, setviewProductDetailsPageView, setImageUrl}) {
  const ButtonsIconStyle = { color: "black" };

  return (
    <div className='product' onClick={()=> {
      setTargetProduct(product);
      setviewProductDetailsPageView("block");
      setImageUrl(product?.product_images ? product?.product_images[0]?.image_url : "");
    }}>
      <img className="productMedia" src={product?.product_images[0]?.image_url} alt={product?.name} title={product?.name} />
      <div className='productContent'>
        <div className='productNameAndPrice'>
          <h4 className='productName'>{product?.name}</h4>
          <h4 className='productprice'>{`Ksh ${product?.price}`}</h4>
        </div>
        <p className='productDescription' dangerouslySetInnerHTML={{ __html: product?.description}}/>
          {/* {product.description.slice(3, product.description.length - 4)}</p> */}
      </div>
      <div className='productButtonsAndIconsContainer'>
        <Tooltip title="Add to cart" arrow>
          <button className="btn-addToCart" onClick={()=>{onAddToCart(product?.id, 1)}}>
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