import React, { useRef } from "react";
import { useState } from "react";
import { CheckBox } from "../..";
import { IconContext } from "react-icons/lib";
import { BsImageFill } from "react-icons/bs";
import { Tooltip } from "@mui/material";
import {AiFillDelete} from "react-icons/ai";

function BakeryAddProduct() {
    const testVariantGroups = [
        { id: 1, name: "Christmass special" },
        { id: 2, name: "Birthday special" },
        { id: 3, name: "Grand mass" },
        { id: 4, name: "Test variant" },
    ]

    const testdiscounts = [
        { id: 1, name: "Black friday" },
        { id: 2, name: "Valentines day" },
        { id: 3, name: "Terrific tuesday" },
        { id: 4, name: "Black history month" },
    ]
    const [variantGroups, setVariantGroups] = useState(testVariantGroups)
    const [variantGroup, setVariantGroup] = useState({})
    const [discounts, setDiscounts] = useState(testdiscounts)
    const [discount, setDiscount] = useState({})
    const [isChecked, setIsChecked] = useState(true);
    const [imageFiles, setImageFiles] = useState([])
    const uploadImagesRef = useRef(null)
    const uploadBtnIconStyle = { color: "black", marginTop: "10px" };
    const deleteBtnIconStyle = {color: "black"}


    return (
        <div className="bakeryAddProductContainer">
            <h1 className="bakeryAddProductPageTitle">ADD PRODUCT</h1>
            <form className="bakeryAddProductForm">
                <div className="bakeryAddProductFormBody">
                    <div className="bakeryDetailsContainer">
                        <p className="bakeryAddProductFormTitle">DETAILS</p>

                        <div className="bakeryAddProductFormNameContainer">
                            <p className="bakeryAddProductFormNameText">Name (required)</p>
                            <input className="bakeryAddProductFormInput" type="text" required />
                        </div>

                        <div className="bakeryAddProductFormDescriptionContainer">
                            <p className="bakeryAddProductFormDescriptionTitle">Description</p>
                            <textarea className="bakeryAddProductFormDescriptionTextArea" rows="8" cols="75" />
                        </div>

                    </div>

                    <div className="bakeryAddProductFormPriceContainer">
                        <p className="bakeryAddProductFormTitle">PRICE</p>

                        <div className="bakeryAddProductFormPriceInputContainer">
                            <p className="bakeryAddProductFormNameText">Price (required)</p>
                            <input className="bakeryAddProductFormPriceInput" type="text" required />
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
                                                imageFiles.splice(index, 1)
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
                            <button className="bakeryAddProductFormVariantGroupDropdownBtn">{variantGroup?.name ? variantGroup?.name : "Select variant group"}</button>
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
                            <button className="bakeryAddProductFormDiscountDropdownBtn">{discount?.name ? discount?.name : "Select discount"}</button>
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
                    <button className="bakeryAddProductFormSaveButton" type="submit">Save changes</button>
                    <CheckBox label={"ACTIVE"} isChecked={isChecked} setIsChecked={setIsChecked} />
                </div>

            </form>

        </div>

    )

}
export default BakeryAddProduct;