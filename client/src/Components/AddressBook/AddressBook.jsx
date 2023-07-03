import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { NavBar, AddAddress, EditAddress, Address } from "../../Components";
import { FaRegAddressCard } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

function AddressBook({ customerData, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert, isCustomerLoggedIn }) {
    const [targetAddress, setTargetAddress] = useState({});

    //creating navigation variable function
    const navigate = useNavigate();

    //creating state to hold title size
    const [titleSize, setTitleSize] = useState("30px")

    useEffect(() => {
        setTitleSize(getComputedStyle(document?.getElementsByClassName("addressBookPageTitle")[0])?.fontSize);
        isCustomerLoggedIn();
    }, [titleSize])

    return (
        <div className="addressBookContainer" style={{ height: `calc("100vh" - ${100 * 130 / window.innerHeight}vh)` }}>

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
                    } />

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
                    } />
                </Routes>
            </div>


            <div className="addressBookPageTitleAddAddressBtnContainer">
                <div className="addressBookPageTitleAndIconContainer">
                    <h1 className="addressBookPageTitle">ADDRESS BOOK</h1>

                    <IconContext.Provider value={{
                        //make the icon size the size of the elements text - 6px
                        size: `calc(${titleSize} - 6px)`
                    }}>
                        <FaRegAddressCard />
                    </IconContext.Provider>
                </div>
                <button className="addressBookAddAddressBtn" onClick={() => navigate("/customer/address-book/add-address")}>ADD NEW ADDRESS</button>
            </div>

            {
                //if the address book is empty 
                customerData?.customer_addresses?.length < 1 ?
                    //display this
                    <p className="addressBookEmptyText">There're no addresses linked to this account, please add an address!</p> :
                    //else display addresses
                    <div className="addressBookAddressesGrid">
                        {customerData?.customer_addresses?.map(address =>
                            <Address
                                key={address?.id}
                                address={address}
                                setTargetAddress={setTargetAddress}
                                setAlertDisplay={setAlertDisplay}
                                setAlertStatus={setAlertStatus}
                                setAlertMessage={setAlertMessage}
                                hideAlert={hideAlert}
                                isCustomerLoggedIn={isCustomerLoggedIn}
                            />)
                        }
                    </div>
            }

        </div>
    )

}

export default AddressBook;