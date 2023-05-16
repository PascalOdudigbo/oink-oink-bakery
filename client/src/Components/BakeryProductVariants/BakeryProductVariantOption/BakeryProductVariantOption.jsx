import React from "react";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";

function BakeryProductVariantOption({variantOption, setVariantOption, setViewBakeryProductEditVariantOption, handleDeleteVariantOption}){
    
    return (
        <div className="bakeryVariantOptionContainer" onClick={() => setVariantOption(variantOption)}>
            <h1 className="variantOptionName">{variantOption?.name}</h1>
            <h1 className="variantOptionPrice">Ksh {variantOption?.price}</h1>
            <div className="variantOptionButtonscontainer">
                
                    <IconContext.Provider value={{size: "20px"}}>
                        <Tooltip title="Edit" arrow>
                            <button className="variantOptionEditBtn" onClick={()=> {
                                setVariantOption(variantOption);
                                setViewBakeryProductEditVariantOption("block");
                            }}>
                                <FaEdit style={{color: "black"}}/>
                            </button>
                        </Tooltip>
                    </IconContext.Provider>
            

                    <IconContext.Provider value={{size: "20px"}}>
                        <Tooltip title="Delete" arrow> 
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