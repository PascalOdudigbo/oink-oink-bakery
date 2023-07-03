import React, { useEffect, useState } from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi"
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { FaInstagram } from "react-icons/fa";


function ViewProductDetails({ targetProduct, viewProductDetailsPageView, setviewProductDetailsPageView, imageUrl, setImageUrl, selectedOption, setSelectedOption, handleAddToCart, cakeColor, setCakeColor, cakeText, setCakeText, isLoading }) {
    //declaring icon styling variables
    const arrowIconsStyles = { color: "black" };
    const closePageIconStyle = { color: "red" };
    const instagramIconStyle = { marginRight: "10px", color: "#E1306C" };

    //creating the bakery social media links object
    const socialsLinks = {
        instagram: "https://www.instagram.com/oink.oink_bakery/"
    }

    //creating loading state

    //creating a function to get image index
    function getImageIndex() {
        //creating a variable to hold the index of the current image being displayed
        let imageIndex = 0
        //looping through all product images to find the index of the image being displayed
        targetProduct?.product_images?.forEach(productImage => {
            //if the product image is that being displayed currently
            if (productImage?.image_url === imageUrl) {
                //assign its index to the imageIndex variable
                imageIndex = targetProduct?.product_images?.indexOf(productImage);
            }
        })

        return imageIndex;
    }
    //creating functions to handle viewing previous and nextimage
    function handleImageNavigationLeft() {
        //creating a variable to hold the index of the current image being displayed
        let imageIndex = getImageIndex();

        //if the current image is not the first image
        if (imageIndex !== 0) {
            setImageUrl(targetProduct?.product_images[imageIndex - 1]?.image_url);
            // console.log("right called, new link: ", targetProduct?.product_images[imageIndex - 1]?.image_url);
        }

    }

    function handleImageNavigationRight() {
        //creating a variable to hold the index of the current Image being displayed
        let imageIndex = getImageIndex();

        //if the current image is not the last image
        if (imageIndex !== targetProduct?.product_images?.length - 1) {
            setImageUrl(targetProduct?.product_images[imageIndex + 1]?.image_url)
        }
    }

    //creating a function to handle price display if product has discount or a variant option is selected
    function handlePriceDisplay() {
        let price = 0
        if (targetProduct?.discount?.name !== "No discount") {
            if (selectedOption?.price) {
                price = selectedOption?.price - ((targetProduct?.discount?.discount_percent / 100) * selectedOption?.price)
            }
            else {
                price = targetProduct?.price - ((targetProduct?.discount?.discount_percent / 100) * targetProduct?.price)
            }
        }
        else {
            if (selectedOption?.price) {
                price = selectedOption?.price
            }
            else {
                price = targetProduct?.price
            }
        }
        return price
    }

    useEffect(() => {
        setSelectedOption({})
        setCakeText("")
        setCakeColor("")
    }, [targetProduct])

    return (
        targetProduct?.product_images ?
            <div className="viewProductDetailsContainer" style={{ display: viewProductDetailsPageView }}>
                <Tooltip title={<p className="tooltipText">close</p>} arrow>
                    <button className="btn-closePage" onClick={() => setviewProductDetailsPageView("none")}>
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

                    <img className="viewProductDetailsImages" src={imageUrl} alt={targetProduct?.name} title={targetProduct?.name} />

                    <button className="btn-showNextImage" name="right-button" onClick={handleImageNavigationRight}>
                        <IconContext.Provider value={{ size: '30px' }}>
                            <HiArrowCircleRight style={arrowIconsStyles} />
                        </IconContext.Provider>
                    </button>

                </div>
                <p className="currentImageIndex"> {getImageIndex() + 1}/{targetProduct?.product_images?.length}</p>

                <div className="viewProductDetailsTextContainer">
                    <div className="viewProductDetailsTextProductNameAndPriceContainer">
                        <h4 className='viewProductDetailsProductName'>{targetProduct?.name}</h4>
                        <div className="viewProductDetailsProductPriceContainer">
                            <h4 className='viewProductDetailsProductPrice'>{`Ksh ${handlePriceDisplay() !== 0 ? handlePriceDisplay() : "Varies"}`}</h4>
                            {
                                targetProduct?.discount?.name !== "No discount" &&
                                <Tooltip title={<p className="tooltipText">{targetProduct?.discount?.name}</p>} arrow>
                                    <div className="viewProductDetailsProductOriginalPriceAndDiscountPercentContainer">
                                        <h4 className='viewProductDetailsProductOriginalPrice'>{`Ksh ${selectedOption?.price ? selectedOption?.price : targetProduct?.price}`}</h4>
                                        <h4 className='viewProductDetailsProductDiscountPercent'>{`-${targetProduct?.discount?.discount_percent}%`}</h4>
                                    </div>

                                </Tooltip>
                            }
                        </div>
                    </div>

                    {
                        //if the producuct isn't a theme cake allow in app specifications
                        targetProduct?.name?.toLowerCase()?.includes("theme") !== true &&
                        <div className="viewProductDetailsColorAndCakeTextContainer">
                            <div className="viewProductDetailsColorContainer">
                                <p className="viewProductDetailsColorText">Cake colour</p>
                                <input className="viewProductDetailsColorInput" type="text" required value={cakeColor} onChange={e => setCakeColor(e.target.value)} />
                            </div>

                            <div className="viewProductDetailsCakeTextContainer">
                                <p className="viewProductDetailsCakeTextTitle">Cake text (required)</p>
                                <textarea className="viewProductDetailsCakeTextTextArea" rows="2" cols="75" value={cakeText}
                                    onChange={(e) => {
                                        if (e.target?.value?.length <= 50) {
                                            setCakeText(e.target.value);
                                        }
                                    }} />
                                <p className="viewProductDetailsCakeTextMaxInput">{`${cakeText.length}/50`}</p>

                            </div>

                        </div>
                    }

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

                        {
                            //if the product is not a themed cake then display the button else display social media icon
                            targetProduct?.name?.toLowerCase()?.includes("theme") !== true ?
                                <button className="viewProductDetailsAddToCartButton" onClick={() => {
                                    // console.log(selectedOption)
                                    handleAddToCart(targetProduct, selectedOption, cakeColor === "" ? "Any color" : cakeColor, cakeText === "" ? "No text" : cakeText)
                                }}>{isLoading ? <div className="loader"></div> : "ADD TO CART"}</button>

                            : 
                                <div className="socialsContainer">
                                    <Tooltip title={<p className="tooltipText">Place order on instagram</p>} arrow>
                                        <button className="btn-SocialIcon" onClick={() =>(window.location = `${socialsLinks.instagram}`)}>
                                            <IconContext.Provider value={{ size: '40px' }}>
                                                <FaInstagram style={instagramIconStyle}/>
                                            </IconContext.Provider>
                                        </button>
                                    </Tooltip>


                                </div>

                        }

                    </div>
                    
                    <div className="viewProductDetailsProductDescriptionContainer">
                        <h1 className='viewProductDetailsProductDescriptionTitle'>Description</h1>

                        <pre className='viewProductDetailsProductDescription' dangerouslySetInnerHTML={{ __html: targetProduct?.description }} />
                        
                    </div>
                    
                </div>

            </div> :
            <>

            </>

    );

}

export default ViewProductDetails;