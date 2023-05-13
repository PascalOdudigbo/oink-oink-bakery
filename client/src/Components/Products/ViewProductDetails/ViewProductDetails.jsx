import React, { useState } from "react";
import {HiArrowCircleLeft, HiArrowCircleRight} from "react-icons/hi"
import {AiFillCloseCircle} from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";

function ViewProductDetails({targetProduct, viewProductDetailsPageView, setviewProductDetailsPageView, imageUrl, setImageUrl}){
    //declaring icon styling variables
    const arrowIconsStyles = {color: "black"};
    const closePageIconStyle = {color: "red"};
   
    //creating functions to handle viewing previous image
    function handleImageNavigationLeft(){
        //creating a variable to hold the index of the current image being displayed
        let imageIndex = 0
        //looping through all product images to find the index of the image being displayed
        targetProduct?.product_images?.forEach(productImage => {
            //if the product image is that being displayed currently
            if (productImage?.image_url === imageUrl){
                //assign its index to the imageIndex variable
                imageIndex = targetProduct?.product_images?.indexOf(productImage)
            } 
        })
        //if the current image is not the first image
        if (imageIndex !== 0){
                setImageUrl(targetProduct?.product_images[imageIndex -1]?.image_url)
                console.log("right called, new link: ", targetProduct?.product_images[imageIndex - 1]?.image_url);
        }
       
    }

    function handleImageNavigationRight(){
        //creating a variable to hold the index of the current Image being displayed
        let imageIndex = 0

        //looping through all product images to find the index of the image being displayed
        targetProduct?.product_images?.forEach(productImage => {
            //if the product image is that being displayed currently
            if (productImage?.image_url === imageUrl){
                //assign its index to the imageIndex variable
                imageIndex = targetProduct?.product_images?.indexOf(productImage)
            } 
        })
        //if the current image is not the last image
        if (imageIndex !== targetProduct?.product_images.length - 1){
            setImageUrl(targetProduct?.product_images[imageIndex + 1]?.image_url)
        } 
    }

    
    return(
        targetProduct?.product_images ? 
        <div className="viewProductDetailsContainer" style={{display: viewProductDetailsPageView}}>
            <Tooltip title="close" arrow>
                <button className="btn-closePage" onClick={()=>setviewProductDetailsPageView("none")}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        <AiFillCloseCircle style={closePageIconStyle} />
                    </IconContext.Provider>
                </button>
            </Tooltip>
            

            <div className="viewProductDetailsImagesViewContainer">

                <button className="btn-showPreviousImage" onClick={handleImageNavigationLeft}>
                    <IconContext.Provider value={{ size: '30px' }}>
                        <HiArrowCircleLeft style={arrowIconsStyles} />
                    </IconContext.Provider>
                </button>
                
                <img className="viewProductDetailsImages" src={imageUrl} alt={targetProduct?.name} title={targetProduct?.name}/>

                <button className="btn-showNextImage" name="right-button" onClick={handleImageNavigationRight}>
                    <IconContext.Provider value={{ size: '30px' }}>
                        <HiArrowCircleRight style={arrowIconsStyles} />
                    </IconContext.Provider>
                </button>

            </div>

            
            <div className="viewProductDetailsTextContainer">
                <div className="viewProductDetailsTextProductNameAndPriceContainer">
                    <h4 className='viewProductDetailsProductName'>{targetProduct?.name}</h4>
                    <h4 className='viewProductDetailsProductPrice'>{`Ksh ${targetProduct?.price}`}</h4>
                </div>
              
                <p className='viewProductDetailsProductDescription' dangerouslySetInnerHTML={{ __html: targetProduct?.description}}/>

            </div>

        </div> : 
        <>

        </>

    );

}

export default ViewProductDetails;