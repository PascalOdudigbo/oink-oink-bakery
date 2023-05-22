import React, { useEffect } from "react";
import {HiArrowCircleLeft, HiArrowCircleRight} from "react-icons/hi"
import {AiFillCloseCircle} from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";

function ViewProductDetails({targetProduct, viewProductDetailsPageView, setviewProductDetailsPageView, imageUrl, setImageUrl, selectedOption, setSelectedOption}){
    //declaring icon styling variables
    const arrowIconsStyles = {color: "black"};
    const closePageIconStyle = {color: "red"};
   
    //creating functions to handle viewing previous and nextimage
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

    //creating a function to handle price display if product has discount or a variant option is selected
    function handlePriceDisplay(){
        let price = 0
        if (targetProduct?.discount?.name !== "No discount"){
            if (selectedOption?.price){
                price = selectedOption?.price - ((targetProduct?.discount?.discount_percent / 100) * selectedOption?.price)
            }
            else{
                price = targetProduct?.price - ((targetProduct?.discount?.discount_percent / 100) * targetProduct?.price)
            }
        }
        else{
            if (selectedOption?.price){
                price = selectedOption?.price
            }
            else{
                price = targetProduct?.price
            }
        }
        return price
    }
    
    useEffect(() => {
        setSelectedOption({})
    }, [targetProduct])

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
                    <div className="viewProductDetailsProductPriceContainer">
                        <h4 className='viewProductDetailsProductPrice'>{`Ksh ${handlePriceDisplay()}`}</h4>
                        {
                            targetProduct?.discount?.name !== "No discount" &&
                            <Tooltip title={targetProduct?.discount?.name} arrow>
                                <div className="viewProductDetailsProductOriginalPriceAndDiscountPercentContainer">
                                    <h4 className='viewProductDetailsProductOriginalPrice'>{`Ksh ${selectedOption?.price ? selectedOption?.price : targetProduct?.price}`}</h4>
                                    <h4 className='viewProductDetailsProductDiscountPercent'>{`-${targetProduct?.discount?.discount_percent}%`}</h4>
                                </div>

                            </Tooltip>
                        }
                    </div>
                </div>

                <div className="viewProductDetailsVariantOptionsAndAddToCartContainer">
                    {
                        //if the product has variant options then display them
                        targetProduct?.variant_group?.variant_options?.length > 0 &&
                        <div className="viewProductDetailsVariantOptionsDropdownContainer">

                            <button className="viewProductDetailsVariantOptionsDropdownBtn">{
                                selectedOption?.name ? selectedOption?.name : "Variations"
                            }</button>
           
                            <div className='viewProductDetailsVariantOptionsDropdownItemsContainer'>
            
                                {
                                    targetProduct?.variant_group?.variant_options?.map(variantOption => 
                                        <button key={variantOption?.id} className="viewProductDetailsVariantOptionsDropdownItem" onClick={() => setSelectedOption(variantOption)}>{variantOption?.name}</button>
                                    )
                                }
                            
                            </div>

                        </div> 
                    }

                    <button className="viewProductDetailsAddToCartButton">ADD TO CART</button>

                </div>
              
                <p className='viewProductDetailsProductDescription' dangerouslySetInnerHTML={{ __html: targetProduct?.description}}/>

            </div>

        </div> : 
        <>

        </>

    );

}

export default ViewProductDetails;