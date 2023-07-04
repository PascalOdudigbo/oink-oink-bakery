import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {BsFillCartCheckFill} from "react-icons/bs";
import { IconContext } from "react-icons/lib";
import { CheckoutForm } from "../../Components";

function Checkout({ customerData, cart, getCarts, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn}) {

    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    //creating state to hold title size
    const [titleSize, setTitleSize] = useState("30px")

    useEffect(() => {
        setTitleSize(getComputedStyle(document?.getElementsByClassName("checkoutPageTitle")[0])?.fontSize);
        isCustomerLoggedIn();
    }, [titleSize])

    // function handleCheckout() { }
    return (
        <div className="checkoutContainer" style={{height: `calc(100vh - ${100 * 130/window.innerHeight}vh)`}}>
            <div className="checkoutPageTitleContainer">
                <h1 className="checkoutPageTitle">CHECKOUT</h1>
                <IconContext.Provider value={{
                        //make the icon size the size of the elements text - 6px
                        size: `calc(${titleSize} - 9px)`
                    }}>
                    <BsFillCartCheckFill />
                </IconContext.Provider>
            </div>
            <Routes>
                <Route path="/" element={
                    <CheckoutForm
                        customerData={customerData}
                        cart={cart}
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