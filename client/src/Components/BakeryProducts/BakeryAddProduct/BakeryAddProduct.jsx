import React, {useRef} from "react";
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


function BakeryAddProduct({setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, variantGroups, discounts, getProducts}) {
    const [variantGroup, setVariantGroup] = useState({})

    //declaring form controlled input states
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("")
    const [discount, setDiscount] = useState({})
    const [isChecked, setIsChecked] = useState(true);
    const [imageFiles, setImageFiles] = useState([])

    //declaring reference function variable
    const uploadImagesRef = useRef(null)

    //declaring and initializing icon styling variables
    const uploadBtnIconStyle = { color: "black", marginTop: "10px" };
    const deleteBtnIconStyle = {color: "black"}

    //creating loading state
    const [isLoading, setIsLoading] = useState(false);

    //declaring and initializing navigate variable function
    const navigate = useNavigate();

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
            // console.log(response)
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
    function handleAddProduct(e){
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
        axios.post("/products", productData)
        .then((dataBaseProduct) => {
            //if data inputted successfully upload the product images
            //loop through all image files
            imageFiles.forEach(imageFile => {
                //call function to upload each image to cloudinary
                uploadImageToCloudinary(imageFile, dataBaseProduct.data);
            });

            //when all images have been uploaded to cloudinary and their data saved to database
            setIsLoading(false);
            setAlertStatus(true);
            setAlertMessage("Product Added successfully!")
            setAlertDisplay("block");
            hideAlert();
            getProducts()
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

    return (
        <div className="bakeryAddProductContainer">
            <h1 className="bakeryAddProductPageTitle">ADD PRODUCT</h1>
            <form className="bakeryAddProductForm" onSubmit={handleAddProduct}>
                <div className="bakeryAddProductFormBody">
                    <div className="bakeryDetailsContainer">
                        <p className="bakeryAddProductFormTitle">DETAILS</p>

                        <div className="bakeryAddProductFormNameContainer">
                            <p className="bakeryAddProductFormNameText">Name (required)</p>
                            <input className="bakeryAddProductFormInput" type="text" required value={name} onChange={e => setName(e.target.value)}/>
                        </div>

                        <div className="bakeryAddProductFormDescriptionContainer">
                            <p className="bakeryAddProductFormDescriptionTitle">Description</p>
                            <textarea className="bakeryAddProductFormDescriptionTextArea" rows="8" cols="75" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>

                    </div>

                    <div className="bakeryAddProductFormPriceContainer">
                        <p className="bakeryAddProductFormTitle">PRICE</p>

                        <div className="bakeryAddProductFormPriceInputContainer">
                            <p className="bakeryAddProductFormNameText">Price (required)</p>
                            <input className="bakeryAddProductFormPriceInput" type="text" required value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                    </div>

                    <div className="bakeryAddProductFormImagesAndButtonContainer">
                        <p className="bakeryAddProductFormTitle">IMAGES GALLERY</p>

                        <div className="bakeryAddProductFormImagesContainer">
                            {
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

                        <div className="bakeryAddProductFormImagesSelectBtnContainer">
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
                                className="BakeryAddProductsUploadImagebtn"
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

                    <div className="bakeryAddProductFormVariantGroupContainer">
                        <p className="bakeryAddProductFormTitle">VARIANT GROUP</p>

                        <div className="bakeryAddProductFormVariantGroupDropdownContainer">
                            <button className="bakeryAddProductFormVariantGroupDropdownBtn" onClick={e => e.preventDefault()}>{variantGroup?.name ? variantGroup?.name : "Select variant group"}</button>
                            <div className="bakeryAddProductFormVariantGroupDropdownItemContainer">
                                {variantGroups?.map(variantGroup =>
                                    <p
                                        className="bakeryAddProductFormVariantGroupDropdownItem"
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

                    <div className="bakeryAddProductFormDiscountContainer">
                        <p className="bakeryAddProductFormTitle">DISCOUNT</p>

                        <div className="bakeryAddProductFormDiscountDropdownContainer">
                            <button className="bakeryAddProductFormDiscountDropdownBtn"  onClick={e => e.preventDefault()}>{discount?.name ? discount?.name : "Select discount"}</button>
                            <div className="bakeryAddProductFormDiscountDropdownItemContainer">
                                {discounts?.map(discount =>
                                    <p
                                        className="bakeryAddProductFormDiscountDropdownItem"
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

                <div className="bakeryAddProductFormButtonsContainer">
                    <button className="bakeryAddProductFormSaveButton" type="submit">{isLoading ? <div class="loader"></div> : "Save"}</button>
                    <CheckBox label={"ACTIVE"} isChecked={isChecked} setIsChecked={setIsChecked} />
                </div>

            </form>

        </div>

    )

}
export default BakeryAddProduct;