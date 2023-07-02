import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillCloseCircle} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function BakeryProductAddVariantGroup({viewBakeryProductAddVariantGroup, setViewBakeryProductAddVariantGroup, getVariantGroups, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){
   
    //creating state variables for controlled inputs
    const [variantGroupName, setVariantGroupName] = useState("");
    

    //creating loading state variable
    const [isLoading, setIsLoading] = useState(false);

    //declaring icon styling variables
    const closePageIconStyle = {color: "red"};

    //creating the navigate function variable
    const navigate = useNavigate();

    //creating a function to handleAddVariantGroup
    function handleAddVariantGroup(){
        setIsLoading(true);
        window.scroll(0,0);

        //sending variant group data to the database
        axios.post("/variant_groups", {name: variantGroupName})
        .then(response => {
            setIsLoading(false)
            setAlertStatus(true);
            setAlertMessage("Variant group added successfully!");
            setAlertDisplay("block");
            getVariantGroups()
            hideAlert();
        })
        .catch(error => {
            if (error?.response){
                setIsLoading(false)
                setAlertStatus(false);
                setAlertMessage("Variant group not added!");
                setAlertDisplay("block");
                hideAlert();
            }
        })
    }
   

    return(
        <div className="bakeryProductAddVariantGroupContainer" style={{display: viewBakeryProductAddVariantGroup}}>
            <Tooltip title="close" arrow>
                <button className="btn-closePage" onClick={()=>{
                    setViewBakeryProductAddVariantGroup("none");
                    setVariantGroupName("");
                    navigate("/bakery-portal/product-variants/")
            }}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        <AiFillCloseCircle style={closePageIconStyle} />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <div className="bakeryProductAddVariantGroupFormContainer">
                <form className="bakeryProductAddVariantGroupForm" onSubmit={(e) => {
                    e.preventDefault();
                    handleAddVariantGroup()
                }}>
                    <h1 className="bakeryProductAddVariantGroupFormTitle">ADD VARIANT GROUP</h1>

                    <div className="bakeryProductAddVariantGroupFormTextAndInputContainer">
                        <p className="bakeryProductAddVariantGroupFormText">Name</p>
                        <input className="bakeryProductAddVariantGroupFormInput"
                            required
                            value={variantGroupName}
                            onChange={(e) => setVariantGroupName(e.target.value)}
                        />
                    </div>
                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? <div class="loader"></div> : "Save"}</button>
                </form>
            </div>
        </div>
    );

}

export default BakeryProductAddVariantGroup;