import React, {useRef } from "react";
import { useState } from "react";
import { CheckBox } from "../..";
import { IconContext } from "react-icons/lib";
import { BsImageFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import {AiFillDelete} from "react-icons/ai";
import axios from "axios";
import cloudinary from "cloudinary/lib/cloudinary";
import { useNavigate } from "react-router-dom";
 
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
});

function BakeryEditProduct({targetProduct, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, variantGroups, discounts, getProducts}){
    //declaring states for dynamic data
    const [variantGroup, setVariantGroup] = useState(targetProduct?.variant_group)
    
    //declaring form controlled input states
    const [name, setName] = useState(targetProduct?.name);
    const [description, setDescription] = useState(targetProduct?.description);
    const [price, setPrice] = useState(targetProduct?.price)
    const [discount, setDiscount] = useState(targetProduct?.discount)
    const [isChecked, setIsChecked] = useState(targetProduct?.active);
    const [productImages, setProductImages] = useState(targetProduct?.product_images);
    const [imageFiles, setImageFiles] = useState([]);

    //declaring reference function variable
    const uploadImagesRef = useRef(null)

    //declaring and initializing icon styling variables
    const uploadBtnIconStyle = { color: "black", marginTop: "10px" };
    const deleteBtnIconStyle = {color: "black"}

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);

    //declaring and initializing navigate variable function
    const navigate = useNavigate();
    !targetProduct?.name && navigate("/bakery-portal/products");



    //creating function to handle deleting product image from cloudinary
    const deleteCloudinaryProductImage = async (productImage, index) => {
        console.log(productImage)
          cloudinary.v2.uploader.destroy(productImage.image_public_id, function(error,result) {
            window.scrollTo(0, 0);
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage(`${result} ${error}`);
            hideAlert();
        })
        .then(response => {
            //if deleting image from server is a success
            deleteImageFromDatabase(productImage, index)

        })
        .catch(error => {
            //if deleting image from server fails
            window.scrollTo(0, 0);
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage("Something went wrong, please try again later.");
            hideAlert();
        });
    }

    //creating a function to delete image from database
    function deleteImageFromDatabase(productImage, index){
        axios.delete(`/product_images/${productImage?.id}`)
        .then(() => {
            //if deleting image from database is a success
            window.scrollTo(0, 0);
            setAlertStatus(true);
            setAlertDisplay("block");
            setAlertMessage(`Image deleted successfully!`);
            hideAlert();
            let newData = productImages.filter((image)=>image !== productImages[index])
            setProductImages(newData)
        })
        .catch(error => {
            if(error?.response){
                //if deleting image from database fails
                window.scrollTo(0, 0);
                setAlertStatus(true);
                setAlertDisplay("block");
                setAlertMessage(error.response.data.error);
                hideAlert();
            }

        })
        
    }

     //defining a function to upload an image to the cloudinary server
     const uploadImageToCloudinary = async(imageFile, dataBaseProduct) =>{

        //setting up cloudinary upload data
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET_NAME);
        data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
        data.append("folder", "Oink_Oink_Product_Images");

        //creating a try-catch block to rescue from upload errors
        try {
            //sending the upload data to the cloudinary server
            const uploadedImage = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, data);
                
            //setting up product_images database table data 
            const productImageData = {
                product_id: dataBaseProduct.id,
                image_url: `${uploadedImage.data.url}`,
                image_public_id: `${uploadedImage.data.public_id}`,
            };
            //calling function for saving uploaded image cloudinary link and data to the database
            saveProductImage(productImageData);
        
        }
        catch (error) {
            // if image upload fails this happens
            setIsLoading(false)
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage(`${error}`);
            hideAlert();
        }
    }

    //defining a function to save product image in the database
    function saveProductImage(productImageData){
        axios.post("/product_images", productImageData)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            if(error.response){
                setIsLoading(false)
                setAlertStatus(false);
                setAlertMessage(error.response.data.error)
                setAlertDisplay("block");
                hideAlert();
            }
        })
    }

    //defining a function to add product to the database
    function handleUpdateProduct(e){
        e.preventDefault();
        window.scrollTo(0,0);
        setIsLoading(true);

        //setting product data to be sent to the products table in the db
        const productData = {
            name: name,
            price: parseFloat(price),
            description: description,
            discount_id: discount?.id,
            variant_group_id: variantGroup?.id,
            active: isChecked
        };

        //sending product data to backend
        axios.put(`/products/${targetProduct?.id}`, productData)
        .then((dataBaseProduct) => {
            //if data inputted successfully upload the product images
            //if new image files are present loop through all image files
            imageFiles?.length > 0 && imageFiles.forEach(imageFile => {
                //call function to upload each image to cloudinary
                uploadImageToCloudinary(imageFile, dataBaseProduct.data);
            });

            //when all images have been uploaded to cloudinary and their data saved to database
            getProducts();
            setIsLoading(false);
            setAlertStatus(true);
            setAlertMessage("Product updated successfully!")
            setAlertDisplay("block");
            hideAlert();
            setTimeout(() => navigate("/bakery-portal/products"), 2000)
        })
        .catch((error) => {
            setIsLoading(false)
            if (error.response){
                setAlertStatus(false);
                error.response.data.error ? setAlertMessage(error.response.data.error) :
                setAlertMessage("Adding product unsuccessful, please try again!");
                setAlertDisplay("block");
                hideAlert();
            }
        })

    }

    return(
        <div className="bakeryEditProductContainer">
        <h1 className="bakeryEditProductPageTitle">EDIT PRODUCT</h1>

        <form className="bakeryEditProductForm" onSubmit={handleUpdateProduct}>

            <div className="bakeryEditProductFormBody">

                <div className="bakeryDetailsContainer">
                    <p className="bakeryEditProductFormTitle">DETAILS</p>

                    <div className="bakeryEditProductFormNameContainer">
                        <p className="bakeryEditProductFormNameText">Name (required)</p>
                        <input className="bakeryEditProductFormInput" type="text" required value={name} onChange={e => setName(e.target.value)}/>
                    </div>

                    <div className="bakeryEditProductFormDescriptionContainer">
                        <p className="bakeryEditProductFormDescriptionTitle">Description</p>
                        <textarea className="bakeryEditProductFormDescriptionTextArea" rows="8" cols="75" value={description} onChange={e => setDescription(e.target.value)}/>
                    </div>
                </div>

                <div className="bakeryEditProductFormPriceContainer">
                    <p className="bakeryEditProductFormTitle">PRICE</p>

                    <div className="bakeryEditProductFormPriceInputContainer">
                        <p className="bakeryEditProductFormNameText">Price (required)</p>
                        <input className="bakeryEditProductFormPriceInput" type="text" required value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                </div>

                <div className="bakeryEditProductFormImagesAndButtonContainer">
                    <p className="bakeryEditProductFormTitle">IMAGES GALLERY</p>

                    <div className="bakeryEditProductFormImagesContainer">
                        {
                            //for images on cloudinary and in the database
                            productImages?.length > 0 &&
                            productImages?.map(productImage => {
                                let index = productImages.indexOf(productImage)
        
                                return <div 
                                            className="imageAndDeleteBtnContainer"
                                            key={index}
                                >
                                    <Tooltip title="delete" arrow>
                                        <button className="deleteImgBtn" onClick={(e) => { 
                                            e.preventDefault();
                                            deleteCloudinaryProductImage(productImage, index);
                                            
                                        }}>
                                            <IconContext.Provider value={{ size: '15px' }}>
                                                <AiFillDelete  style={deleteBtnIconStyle}/>
                                            </IconContext.Provider>
                                        </button>
                                    </Tooltip>

                                    <img className="productImage" src={productImage?.image_url} alt={productImage?.name} title={productImage?.name} />
                                </div>
                            })
                        }

                        {
                            
                            //for images not on cloudinary and in the database
                            imageFiles?.length > 0 &&
                            imageFiles?.map(imagefile => {
                                const imgUrl = URL.createObjectURL(imagefile)
                                let index = imageFiles.indexOf(imagefile)
                                // console.log(index)
                                return <div 
                                            className="imageAndDeleteBtnContainer"
                                            key={index}
                                >
                                    <Tooltip title="delete" arrow>
                                        <button className="deleteImgBtn" onClick={(e) => { 
                                            e.preventDefault()
                                            let newData = imageFiles.filter((image)=>image !== imageFiles[index])
                                            setImageFiles(newData)
                                            
                                        }}>
                                            <IconContext.Provider value={{ size: '15px' }}>
                                                <AiFillDelete  style={deleteBtnIconStyle}/>
                                            </IconContext.Provider>
                                        </button>
                                    </Tooltip>

                                    <img className="productImage" src={imgUrl} alt={imagefile?.name} title={imagefile?.name} />
                                </div>
                            })

                        }

                    </div>

                    <div className="bakeryEditProductFormImagesSelectBtnContainer">
                        <input
                            style={{ display: "none" }}
                            type="file"
                            ref={uploadImagesRef}
                            // onChange={(e) => setProfilePicture(e.target.files[0])}
                            onChange={(e) => setImageFiles(Array.from(e.target.files))}
                            multiple
                            accept="image/*"
                        />

                        <button
                            className="bakeryEditProductsUploadImagebtn"
                            onClick={(e) => {
                                e.preventDefault();
                                uploadImagesRef.current.click()
                            }}

                        >
                            <div className="iconAndTextContainer">
                                <IconContext.Provider value={{ size: "20px" }}>
                                    <BsImageFill style={uploadBtnIconStyle} />
                                </IconContext.Provider>

                                <p className="btnText">Upload image(s)</p>

                            </div>
                        </button>

                        <p className="imageTypeText">PNG & JPG ACCEPTED</p>


                    </div>



                </div>

                <div className="bakeryEditProductFormVariantGroupContainer">
                    <p className="bakeryEditProductFormTitle">VARIANT GROUP</p>

                    <div className="bakeryEditProductFormVariantGroupDropdownContainer">
                        <button className="bakeryEditProductFormVariantGroupDropdownBtn" onClick={e => e.preventDefault()}>{variantGroup?.name ? variantGroup?.name : "Select variant group"}</button>
                        <div className="bakeryEditProductFormVariantGroupDropdownItemContainer">
                            {variantGroups?.map(variantGroup =>
                                <p
                                    className="bakeryEditProductFormVariantGroupDropdownItem"
                                    key={variantGroup?.id}
                                    onClick={() => {
                                        setVariantGroup(variantGroup)
                                    }}
                                >
                                    {variantGroup?.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bakeryEditProductFormDiscountContainer">
                    <p className="bakeryEditProductFormTitle">DISCOUNT</p>

                    <div className="bakeryEditProductFormDiscountDropdownContainer">
                        <button className="bakeryEditProductFormDiscountDropdownBtn"  onClick={e => e.preventDefault()}>{discount?.name ? discount?.name : "Select discount"}</button>
                        <div className="bakeryEditProductFormDiscountDropdownItemContainer">
                            {discounts?.map(discount =>
                                <p
                                    className="bakeryEditProductFormDiscountDropdownItem"
                                    key={discount?.id}
                                    onClick={() => {
                                        setDiscount(discount)
                                    }}
                                >
                                    {discount?.name}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bakeryEditProductFormButtonsContainer">
                <button className="bakeryEditProductFormSaveButton" type="submit">{isLoading ? "Loading" : "Save Changes"}</button>
                <CheckBox label={"ACTIVE"} isChecked={isChecked} setIsChecked={setIsChecked} />
            </div>

        </form>

    </div>
       
    );

}
export default BakeryEditProduct;