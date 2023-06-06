import React from "react";
import { useNavigate } from "react-router-dom";
import {NavBar} from "../../Components";

function AddressBook( {customerData, handleLogout}){
    console.log(customerData)

    //creating navigation variable function
    const navigate = useNavigate();
    
    return (
        <div className="addressBookContainer">
            <NavBar
                customerData={customerData}
                handleLogout={handleLogout}
            />
            <h1 className="addressBookPageTitle">ADDRESS BOOK</h1>

            {
                //if the address book is empty 
                customerData?.customer_addresses?.length < 1 ? 
                //display this
                <p className="addressBookEmptyText">There're no addresses linked to this account, please add an address!</p> :
                //else display addresses
                <div> 
                    {customerData?.customer_addresses?.map(address => <></>)}
                </div>
            }
            <div className="addressBookAddAddressBtnContainer">
                <button className="addressBookAddAddressBtn">ADD NEW ADDRESS</button>
            </div>

        </div>
    )

}

export default AddressBook;