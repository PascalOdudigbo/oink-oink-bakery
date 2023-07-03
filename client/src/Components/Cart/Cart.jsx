import React, {useEffect, useState} from "react";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import {CartItem, EditCartItem} from "../../Components";
import { GiShoppingCart } from "react-icons/gi";
import { IconContext } from "react-icons/lib";


function Cart({cart, increaseOrDecreaseLineItemQuantityAndPrice, removeLineItemFromCart, setAlertDisplay, setAlertMessage, setAlertStatus, hideAlert , customerData, getCarts, handleEmptyCart}){

    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    //creating states for controlled inputs
    const [cakeColor, setCakeColor] = useState("");
    const [cakeText, setCakeText] = useState("");

    //creating state to manage target line item ID
    const [targetLineItem, setTargetLineItem] = useState({})

    //creating state to hold title size
    const [titleSize, setTitleSize] = useState("30px")

    useEffect(() => {
        setTitleSize(getComputedStyle(document?.getElementsByClassName("cartPageTitle")[0])?.fontSize);
    }, [titleSize])

    //component to be displayed when cart has items
    function FilledCart(){
        return(
            <div className="filledCartContainer">

                <div className="cartLineItemEditContainer">
                    <Routes>
                        <Route path={"/edit-line-item"} element={
                            <EditCartItem
                                targetLineItem={targetLineItem}
                                setTargetLineItem={setTargetLineItem}
                                setAlertDisplay={setAlertDisplay}
                                setAlertStatus={setAlertStatus}
                                setAlertMessage={setAlertMessage}
                                customerData={customerData}
                                getCarts={getCarts}
                                hideAlert={hideAlert}
                            />
                        }/>
                    </Routes>
                </div>

                <div className="filledCartCartItemGrid">
                    { 
                        cart?.line_items?.map(lineItem => 
                            <CartItem
                                key={lineItem?.id}
                                lineItem={lineItem}
                                setTargetLineItem={setTargetLineItem}
                                setCakeColor={setCakeColor}
                                setCakeText={setCakeText}
                                increaseOrDecreaseLineItemQuantityAndPrice={increaseOrDecreaseLineItemQuantityAndPrice}
                                removeLineItemFromCart={removeLineItemFromCart}
                            />
                        )
                    }

                </div>

                <div className="filledCartSubtotalEmptyCartAndCheckoutContainer">
                    <h3 className="filledCartSubtotal">{`SUBTOTAL: Ksh ${cart?.total}`}</h3>

                    <div className="filledCartEmptyCartAndCheckoutContainer">
                        <button className="filledCartEmptyCartButton" onClick={() => {handleEmptyCart()}}>EMPTY CART</button>
                        <button className="filledCartCheckoutButton" onClick={()=> navigate("/customer/checkout/")}>CHECKOUT</button>
                    </div>

                </div>
            
            </div>
        )

    }

    //component to be displayed when cart has no items
    function EmptyCart(){
        return(
            <div className="emptyCartContainer">
                <p className="cartEmptyText">You have no items in your shopping cart, 
                            <Link to="/" className="cartEmptyLink"> start adding some</Link>!
                </p>
            </div>

        )
        
    }


    return (
        <div className="cartContainer" style={{height: `calc(100vh - ${100 * 130/window.innerHeight}vh)`}}>
            <div className="cartPageTitleAndIconContainer">
                    <h1 className="cartPageTitle">YOUR SHOPPING CART</h1>
                    &nbsp;
                    <IconContext.Provider value={{
                        //make the icon size the size of the elements
                        size: `calc(${titleSize} - 6px)`
                    }}>
                        <GiShoppingCart />
                    </IconContext.Provider>

            </div>

            {/* if the cart is not empty display filled cart else display empty cart */}
            {(cart?.line_items?.length > 0 ? false : true) ? <EmptyCart/> : <FilledCart/>}

        </div>
    );
}

export default Cart;