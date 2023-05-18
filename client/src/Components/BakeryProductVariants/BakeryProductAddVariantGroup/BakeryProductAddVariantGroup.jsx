import React, { useState } from "react";
import axios from "axios";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillCloseCircle} from "react-icons/ai";

function BakeryProductAddVariantGroup({viewBakeryProductAddVariantGroup, setViewBakeryProductAddVariantGroup, getVariantGroups, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){
   
    //creating state variables for controlled inputs
    const [variantGroupName, setVariantGroupName] = useState("");
    

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
   

    return(
        <div className="bakeryProductAddVariantGroupContainer" style={{display: viewBakeryProductAddVariantGroup}}>
            <Tooltip title="close" arrow>
                <button className="btn-closePage" onClick={()=>{
                    setViewBakeryProductAddVariantGroup("none");
                    setVariantGroupName("");
                    
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
                    <h1 className="bakeryProductAddVariantGroupFormTitle">{"ADD VARIANT GROUP"}</h1>
                    <label className="nameLabel">Name:</label>
                    <input className="nameInput" type="text" required value={variantGroupName} onChange={e => setVariantGroupName(e.target.value)}/>
                    <button className="forgotPasswordSubmitButton" type="submit">{isLoading ? "Loading..." : "Save"}</button>
                </form>
            </div>
        </div>
    );

}

export default BakeryProductAddVariantGroup;