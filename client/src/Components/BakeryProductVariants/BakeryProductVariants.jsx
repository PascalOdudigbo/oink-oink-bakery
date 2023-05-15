import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {RiAddFill} from "react-icons/ri";
import {BakeryProductVariantGroup, BakeryProductAddAndEditVariantGroup} from "../../Components";
import axios from "axios";

function BakeryProductVariants({variantGroups, setVariantGroups, variantOptions, setVariantOptions, getVariantGroups, getVariantOptions, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){

    //creating state variables to manage target variantGroup and variantOption data
    const [variantGroup, setVariantGroup] = useState({});
    const [variantOption, setVariantOption] = useState({});

    //creating state variables to handle page display
    const [viewBakeryProductAddAndEditVariantGroup, setViewBakeryProductAddAndEditVariantGroup] = useState("none");

    //creating variable for styling the add buttons
    const addBtnIconStyle = { marginRight: "3px", marginLeft: "6px", color: "white" };

    //creating a function to change product variant group to No variant group 
    //if its Variant Group is being deleted
    function handleChangeProductsVariantGroup(product){
        //finding the index of the "No variant group"
        let index = 0
        variantGroups.forEach(variantGroup => {
            if (variantGroup?.name === "No variant group"){
                index = variantGroups.indexOf(variantGroup);
            }
           
        })

        //changing the variant group of the product
        axios.patch(`/products/${product?.id}`, {variant_group_id: variantGroups[index]?.id})
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            if(error?.response){
                setAlertStatus(false);
                setAlertMessage("Something went wrong please refresh page and try again!");
                setAlertDisplay("block")
                hideAlert();
            }
        })

    }

    //creating a function to handle delete variant group btn clicked
    function handleDeleteVariantGroup(variantGroup){
        //if the variant group is connected to any product 
        if (variantGroup?.products?.length > 0 ){
            variantGroup?.products?.forEach(product => {
                //disconnect the variant group from that product
                handleChangeProductsVariantGroup(product)
            })
        }
        //delete the variant group from the database
        axios.delete(`/variant_groups/${variantGroup?.id}`)
        .then(response => {
            //if deleted successfully
            setAlertStatus(true);
            setAlertMessage("Variant group deleted successfully!");
            const newData = variantGroups?.filter(vG => vG?.id !== variantGroup?.id) 
            setVariantGroups(newData);
            setAlertDisplay("block");
            hideAlert();
        })
        .catch(error => {
            if(error?.response){
                //if delete fails
                setAlertStatus(false);
                setAlertMessage("Variant group delete failed, please try again!");
                setAlertDisplay("block");
                hideAlert();
            }
        })
        
    }

    return (
        <div className="bakeryProductVariantsContainer">

            <div className="bakeryProductVariantsBakeryProductAddAndEditVariantGroupContainer">
                <BakeryProductAddAndEditVariantGroup
                    viewBakeryProductAddAndEditVariantGroup={viewBakeryProductAddAndEditVariantGroup}
                    setViewBakeryProductAddAndEditVariantGroup={setViewBakeryProductAddAndEditVariantGroup}
                    variantGroup={variantGroup}
                    setVariantGroup={setVariantGroup}
                    variantGroups={variantGroups}
                    setVariantGroups={setVariantGroups}
                    getVariantGroups={getVariantGroups}
                    setAlertDisplay={setAlertDisplay}
                    setAlertStatus={setAlertStatus}
                    setAlertMessage={setAlertMessage}
                    hideAlert={hideAlert}

                />
            </div>

            <div className='bakeryProductVariantsTitleContainer'>
                <h1 className="bakeryProductVariantsPageTitle">PRODUCT VARIANTS</h1>
            </div>

            <div className="bakeryVariantGroupsNameAndButtonContainer">
                    <h1 className="bakeryVariantGroupsName">Group</h1>
                    <Tooltip title="Add variant group" arrow>
                        <div className="iconAndButtonContainer" onClick={() => setViewBakeryProductAddAndEditVariantGroup("block") }>
                            <IconContext.Provider value={{ size: '15px' }}>
                                <RiAddFill style={addBtnIconStyle} />
                            </IconContext.Provider>
                            <button className="addVariantGroupBtn">ADD</button>
                        </div>
                    </Tooltip>
            </div>
            <div className="bakeryVariantGroupsContainer">
                <div className="bakeryVariantGroupsContainerNameTextContainer">
                    <h1 className="bakeryVariantGroupsContainerNameText">Name</h1>
                </div>

                {   
                    //looping through each variant group and displaying them
                    variantGroups?.map(variantGroup => 
                        <BakeryProductVariantGroup 
                            key={variantGroup?.id} 
                            variantGroup={variantGroup} 
                            setVariantGroup={setVariantGroup} 
                            setViewBakeryProductAddAndEditVariantGroup={setViewBakeryProductAddAndEditVariantGroup}
                            handleDeleteVariantGroup={handleDeleteVariantGroup}
                        />
                    )
                }

            </div>

        </div>
    );
}
export default BakeryProductVariants;