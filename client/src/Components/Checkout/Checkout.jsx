import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { CheckoutForm } from "../../Components";

function Checkout({ customerData, cart, getCarts, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn}) {

    //declaring and initializing navigate variable function
    const navigate = useNavigate();


    function handleCheckout() { }
    return (
        <div className="checkoutContainer" style={{height: `calc(100vh - ${100 * 130/window.innerHeight}vh)`}}>
            <div className="checkoutPageTitleContainer">
                <h1 className="checkoutPageTitle">CHECKOUT</h1>
            </div>
            <Routes>
                <Route path="/" element={
                    <CheckoutForm
                        customerData={customerData}
                        cart={cart}
                        handleSubmit={handleCheckout}
                        getCarts={getCarts}
                        setAlertDisplay={setAlertDisplay}
                        setAlertMessage={setAlertMessage}
                        setAlertStatus={setAlertStatus}
                        hideAlert={hideAlert}
                        isCustomerLoggedIn={isCustomerLoggedIn}
                    />
                } />

            </Routes>

        </div>
    )

}
export default Checkout;