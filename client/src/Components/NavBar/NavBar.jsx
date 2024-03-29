import React from 'react';
import logo from "../../assets/BakeryLogo.jpeg";
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { Badge } from '@mui/material';
import { MdShoppingCart } from 'react-icons/md';
import { LoginOrSignUpDropdown, UserSignedInDropdown } from '../../Components';
function NavBar({ totalItems, bakerData, customerData, handleLogout }) {
    //styling the icons
    const ButtonsIconStyle = { color: "black" };
    //creating the navigation function variable
    const navigate = useNavigate();

    return (
        <div className='navBar'>
            <div className='logoAndTitleContainer' onClick={() => { navigate("/") }}>
                <img className="navBarLogo" src={logo} alt="Oink Oink Bakery" title='Satisfying your pallet one slice at a time.' />
                <h3 className='bakeryTitle'>Oink Oink Bakery</h3>
            </div>

            <div className="flexibleGrow" />

            <div className="NavBarIconsContainer">

                {
                    customerData?.verified === true || bakerData?.first_name ?
                        <UserSignedInDropdown customerData={customerData} bakerData={bakerData} handleLogout={handleLogout} /> :
                        window.location.href.includes("/login") ||
                            window.location.href.includes("/admin-login") ||
                            window.location.href.includes("bakery-portal")
                            ? null : <LoginOrSignUpDropdown />

                }

                {
                    window.location.href.includes("cart") ||
                        window.location.href.includes("login") ||
                        window.location.href.includes("sign-up") ||
                        window.location.href.includes("forgot-password") ||
                        window.location.href.includes("admin") ||
                        // window.location.href.includes("customer") ||
                        window.location.href.includes("bakery-portal") ? null :
                        <Tooltip title={<p className="tooltipText">Show cart items</p>} arrow>
                            <button className="btn-showCartItems" onClick={() => navigate("/cart")}>
                                <IconContext.Provider value={{ size: '26px' }}>
                                    <Badge badgeContent={totalItems} color="secondary">
                                        <MdShoppingCart style={ButtonsIconStyle} />
                                    </Badge>
                                </IconContext.Provider>
                            </button>
                        </Tooltip>
                }

            </div>
        </div>
    )
}
export default NavBar;