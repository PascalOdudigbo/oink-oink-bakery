import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../../assets/profileIcon.webp";
import { IconContext } from "react-icons/lib";
import { RiProfileFill, RiLockPasswordFill } from "react-icons/ri"
import { FaUserCircle } from 'react-icons/fa';

function AccountManagement({ customerData, bakerData }) {
    //styling the button icons
    const iconStyles = { marginRight: "10px", marginLeft: "6px", color: "black" };

    //styling profile icon
    const profileIconStyle = { color: "white" };

    return (
        <div className="accountManagementContainer" style={{ height: `calc(100vh - ${100 * 125 / window.innerHeight}vh)` }}>

            <div className="accountManagementIconAndTextContainer">
                <IconContext.Provider value={{ size: "80px" }}>
                    <FaUserCircle style={profileIconStyle} />
                </IconContext.Provider>
                <h1 className="accountManagementText">{customerData?.id ? `HELLO ${customerData?.first_name?.toUpperCase()} ${customerData?.last_name?.toUpperCase()}` : `HELLO ${bakerData?.first_name?.toUpperCase()} ${bakerData?.last_name?.toUpperCase()}`}</h1>
            </div>

            <div className="accountManagementButtonsContainer">
                <IconContext.Provider value={{ size: "25px" }}>
                    <div className="accountManagementIconAndButtonContainer">
                        <RiProfileFill style={iconStyles} />
                        <Link className="accountManagementNavigationButtons" to="/account-management/customer/edit-profile/">EDIT PROFILE</Link>
                    </div>

                    <div className="accountManagementIconAndButtonContainer">
                        <RiLockPasswordFill style={iconStyles} />
                        <Link className="accountManagementNavigationButtons" to="/account-management/customer/change-password/">CHANGE PASSWORD</Link>
                    </div>
                </IconContext.Provider>

            </div>

        </div>
    )
}

export default AccountManagement;