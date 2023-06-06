import React from "react";
import { useNavigate } from "react-router-dom";

function AddressBook( {customerData}){

    //creating navigation variable function
    const navigate = useNavigate();
    
    return (
        <div className="addressBookContainer">
            <h1>ADDRESS BOOK</h1>

            {
                //if the address book is empty 
                customerData?.customer_addresses.length < 1 ? 
                //display this
                <p className="addressBookEmptyText">There're no addresses linked to this account, please add an address!</p> :
                //else display addresses
                customerData?.customer_addresses.map(address => <></>)
            }

            <button className="addressBookAddAddressbtn">ADD NEW ADDRESS</button>

        </div>
    )

}

export default AddressBook;