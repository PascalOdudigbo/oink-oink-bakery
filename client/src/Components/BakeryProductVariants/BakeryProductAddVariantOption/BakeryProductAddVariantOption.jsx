import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillCloseCircle} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function BakeryProductAddVariantOption({viewBakeryProductAddVariantOption, setViewBakeryProductAddVariantOption ,variantGroup, getVariantGroups, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){
   
    //creating state variables for controlled inputs
    const [variantOptionName, setVariantOptionName] = useState("");
    const [variantOptionPrice, setVariantOptionPrice] = useState("")

    //creating loading state variable
    const [isLoading, setIsLoading] = useState(false);

    //declaring icon styling variables
    const closePageIconStyle = {color: "red"};

    // creating the navigate function
    const navigate = useNavigate();

    //creating a function to handleAddVariantOption
    function handleAddVariantOption(){
        setIsLoading(true);
        window.scroll(0,0);

        //sending variant option data to the database
        axios.post("/variant_options", {variant_group_id: variantGroup?.id, name: variantOptionName, price: parseFloat(variantOptionPrice)})
        .then(response => {
            setIsLoading(false)
            setAlertStatus(true);
            setAlertMessage("Variant option added successfully!");
            setAlertDisplay("block");
            getVariantGroups()
            hideAlert();
        })
        .catch(error => {
            if (error?.response){
                setIsLoading(false)
                setAlertStatus(false);
                setAlertMessage("Variant option not added!");
                setAlertDisplay("block");
                hideAlert();
            }
        })
    }



    return(
        <div className="bakeryProductAddVariantOptionContainer" style={{display: viewBakeryProductAddVariantOption}}>
            <Tooltip title={<p className="tooltipText">close</p>} arrow>
                <button className="btn-closePage" onClick={()=>{
                    setViewBakeryProductAddVariantOption("none");
                    setVariantOptionName("");
                    setVariantOptionPrice("");
                    navigate("/bakery-portal/product-variants/");
            }}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        <AiFillCloseCircle style={closePageIconStyle} />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <div className="bakeryProductAddVariantOptionFormContainer">
                <form className="bakeryProductAddVariantOptionForm" onSubmit={(e) => {
                    e.preventDefault();
                    handleAddVariantOption()
                }}>
                    <h1 className="bakeryProductAddVariantOptionFormTitle">{"ADD VARIANT OPTION"}</h1>
                    
                    <div className="bakeryProductAddVariantOptionFormTextAndInputContainer">
                        <p className="bakeryProductAddVariantOptionFormText">Name</p>
                        <input className="bakeryProductAddVariantOptionFormInput"
                            required
                            value={variantOptionName}
                            onChange={(e) => setVariantOptionName(e.target.value)}
                        />
                    </div>

                    <div className="bakeryProductAddVariantOptionFormTextAndInputContainer">
                        <p className="bakeryProductAddVariantOptionFormText">Price</p>
                        <input className="bakeryProductAddVariantOptionFormInput"
                            required
                            value={variantOptionPrice}
                            onChange={(e) => setVariantOptionPrice(e.target.value)}
                        />
                    </div>

                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? <div class="loader"></div> : "Save"}</button>
                </form>
            </div>
        </div>
    );

}

export default BakeryProductAddVariantOption;