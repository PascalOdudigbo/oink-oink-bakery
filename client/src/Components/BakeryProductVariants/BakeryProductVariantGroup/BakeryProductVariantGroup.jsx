import React from "react";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";

function BakeryProductVariantGroup({variantGroup, setVariantGroup, setViewBakeryProductEditVariantGroup, handleDeleteVariantGroup}){
    
    return (
        <div className="bakeryVariantGroupContainer" onClick={() => setVariantGroup(variantGroup)}>
            <h1 className="variantGroupName">{variantGroup?.name}</h1>

            <div className="variantGroupButtonscontainer">
                
                {
                    variantGroup?.name !== "No variant group" && 
                    <IconContext.Provider value={{size: "18px"}}>
                        <Tooltip title="Edit" arrow>
                            <button className="variantGroupEditBtn" onClick={()=> {
                                setVariantGroup(variantGroup);
                                setViewBakeryProductEditVariantGroup("block");
                            }}>
                                <FaEdit style={{color: "black"}}/>
                            </button>
                        </Tooltip>
                    </IconContext.Provider>
                }
            


                {
                    variantGroup?.name !== "No variant group" && 
                    <IconContext.Provider value={{size: "18px"}}>
                        <Tooltip title="Delete" arrow> 
                            <button className="variantGroupDeleteBtn" onClick={() => handleDeleteVariantGroup(variantGroup)}>
                                <AiFillDelete style={{color: "black"}}/>
                            </button>
                        </Tooltip>
                    </IconContext.Provider>
               }

            </div>

        </div>
    )
}
export default BakeryProductVariantGroup;