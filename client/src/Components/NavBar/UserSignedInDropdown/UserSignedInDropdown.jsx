import React, { useState } from "react";
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

function UserSignedInDropdown({customerData, bakerData, handleLogout}){

    //creating loading state
    const [isLoading, setIsLoading] = useState(false)

    //creating navigation variable function
    const navigate = useNavigate();


    return (
        <div className="userSignedInDropdownContainer">

            <div className="userSignedInDropdownBtnAndNameContainer">
                <button className="userSignedInDropdownBtn">{
                    <IconContext.Provider value={{ size: '26px' }}>
                        <FaUserCircle/> 
                    </IconContext.Provider>
                }</button>

                <p className="userSignedInDropdownName">{
                customerData?.verified ? `${customerData?.first_name} ${customerData?.last_name}` : 
                bakerData?.first_name && `${bakerData?.first_name} ${bakerData?.last_name}`}</p>
            </div>
           
            <div className='userSignedInDropdownLinksContainer'>
                {
                    customerData?.id && <button className="userSignedInDropdownBtn" onClick={() => navigate()}>{isLoading ? "Loading..." : "Account Management"}</button>
                }

                {
                    customerData?.id && <button className="userSignedInDropdownBtn" onClick={() => navigate()}>{isLoading ? "Loading..." : "Address Book"}</button>
                }

                {
                    customerData?.id && <button className="userSignedInDropdownBtn" onClick={() => navigate()}>{isLoading ? "Loading..." : "My Orders"}</button>
                }
                
                {
                    customerData?.id && <button className="userSignedInDropdownBtn" onClick={() => navigate()}>{isLoading ? "Loading..." : "Pending Reviews"}</button>
                }

                {
                    <button className="userSignedInDropdownLogoutBtn" onClick={() => handleLogout(setIsLoading)}>{isLoading ? "Loading..." : "Logout"}</button>
                }
            
            </div>

        </div>
    );
}
export default UserSignedInDropdown;