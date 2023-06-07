import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {NavBar, AddAddress} from "../../Components";

function AddressBook( {customerData, handleLogout, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn}){
    console.log(customerData)

    //creating navigation variable function
    const navigate = useNavigate();
    
    return (
        <div className="addressBookContainer">

            <div className="addressBookAddAddressContainer"> 
                <Routes>
                    <Route path={"/add-address"} element={
                        <AddAddress
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                            isCustomerLoggedIn={isCustomerLoggedIn}
                        />
                    }/>
                </Routes>
            </div>

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
                <button className="addressBookAddAddressBtn" onClick={() => navigate("/customer/address-book/add-address")}>ADD NEW ADDRESS</button>
            </div>

        </div>
    )

}

export default AddressBook;