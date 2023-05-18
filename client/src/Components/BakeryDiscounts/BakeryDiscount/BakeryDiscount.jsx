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

    //creating a function to change the discount of the products to "No discount"
    function changeProductDiscount(product){
        //crating an index variable
        let index = 0;
        //finding the index of the "No discount" discount
        discounts.forEach(discount => {
            if (discount?.name === "No discount"){
                //assigning its index to the variable
                index = discounts.indexOf(discount);
            } 
        });

        //changing the discount of each product 
        axios.patch(`/products/${product?.id}`, {discount_id: discounts[index]?.id})
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


    //creating function to handle discount deletion
    function handleDeleteDiscount(discount){
       //checking if the discount is linked to any product
       if (discount?.products.length > 0){
            //looping through all it's products
            discount?.products?.forEach(product => {
                changeProductDiscount(product)
            });
       }
       setTimeout(()=>{
            axios.delete(`/discounts/${discount?.id}`)
            .then(() => {
                //if deleting image from database is a success
                window.scrollTo(0, 0);
                setAlertStatus(true);
                setAlertDisplay("block");
                setAlertMessage(`discount deleted successfully!`);
                hideAlert();
                let newData = discounts.filter((aDiscount)=> aDiscount !== discount)
                setDiscounts(newData);
            })
            .catch(error => {
                if(error?.response){
                    //if deleting image from database fails
                    window.scrollTo(0, 0);
                    setAlertStatus(false);
                    setAlertDisplay("block");
                    setAlertMessage(error.response.data.error);
                    hideAlert();
                }

            })
       }, 3000);

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