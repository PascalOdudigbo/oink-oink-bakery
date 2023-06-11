import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import { AiFillCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function EditCartItem({ targetLineItem, setTargetLineItem, setAlertDisplay, setAlertMessage, setAlertStatus, hideAlert, customerData, getCarts }) {

    //creating loading state variable
    const [isLoading, setIsLoading] = useState(false);

    //declaring icon styling variables
    const closePageIconStyle = { color: "red" };

    //creating the navigation function
    const navigate = useNavigate()

    //creating states for controlled inputs
    const [cakeColor, setCakeColor] = useState(targetLineItem?.color);
    const [cakeText, setCakeText] = useState(targetLineItem?.cake_text);


    //creating a function to handleEditCartLineItem
    function handleEditCartLineItem() {
        setIsLoading(true);
        window.scroll(0, 0);

        //sending variant option data to the database
        axios.patch(`/line_items/${targetLineItem?.id}`, { 
            color: cakeColor?.trim()?.charAt(0)?.toUpperCase() + cakeColor?.slice(1), 
            cake_text: cakeText?.trim()?.charAt(0)?.toUpperCase() + cakeText?.slice(1) 
        })
        .then(response => {
            setIsLoading(false)
            setAlertStatus(true);
            setAlertMessage("Line item updated successfully!");
            setAlertDisplay("block");
            getCarts(customerData?.id)
            hideAlert();
            navigate("/cart")
            // window.location.reload()
        })
        .catch(error => {
            if (error?.response) {
                setIsLoading(false)
                setAlertStatus(false);
                setAlertMessage("Line item not updated!");
                setAlertDisplay("block");
                hideAlert();
            }
        })
    }


    return (
        <div className="editCartItemContainer">
            <Tooltip title="close" arrow>
                <button className="btn-closePage" onClick={() => {
                    // setVariantOption({});
                    setTargetLineItem({});
                    setCakeColor("");
                    setCakeText("");
                    navigate("/cart");

                }}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        <AiFillCloseCircle style={closePageIconStyle} />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <div className="editCartItemFormContainer">
                <form className="editCartItemForm" onSubmit={(e) => {
                    e.preventDefault();
                    handleEditCartLineItem();
                }}>
                    <h1 className="editCartItemFormTitle">{"EDIT CART ITEM"}</h1>
                    <div className="editCartItemColorContainer">
                        <p className="editCartItemColorText">Cake colour</p>
                        <input className="editCartItemColorInput" type="text" required value={cakeColor} onChange={e => setCakeColor(e.target.value)} />
                    </div>

                    <div className="editCartItemCakeTextContainer">
                        <p className="editCartItemCakeTextTitle">Cake text (required)</p>
                        <textarea className="editCartItemCakeTextTextArea" rows="2" cols="75" value={cakeText}
                            onChange={(e) => {
                                if (e.target?.value?.length <= 50) {
                                    setCakeText(e.target.value);
                                }
                            }} />
                        <p className="editCartItemCakeTextMaxInput">{`${cakeText.length}/50`}</p>

                    </div>
                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? <div class="loader"></div> : "Update"}</button>
                </form>
            </div>
        </div>
    );

}

export default EditCartItem;