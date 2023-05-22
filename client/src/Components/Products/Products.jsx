import React, {useState} from 'react'
import {Product, Search, ViewProductDetails} from '../../Components';

function Products({products, onAddToCart, handleProductSearch}) {

  //creating state to manage product details view component display
  const [viewProductDetailsPageView, setviewProductDetailsPageView] = useState("none");
  const [targetProduct, setTargetProduct] = useState({});
  const [selectedOption, setSelectedOption] = useState({});

  //creating state to manage ViewProductDetails image display url
  const [imageUrl, setImageUrl] = useState("");

  return (
    <>
      <div className='productsViewProductDetailsContainer'>
        <ViewProductDetails
          targetProduct={targetProduct}
          viewProductDetailsPageView={viewProductDetailsPageView}
          setviewProductDetailsPageView={setviewProductDetailsPageView}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
        />
      </div>
      
      
      <div className='productsSearchContainer'>
        <Search placeholderText={"Search cakes..."} handleSearch={handleProductSearch}/>
      </div>
      <div className='productsContainer'>
      {products?.map(product => 
      //display product only if active
      product?.active &&
        <Product 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart} 
          setTargetProduct={setTargetProduct} 
          setviewProductDetailsPageView={setviewProductDetailsPageView}
          setImageUrl={setImageUrl}
        />
      )}
      </div>
    
    </>
    
  )
}

export default Products;