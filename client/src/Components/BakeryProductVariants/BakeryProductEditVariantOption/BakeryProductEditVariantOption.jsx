import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillCloseCircle} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function BakeryProductEditVariantOption({viewBakeryProductEditVariantOption, setViewBakeryProductEditVariantOption ,variantOption, setVariantOption, variantGroup, getVariantGroups, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){
   
    //creating state variables for controlled inputs
    const [variantOptionName, setVariantOptionName] = useState(variantOption?.name ? variantOption?.name : "");
    const [variantOptionPrice, setVariantOptionPrice] = useState(variantOption?.price ? variantOption?.price : "")

    //creating loading state variable
    const [isLoading, setIsLoading] = useState(false);

    //declaring icon styling variables
    const closePageIconStyle = {color: "red"};

    //creating the navigation function
    const navigate = useNavigate()

  
    //creating a function to handleEditVariantOption
    function handleEditVariantOption(){
        setIsLoading(true);
        window.scroll(0,0);

        //sending variant option data to the database
        axios.put(`/variant_options/${variantOption?.id}`, {variant_group_id: variantGroup?.id, name: variantOptionName, price: parseFloat(variantOptionPrice)})
        .then(response => {
            setIsLoading(false)
            setAlertStatus(true);
            setAlertMessage("Variant option updated successfully!");
            setAlertDisplay("block");
            getVariantGroups();
            setVariantOptionName("");
            // setViewBakeryProductEditVariantOption("none")
            hideAlert();
        })
        .catch(error => {
            if (error?.response){
                setIsLoading(false)
                setAlertStatus(false);
                setAlertMessage("Variant option not updated!");
                setAlertDisplay("block");
                hideAlert();
            }
        })
    }


    return(
        <div className="bakeryProductEditVariantOptionContainer" style={{display: viewBakeryProductEditVariantOption}}>
            <Tooltip title="close" arrow>
                <button className="btn-closePage" onClick={()=>{
                    setViewBakeryProductEditVariantOption("none");
                    setVariantOption({});
                    navigate("/bakery-portal/product-variants/")
                    
            }}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        <AiFillCloseCircle style={closePageIconStyle} />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <div className="bakeryProductEditVariantOptionFormContainer">
                <form className="bakeryProductEditVariantOptionForm" onSubmit={(e) => {
                    e.preventDefault();
                    handleEditVariantOption();
                }}>
                    <h1 className="bakeryProductEditVariantOptionFormTitle">{"EDIT VARIANT OPTION"}</h1>
                    <div className="bakeryProductEditVariantOptionFormTextAndInputContainer">
                        <p className="bakeryProductEditVariantOptionFormText">Name</p>
                        <input className="bakeryProductEditVariantOptionFormInput"
                            required
                            value={variantOptionName}
                            onChange={(e) => setVariantOptionName(e.target.value)}
                        />
                    </div>

                    <div className="bakeryProductEditVariantOptionFormTextAndInputContainer">
                        <p className="bakeryProductEditVariantOptionFormText">Price</p>
                        <input className="bakeryProductEditVariantOptionFormInput"
                            required
                            value={variantOptionPrice}
                            onChange={(e) => setVariantOptionPrice(e.target.value)}
                        />
                    </div>
                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? <div class="loader"></div> : "Update"}</button>
                </form>
            </div>
        </div>
    );

}

export default BakeryProductEditVariantOption;