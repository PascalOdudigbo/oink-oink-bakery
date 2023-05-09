import React from "react";
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { IconContext } from "react-icons/lib";

function LoginOrSignUpDropdown() {
    return (
        <div className="loginAndSignUpLinksDropdownContainer">
            <button className="loginAndSignUpLinkDropdownBtn">{
                <IconContext.Provider value={{ size: '26px' }}>
                    <FaUserCircle/>
                </IconContext.Provider>
            }</button>
            <div className='loginAndSignUpLinksContainer'>
                {
                    window.location.href.includes("admin-forgot-password") ?
                        <Link className='loginAndSignUpLinks' to={"/admin-login"}>Login </Link> :
                        <Link className='loginAndSignUpLinks' to={"/login"}>Login </Link>
                }
                
                {
                    window.location.href.includes("/sign-up") ? null : window.location.href.includes("/admin-login") ||
                        window.location.href.includes("/admin-forgot-password")
                        ? null : <Link className='loginAndSignUpLinks' to={"/sign-up"}>Sign Up</Link>
                }
            
            </div>

        </div>
    );

}
export default LoginOrSignUpDropdown;
