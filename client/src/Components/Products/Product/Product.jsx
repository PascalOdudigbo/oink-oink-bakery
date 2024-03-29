import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { IconContext } from "react-icons/lib";
import { MdAddShoppingCart } from "react-icons/md";


function Product({ product, handleAddToCart, setTargetProduct, setviewProductDetailsPageView, setImageUrl, setSelectedOption }) {
  const ButtonsIconStyle = { color: "black" };

  //creating a function to calcuate product price
  function handleCalculatePrice() {
    let price = 0
    if (product?.discount?.name !== "No discount") {
      price = product?.price - ((product?.discount?.discount_percent / 100) * product?.price)
    }
    else {
      price = product?.price
    }
    return price
  }

  return (
    <div className='product' >
      <img className="productMedia" src={product?.product_images[0]?.image_url} alt={product?.name} title={product?.name} onClick={() => {
        setTargetProduct(product);
        setviewProductDetailsPageView("block");
        setImageUrl(product?.product_images ? product?.product_images[0]?.image_url : "");
      }} />
      <div className='productContent'>
        <div className='productNameAndPrice'>
          <h4 className='productName'>{product?.name}</h4>
         
          <div className="productPriceContainer">
             <h4 className='productprice'>{`Ksh ${handleCalculatePrice() !== 0 ? handleCalculatePrice() : "Varies"}`}</h4>
            {
              product?.discount?.name !== "No discount" &&
              <Tooltip title={<p className="tooltipText">{product?.discount?.name}</p>} arrow>
                <div className="productOriginalPriceAndDiscountPercentContainer">
                  <h4 className='productOriginalPrice'>{`Ksh ${product?.price}`}</h4>
                  <h4 className='productDiscountPercent'>{`-${product?.discount?.discount_percent}%`}</h4>
                </div>

              </Tooltip>
            }
          </div>
        </div>
        <p className='productDescription' dangerouslySetInnerHTML={{ __html: product?.description?.length > 82 ? `${product?.description?.slice(0, 82)}...` : product?.description }}
          onClick={() => {
            setTargetProduct(product);
            setviewProductDetailsPageView("block");
            setImageUrl(product?.product_images ? product?.product_images[0]?.image_url : "");
          }}
        />
        {/* {product.description.slice(3, product.description.length - 4)}</p> */}
      </div>

      {
        //don't display add to cart icon if cake is a theme cake
        product?.name?.toLowerCase().includes("theme") !== true &&
        <div className='productButtonsAndIconsContainer'>
          <Tooltip title={<p className='tooltipText'>Add to cart</p>} arrow>
            <button className="btn-addToCart" onClick={() => {
              setSelectedOption(product?.variant_group?.variant_options[0])
              handleAddToCart(product, product?.variant_group?.variant_options[0])
            }}>
              <IconContext.Provider value={{ size: '24px' }}>
                <MdAddShoppingCart style={ButtonsIconStyle} />
              </IconContext.Provider>
            </button>
          </Tooltip>
        </div>
      }
    </div>
  )
}
export default Product;