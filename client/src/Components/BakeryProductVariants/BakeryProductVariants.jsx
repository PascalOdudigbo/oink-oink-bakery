import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {RiAddFill} from "react-icons/ri";
import {BakeryProductVariantGroup, BakeryProductAddVariantGroup, BakeryProductEditVariantGroup, BakeryProductVariantOption, BakeryProductAddVariantOption, BakeryProductEditVariantOption} from "../../Components";
import axios from "axios";
import { useNavigate, Route, Routes } from "react-router-dom";

function BakeryProductVariants({variantGroup, setVariantGroup, variantOption, setVariantOption, variantGroups, setVariantGroups, getVariantGroups, setVariantOptions, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert}){
    //creating the navigation function
    const navigate = useNavigate()
    
    //creating state variables to handle page display
    const [viewBakeryProductEditVariantGroup, setViewBakeryProductEditVariantGroup] = useState("none");
    const [viewBakeryProductAddVariantGroup, setViewBakeryProductAddVariantGroup] = useState("none");
    const [viewBakeryProductEditVariantOption, setViewBakeryProductEditVariantOption] = useState("none");
    const [viewBakeryProductAddVariantOption, setViewBakeryProductAddVariantOption] = useState("none");
    
    //creating variable for styling the add buttons
    const addBtnIconStyle = { marginRight: "3px", marginLeft: "6px", color: "white" };


    useEffect(() => {
        getVariantGroups();
    }, [])

    //creating a function to change product variant group to No variant group 
    //if its Variant Group is being deleted
    function handleChangeProductsVariantGroup(product){
        //finding the index of the "No variant group"
        let index = 0
        variantGroups.forEach(variantGroup => {
            if (variantGroup?.name === "No variant group"){
                index = variantGroups.indexOf(variantGroup);
                // console.log("index:", index)
            }
           
        })

        //changing the variant group of the product
        axios.patch(`/products/${product?.id}`, {variant_group_id: variantGroups[index]?.id})
        .then(response => {
            // console.log(response?.data)
            // console.log("got here")
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
        setAlertDisplay("block");
        setAlertMessage("loading...");
        setAlertStatus(true);
        //if the variant group is connected to any product 
        if (variantGroup?.products?.length > 0 ){
            variantGroup?.products?.forEach(product => {
                //disconnect the variant group from that product
                handleChangeProductsVariantGroup(product)
            })
        }
        setTimeout(()=>{
            //delete the variant group from the database
            // console.log("got here 2")
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
        }, 3000)
        
    }

    //creating function to handle delete variant option
    function handleDeleteVariantOption(variantOption){
        axios.delete(`/variant_options/${variantOption?.id}`)
        .then(response => {
            //if deleted successfully
            setAlertStatus(true);
            setAlertMessage("Variant option deleted successfully!");
            getVariantGroups();
            setAlertDisplay("block");
            hideAlert();
        })
        .catch(error => {
            if(error?.response){
                //if delete fails
                setAlertStatus(false);
                setAlertMessage("Variant option delete failed, please try again!");
                setAlertDisplay("block");
                hideAlert();
            }
        })
    }

    return (
        <div className="bakeryProductVariantsContainer">

            <div className="bakeryProductVariantsBakeryProductAddAndEditContainer">
                <Routes>
                    <Route path={"/add-variant-group"} element={
                        <BakeryProductAddVariantGroup 
                            viewBakeryProductAddVariantGroup={viewBakeryProductAddVariantGroup}
                            setViewBakeryProductAddVariantGroup={setViewBakeryProductAddVariantGroup}
                            getVariantGroups={getVariantGroups}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                        />
                    }/>

                    <Route path={"/edit-variant-group"} element={
                        <BakeryProductEditVariantGroup
                            viewBakeryProductEditVariantGroup={viewBakeryProductEditVariantGroup}
                            setViewBakeryProductEditVariantGroup={setViewBakeryProductEditVariantGroup}
                            variantGroup={variantGroup}
                            setVariantGroup={setVariantGroup}
                            getVariantGroups={getVariantGroups}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                        />
                    }/>


                    <Route path={"/add-variant-option"} element={
                        <BakeryProductAddVariantOption
                            viewBakeryProductAddVariantOption={viewBakeryProductAddVariantOption}
                            setViewBakeryProductAddVariantOption={setViewBakeryProductAddVariantOption}
                            variantGroup={variantGroup}
                            getVariantGroups={getVariantGroups}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                        />

                    }/>

                    <Route path={"/edit-variant-option"} element={
                        <BakeryProductEditVariantOption
                            viewBakeryProductEditVariantOption={viewBakeryProductEditVariantOption}
                            setViewBakeryProductEditVariantOption={setViewBakeryProductEditVariantOption}
                            variantOption={variantOption}
                            setVariantOption={setVariantOption}
                            variantGroup={variantGroup}
                            getVariantGroups={getVariantGroups}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                        />

                    }/>

                </Routes>
                
            </div>

            <div className='bakeryProductVariantsTitleContainer'>
                <h1 className="bakeryProductVariantsPageTitle">PRODUCT VARIANTS</h1>
            </div>

            <div className="bakeryVariantGroupsNameAndButtonContainer">
                    <h1 className="bakeryVariantGroupsName">Group</h1>
                    <Tooltip title={<p className="tooltipText">Add variant group</p>} arrow>
                        <div className="iconAndButtonContainer" onClick={() => {
                            setViewBakeryProductAddVariantGroup("block")
                            navigate("/bakery-portal/product-variants/add-variant-group")
                        }}>
                            <IconContext.Provider value={{ size: '15px' }}>
                                <RiAddFill style={addBtnIconStyle} />
                            </IconContext.Provider>
                            <button className="addVariantGroupBtn">ADD</button>
                        </div>
                    </Tooltip>
            </div>

            <div className="bakeryVariantGroupsContainerNameTextContainer">
                    <h1 className="bakeryVariantGroupsContainerNameText">Name</h1>
            </div>

            <div className="bakeryVariantGroupsContainer">
                
                {   
                    //looping through each variant group and displaying them
                    variantGroups?.map(variantGroup => 
                        <BakeryProductVariantGroup 
                            key={variantGroup?.id} 
                            variantGroup={variantGroup} 
                            setVariantGroup={setVariantGroup} 
                            setViewBakeryProductEditVariantGroup={setViewBakeryProductEditVariantGroup}
                            handleDeleteVariantGroup={handleDeleteVariantGroup}
                        />
                    )
                }

            </div>





            <div className="bakeryVariantOptionsNameAndButtonContainer">
                    <h1 className="bakeryVariantOptionsName">Options</h1>
                    <Tooltip title={<p className="tooltipText">Add variant option</p>} arrow>
                        <div className="iconAndButtonContainer" onClick={() => {
                            setViewBakeryProductAddVariantOption("block");
                            navigate("/bakery-portal/product-variants/add-variant-option")

                        }}>
                            <IconContext.Provider value={{ size: '15px' }}>
                                <RiAddFill style={addBtnIconStyle} />
                            </IconContext.Provider>
                            <button className="addVariantOptionBtn">ADD</button>
                        </div>
                    </Tooltip>
            </div>

            <div className="bakeryVariantOptionsContainerTextsContainer">
                    <h1 className="bakeryVariantOptionsContainerText">Name</h1>
                    <div className="expandableDiv"></div>
                    <h1 className="bakeryVariantOptionsContainerText">Price</h1>
            </div>
            
            <div className="bakeryVariantOptionsContainer">

                {   
                    //looping through each variant group and displaying them
                    variantGroup?.variant_options && variantGroup?.variant_options.map(variantOption => 
                        <BakeryProductVariantOption 
                            key={variantOption?.id} 
                            variantOption={variantOption} 
                            setVariantOption={setVariantOption} 
                            setViewBakeryProductEditVariantOption={setViewBakeryProductEditVariantOption}
                            handleDeleteVariantOption={handleDeleteVariantOption}
                        />
                    )
                }

            </div>

        </div>
    );
}
export default BakeryProductVariants;