import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillCloseCircle} from "react-icons/ai";

function BakeryProductAddAndEditVariantGroup({viewBakeryProductAddAndEditVariantGroup, setViewBakeryProductAddAndEditVariantGroup ,variantGroup, setVariantGroup, variantGroups, setVariantGroups, getVariantGroups, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){
   
    //creating state variables for controlled inputs
    const [variantGroupName, setVariantGroupName] = useState(variantGroup?.name ? variantGroup?.name : "");
    console.log(variantGroupName)

    //creating loading state variable
    const [isLoading, setIsLoading] = useState(false);

    //declaring icon styling variables
    const closePageIconStyle = {color: "red"};

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
            setVariantGroupName("");
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
        <div className="bakeryProductAddAndEditVariantGroupContainer" style={{display: viewBakeryProductAddAndEditVariantGroup}}>
            <Tooltip title="close" arrow>
                <button className="btn-closePage" onClick={()=>{
                    setViewBakeryProductAddAndEditVariantGroup("none");
                    setVariantGroup({});
                    
            }}>
                    <IconContext.Provider value={{ size: '25px' }}>
                        <AiFillCloseCircle style={closePageIconStyle} />
                    </IconContext.Provider>
                </button>
            </Tooltip>

            <div className="bakeryProductAddAndEditVariantGroupFormContainer">
                <form className="bakeryProductAddAndEditVariantGroupForm" onSubmit={(e) => {
                    e.preventDefault();
                    variantGroup?.name ? handleEditVariantGroup() : handleAddVariantGroup()
                }}>
                    <h1 className="bakeryProductAddAndEditVariantGroupFormTitle">{variantGroup?.name ? "EDIT VARIANT GROUP" : "ADD VARIANT GROUP"}</h1>
                    <label className="nameLabel">Name:</label>
                    <input className="nameInput" type="text" required value={variantGroupName} onChange={e => setVariantGroupName(e.target.value)}/>
                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? "Loading..." : variantGroup?.name ? "Update" : "Save"}</button>
                </form>
            </div>
        </div>
    );

}

export default BakeryProductAddAndEditVariantGroup;