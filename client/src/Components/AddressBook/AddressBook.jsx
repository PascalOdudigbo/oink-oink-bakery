import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {NavBar, AddAddress, EditAddress} from "../../Components";

function AddressBook( {customerData, handleLogout, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn}){
    const[targetAddress, setTargetAddress] = useState({});

    //creating navigation variable function
    const navigate = useNavigate();

    useEffect(() => {
        isCustomerLoggedIn();
    }, [])
    
    return (
        <div className="addressBookContainer">

            <div className="addressBookAddAddressContainer"> 
                <Routes>
                    <Route path={"/add-address"} element={
                        <AddAddress
                            customerData={customerData}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                            isCustomerLoggedIn={isCustomerLoggedIn}
                        />
                    }/>

                    <Route path={"/edit-address"} element={
                        <EditAddress
                            targetAddress={targetAddress}
                            customerData={customerData}
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
                <div className="addressBookAddressesGrid"> 
                    {customerData?.customer_addresses?.map(address => {})}
                </div>
            }
            <div className="addressBookAddAddressBtnContainer">
                <button className="addressBookAddAddressBtn" onClick={() => navigate("/customer/address-book/add-address")}>ADD NEW ADDRESS</button>
            </div>

        </div>
    )

}

export default AddressBook;