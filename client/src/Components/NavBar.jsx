import React from 'react'
import logo from "../assets/BakeryLogo.jpeg"
import Tooltip from '@mui/material/Tooltip';
import { IconContext } from "react-icons/lib";
import { Badge } from '@mui/material';
import {MdShoppingCart} from 'react-icons/md';
function NavBar() {
    const ButtonsIconStyle = { color: "black" };

    return (
        <div className='navBar'>
            <div className='logoAndTitleContainer'>
            <img className="navBarLogo" src={logo} alt="Oink Oink Bakery" title='Appeasing your pallet one slice at a time.'/>
            <h3 className='bakeryTitle'>Oink Oink Bakery</h3>
            </div>
           
            <div className="flexibleGrow" />
            <Tooltip title="Show cart items" arrow>
                <button className="btn-showCartItems">
                    <IconContext.Provider value={{ size: '26px' }}>
                    <Badge badgeContent={2} color="secondary">
                        <MdShoppingCart style={ButtonsIconStyle} />
                    </Badge>
                    </IconContext.Provider>
                </button>
            </Tooltip>
        </div>
    )
}
export default NavBar;