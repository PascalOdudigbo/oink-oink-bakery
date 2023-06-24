import React, {useState} from 'react'
import {Product, Search, ViewProductDetails} from '../../Components';

function Products({products, handleAddToCart, handleProductSearch, selectedOption, setSelectedOption, cakeColor, setCakeColor, cakeText, setCakeText, isLoading}) {

  //creating state to manage product details view component display
  const [viewProductDetailsPageView, setviewProductDetailsPageView] = useState("none");
  const [targetProduct, setTargetProduct] = useState({});

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
          handleAddToCart={handleAddToCart}
          cakeColor={cakeColor}
          setCakeColor={setCakeColor}
          cakeText={cakeText}
          setCakeText={setCakeText}
          isLoading={isLoading}
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
          handleAddToCart={handleAddToCart} 
          setTargetProduct={setTargetProduct} 
          setviewProductDetailsPageView={setviewProductDetailsPageView}
          setImageUrl={setImageUrl}
          setSelectedOption={setSelectedOption}
        />
      )}
      </div>
    
    </>
    
  )
}

export default Products;