import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { SlOptions } from 'react-icons/sl';
import axios from "axios";
import { useNavigate } from "react-router-dom"; 


function BakeryDiscount({discounts, setDiscounts, discount, setTargetDiscount, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert }) {

    //creating options dropdown display state variables
    const [dropdownDisplay, setDropdownDisplay] = useState("none");

    //creating navigation variable
    const navigate = useNavigate();


    //creating function to handle discount deletion
    function handleDeleteDiscount(){
       
    }
    
    return (
        <tr className="discountsDataRow">

            <td className="discountsDataCell">{discount?.name}</td>
            <td className="discountsDataCell">{discount?.description}</td>
            <td className="discountsDataCell">{discount?.discount_percent}%</td>
            <td className="discountsDataCell">
                {
                    discount?.name !== "No discount" && 
                        <div className="dropdown">
                            <IconContext.Provider value={{ size: '20px' }}>
                                <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} style={{ color: "black" }} />
                            </IconContext.Provider>
                            <div className="dropdown-content" style={{ display: dropdownDisplay }}>
                                <button className='bakeryDiscountDropdownItem' onClick={() => {
                                    //set target discount here
                                    setTargetDiscount(discount)
                                    navigate("/bakery-portal/edit-discount")
                                }}>Edit</button>
                                <button className="bakeryDiscountDropdownItemDelete" onClick={() => {handleDeleteDiscount(discount)}}>Delete</button>
                            </div>
                        </div>
                }
            </td>
        </tr>

    );


}
export default BakeryDiscount;