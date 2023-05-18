import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillCloseCircle} from "react-icons/ai";

function BakeryProductEditVariantGroup({viewBakeryProductEditVariantGroup, setViewBakeryProductEditVariantGroup ,variantGroup, setVariantGroup, getVariantGroups, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){
   
    //creating state variables for controlled inputs
    const [variantGroupName, setVariantGroupName] = useState(variantGroup?.name ? variantGroup?.name : "");

    //creating loading state variable
    const [isLoading, setIsLoading] = useState(false);

    //declaring icon styling variables
    const closePageIconStyle = {color: "red"};

   
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
            <Tooltip title="close" arrow>
                <button className="btn-closePage" onClick={()=>{
                    setViewBakeryProductEditVariantGroup("none");
                    setVariantGroup({})
                    setVariantGroupName("")
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
                    <label className="nameLabel">Name:</label>
                    <input className="nameInput" type="text" required value={variantGroupName} onChange={e => setVariantGroupName(e.target.value)}/>
                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? "Loading..." : "Update"}</button>
                </form>
            </div>
        </div>
    );

}

export default BakeryProductEditVariantGroup;