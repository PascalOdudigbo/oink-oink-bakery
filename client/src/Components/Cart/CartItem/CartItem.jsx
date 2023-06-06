import React from "react";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";


function CartItem({lineItem, setTargetLineItem, setCakeColor, setCakeText, increaseOrDecreaseLineItemQuantityAndPrice, removeLineItemFromCart}){
    //creating navigation variable function
    const navigate = useNavigate();

    return(
        <div className="cartItemContainer">
            <img className="cartItemImage" src={lineItem?.product?.product_images[0]?.image_url} alt={lineItem?.product?.name} title={lineItem?.product?.name}/>
            
            <div className="cartItemNameAndPriceContainer">
                <h1 className="cartItemName">{lineItem?.product?.name}</h1>
                <h3 className="cartItemPrice">{`Ksh ${lineItem?.price}`}</h3>
            </div>

            <div className="cartItemCakeSizeContainer">
                <h4 className="cartItemTextTitle">Size:</h4>
                <p className="cartItemCakeSize">{lineItem?.variant_option?.name}</p>
            </div>

            <div className="cartItemColorCakeTextAndEditButtonContainer">
                <div className="cartItemColorAndCakeTextContainer">
                    <div className="cartItemCakeColorContainer">
                        <h4 className="cartItemTextTitle">Cake color:</h4>
                        <p className="cartItemColor">{lineItem?.color}</p>
                    </div>

                    <div className="cartItemCakeTextContainer">
                        <h4 className="cartItemTextTitle">Cake text:</h4>
                        <p className="cartItemCakeText">{lineItem?.cake_text}</p>
                    </div>
                </div>

                <IconContext.Provider value={{size: "13px"}}>
                    <Tooltip title="Edit" arrow>
                        <button className="cartItemEditButton" onClick={()=> {
                            setCakeColor(lineItem?.color);
                            setCakeText(lineItem?.cake_text);
                            setTargetLineItem(lineItem);
                            navigate("/cart/edit-line-item");
                        }}>
                            <AiFillEdit style={{color: "black"}}/>
                        </button>
                    </Tooltip>
                </IconContext.Provider>

            </div>

            <div className="productQuantityIncreaseDeacreaseAndRemoveCartItemContainer">
                <div className="productQuantityIncreaseDeacrease">
                    <button className="productQuantityIncrease" onClick={()=>{ increaseOrDecreaseLineItemQuantityAndPrice(lineItem, lineItem?.quantity - 1)}}>-</button>
                    <p className="productQuantity">{lineItem?.quantity}</p>
                    <button className="productQuantityDeacrease" onClick={()=>{ increaseOrDecreaseLineItemQuantityAndPrice(lineItem, lineItem?.quantity + 1)}}>+</button>
                </div>
                <button className="cartItemRemoveButton" onClick={()=>{ removeLineItemFromCart(lineItem)}}>REMOVE</button>
            </div>

        </div>
    )
}

export default CartItem;