import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillCloseCircle} from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function BakeryProductEditVariantGroup({viewBakeryProductEditVariantGroup, setViewBakeryProductEditVariantGroup ,variantGroup, setVariantGroup, getVariantGroups, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){
   
    //creating state variables for controlled inputs
    const [variantGroupName, setVariantGroupName] = useState(variantGroup?.name ? variantGroup?.name : "");

    //creating loading state variable
    const [isLoading, setIsLoading] = useState(false);

    //declaring icon styling variables
    const closePageIconStyle = {color: "red"};

     //creating the navigation function
     const navigate = useNavigate();

   
    //creating a function to handleEditVariantGroup
    function handleEditVariantGroup(){
        setIsLoading(true);
        window.scroll(0,0);

        //sending variant group data to the database
        axios.patch(`/variant_groups/${variantGroup?.id}`, {name: variantGroupName})
        .then(response => {
            setIsLoading(false)
            setAlertStatus(true);
            setAlertMessage("Variant group updated successfully!");
            setAlertDisplay("block");
            getVariantGroups();
            setVariantGroup({});
            hideAlert();
        })
        .catch(error => {
            if (error?.response){
                setIsLoading(false)
                setAlertStatus(false);
                setAlertMessage("Variant group not updated!");
                setAlertDisplay("block");
                hideAlert();
            }
        })
    }


    return(
        <div className="bakeryProductEditVariantGroupContainer" style={{display: viewBakeryProductEditVariantGroup}}>
            <Tooltip title={<p className="tooltipText">close</p>} arrow>
                <button className="btn-closePage" onClick={()=>{
                    setViewBakeryProductEditVariantGroup("none");
                    setVariantGroup({})
                    setVariantGroupName("")
                    navigate("/bakery-portal/product-variants/")
            }}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        <AiFillCloseCircle style={closePageIconStyle} />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <div className="bakeryProductEditVariantGroupFormContainer">
                <form className="bakeryProductEditVariantGroupForm" onSubmit={(e) => {
                    e.preventDefault();
                    handleEditVariantGroup()
                }}>
                    <h1 className="bakeryProductEditVariantGroupFormTitle">{"EDIT VARIANT GROUP"}</h1>
                    <div className="bakeryProductEditVariantGroupFormTextAndInputContainer">
                        <p className="bakeryProductEditVariantGroupFormText">Name</p>
                        <input className="bakeryProductEditVariantGroupFormInput"
                            required
                            value={variantGroupName}
                            onChange={(e) => setVariantGroupName(e.target.value)}
                        />
                    </div>
                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? <div class="loader"></div> : "Update"}</button>
                </form>
            </div>
        </div>
    );

}

export default BakeryProductEditVariantGroup;