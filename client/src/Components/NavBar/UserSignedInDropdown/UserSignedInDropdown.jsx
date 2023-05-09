import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";

function UserSignedInDropdown({customerData, bakerData, handleLogout}){

    //creating loading state
    const [isLoading, setIsLoading] = useState(false)


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
                    
                }
                
                {
                    <button className="userSignedInDropdownLogoutBtn" onClick={() => handleLogout(setIsLoading)}>{isLoading ? "Loading..." : "Logout"}</button>
                }
            
            </div>

        </div>
    );
}
export default UserSignedInDropdown;