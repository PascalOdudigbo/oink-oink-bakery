import React from 'react';
import logo from "../assets/BakeryLogo.jpeg";
import Tooltip from '@mui/material/Tooltip';
import {Link, useNavigate} from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { Badge } from '@mui/material';
import {MdShoppingCart} from 'react-icons/md';
function NavBar({totalItems}) {
    const ButtonsIconStyle = { color: "black" };
    const navigate = useNavigate();

    return (
        <div className='navBar'>
            <div className='logoAndTitleContainer' onClick={()=>{navigate("/")}}>
            <img className="navBarLogo" src={logo} alt="Oink Oink Bakery" title='Appeasing your pallet one slice at a time.'/>
            <h3 className='bakeryTitle'>Oink Oink Bakery</h3>
            </div>
           
            <div className="flexibleGrow" />

            <div className='loginAndSignUpLinksContainer'>
                <Link className='loginAndSignUpLinks' to={"/login"}>Login </Link>
                <p>&nbsp; / &nbsp;</p>
                <Link className='loginAndSignUpLinks' to={"/sign-up"}>Sign Up</Link>
            </div>

            <Tooltip title="Show cart items" arrow>
                <button className="btn-showCartItems">
                    <IconContext.Provider value={{ size: '26px' }}>
                    <Badge badgeContent={totalItems} color="secondary">
                        <MdShoppingCart style={ButtonsIconStyle} />
                    </Badge>
                    </IconContext.Provider>
                </button>
            </Tooltip>
        </div>
    )
}
export default NavBar;