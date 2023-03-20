import React from "react";
import { useState } from "react";

function BakeryAddProduct() {
    const [variantGroups, setVariantGroups] = useState([])
    const [variantGroup, setVariantGroup] = useState({})
    const [discounts, setDiscounts] = useState([])
    const [discount, setDiscount] = useState({})
    const [isChecked, setIsChecked] = useState(false);


    return (
        <div className="bakeryAddProductContainer">
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
                            <textarea className="bakeryAddProductFormDescriptionTextArea" rows="25" cols="60" />
                        </div>

                    </div>

                    <div className="bakeryAddProductFormPriceContainer">
                        <p className="bakeryAddProductFormTitle">PRICE</p>

                        <div className="bakeryAddProductFormPriceInputContainer">
                            <p className="bakeryAddProductFormNameText">Price (required)</p>
                            <input className="bakeryAddProductFormPriceInput" type="text" required />
                        </div>
                    </div>

                    <div className="bakeryAddProductFormVariantGroupContainer">
                        <p className="bakeryAddProductFormTitle">VARIANT GROUP</p>

                        <div className="bakeryAddProductFormVariantGroupDropdownContainer">
                            <ul className="bakeryAddProductFormVariantGroupDropdown">{variantGroup?.name ? variantGroup?.name : "Select..."}
                                {variantGroups?.map(variantGroup =>
                                    <li
                                        className="bakeryAddProductFormVariantGroupDropdownItem"
                                        key={variantGroup?.id}
                                    //add On Click
                                    >
                                        {variantGroup?.name}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>

                    <div className="bakeryAddProductFormDiscountContainer">
                        <p className="bakeryAddProductFormTitle">DISCOUNT</p>

                        <div className="bakeryAddProductFormDiscountDropdownContainer">
                            <ul className="bakeryAddProductFormDiscountDropdown">{discount?.name ? discount?.name : "Select..."}
                                {discounts?.map(discount =>
                                    <li
                                        className="bakeryAddProductFormDiscountDropdownItem"
                                        key={discount?.id}
                                    //add On Click
                                    >
                                        {discount?.name}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bakeryAddProductFormButtons">
                    <button type="submit">Save changes</button>
                </div>

            </form>

        </div>

    )

}
export default BakeryAddProduct;