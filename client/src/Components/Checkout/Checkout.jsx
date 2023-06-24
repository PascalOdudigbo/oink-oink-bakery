import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CheckoutForm } from "../../Components";

function Checkout({ customerData, cart, getCarts }) {

    //declaring and initializing navigate variable function
    const navigate = useNavigate();


    function handleCheckout() { }
    return (
        <div className="checkoutContainer">
            <Routes>
                <Route path="/" element={
                    <CheckoutForm
                        customerData={customerData}
                        cart={cart}
                        handleSubmit={handleCheckout}
                    />
                } />

            </Routes>

        </div>
    )

}
export default Checkout;