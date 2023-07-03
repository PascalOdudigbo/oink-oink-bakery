import React from "react";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function BakeryProductVariantOption({variantOption, setVariantOption, setViewBakeryProductEditVariantOption, handleDeleteVariantOption}){
    
    //creating the navigate function
    const navigate = useNavigate();
    return (
        <div className="bakeryVariantOptionContainer" onClick={() => setVariantOption(variantOption)}>
            <h1 className="variantOptionName">{variantOption?.name}</h1>
            <h1 className="variantOptionPrice">Ksh {variantOption?.price}</h1>
            <div className="variantOptionButtonscontainer">
                
                    <IconContext.Provider value={{size: "20px"}}>
                        <Tooltip title={<p className="tooltipText">Edit</p>} arrow>
                            <button className="variantOptionEditBtn" onClick={()=> {
                                setVariantOption(variantOption);
                                setViewBakeryProductEditVariantOption("block");
                                navigate("/bakery-portal/product-variants/edit-variant-option");
                            }}>
                                <FaEdit style={{color: "black"}}/>
                            </button>
                        </Tooltip>
                    </IconContext.Provider>
            

                    <IconContext.Provider value={{size: "20px"}}>
                        <Tooltip title={<p className="tooltipText">Delete</p>} arrow> 
                            <button className="variantOptionDeleteBtn" onClick={() => handleDeleteVariantOption(variantOption)}>
                                <AiFillDelete style={{color: "black"}}/>
                            </button>
                        </Tooltip>
                    </IconContext.Provider>

            </div>

        </div>
    )
}
export default BakeryProductVariantOption;