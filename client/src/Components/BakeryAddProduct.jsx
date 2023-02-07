import React from "react";

function BakeryAddProduct() {
    return (
        <div className="bakeryAddProductContainer">
            <form className="bakeryAddProductForm">
                <div className="bakeryDetailsContainer">
                    <p className="bakeryAddProductFormTitle">DETAILS</p>

                    <input className="bakeryAddProductFormInput" type="text" required placeholder="Name (required)" />

                    <div className="bakeryAddProductFormDescriptionContainer">
                        <p className="bakeryAddProductFormDescriptionTitle">Description</p>
                        <textarea className="bakeryAddProductFormDescriptionTextArea" rows = "25" cols = "60" />
                    </div>

                    <div className="bakeryAddProductFormPriceContainer">
                        <p className="bakeryAddProductFormPriceTitle">Price</p>
                        <input  className="bakeryAddProductFormPriceInput" type="text" placeholder="Price (required)" required/>
                    </div>



                </div>
            </form>

        </div>

    )

}
export default BakeryAddProduct;