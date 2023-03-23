import React from "react";
import { useState } from "react";
import { CheckBox } from "../..";

function BakeryAddProduct() {
    const testVariantGroups = [
        {id: 1, name: "Christmass special"},
        {id: 2, name: "Birthday special"},
        {id: 3, name: "Grand mass"},
        {id: 4, name: "Test variant"},
    ]

    const testdiscounts = [
        {id: 1, name: "Black friday"},
        {id: 2, name: "Valentines day"},
        {id: 3, name: "Terrific tuesday"},
        {id: 4, name: "Black history month"},
    ]
    const [variantGroups, setVariantGroups] = useState(testVariantGroups)
    const [variantGroup, setVariantGroup] = useState({})
    const [discounts, setDiscounts] = useState(testdiscounts)
    const [discount, setDiscount] = useState({})
    const [isChecked, setIsChecked] = useState(true);


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

                    <div className="bakeryAddProductFormImagesContainer">

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
                                        onClick={()=> {
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
                                            onClick={()=> {
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