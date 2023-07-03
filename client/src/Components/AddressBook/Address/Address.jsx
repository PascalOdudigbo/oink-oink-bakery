import React from "react";
import { Tooltip } from "@mui/material";
import { IconContext } from "react-icons/lib";
import {AiFillDelete} from "react-icons/ai";
import {FaEdit} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";



function Address({address, setTargetAddress, setAlertStatus, setAlertMessage, setAlertDisplay, hideAlert, isCustomerLoggedIn}){

    //creating navigate function
    const navigate = useNavigate();

    //creating function to handle address deletion
    function handleDeleteAddress(){
        axios.delete(`/customer_addresses/${address?.id}`)
            .then(response => {
                //if deleted successfully
                isCustomerLoggedIn();
                setAlertStatus(true);
                setAlertMessage("Address deleted successfully!");
                setAlertDisplay("block");
                hideAlert();
            })
            .catch(error => {
                if(error?.response){
                    //if delete fails
                    setAlertStatus(false);
                    setAlertMessage("Deleting address failed, please try again!");
                    setAlertDisplay("block");
                    hideAlert();
                }
            })
    }

    return (
        <div className="addressContainer">
            <p className="addressAddress">{address?.address}</p>
            <p className="addressAdditionalInfo">{address?.aditional_information}</p>
            <p className="addressRegion">{address?.region}</p>
            <p className="addressCity">{address?.city}</p>
            <p className="addressPhone">{address?.phone}</p>

            <div className="addressButtonscontainer">
                
                {
                    <IconContext.Provider value={{size: "18px"}}>
                        <Tooltip title={<p className="tooltipText">Edit</p>} arrow>
                            <button className="addressEditBtn" onClick={()=> {
                                setTargetAddress(address);
                                navigate("/customer/address-book/edit-address")
                            }}>
                                <FaEdit style={{color: "black"}}/>
                            </button>
                        </Tooltip>
                    </IconContext.Provider>
                }
            


                {
                    <IconContext.Provider value={{size: "18px"}}>
                        <Tooltip title={<p className="tooltipText">Delete</p>} arrow> 
                            <button className="addressDeleteBtn" onClick={() => {handleDeleteAddress()}}>
                                <AiFillDelete style={{color: "black"}}/>
                            </button>
                        </Tooltip>
                    </IconContext.Provider>
               }

            </div>

        </div>
    )

}
export default Address;