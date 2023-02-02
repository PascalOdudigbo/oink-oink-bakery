import React from "react";
import {MdDashboard, MdReviews} from 'react-icons/md';
import {FaFileInvoiceDollar} from 'react-icons/fa';
import {HiUsers} from 'react-icons/hi';
import {GiShoppingBag} from 'react-icons/gi';
import {AiFillDiff} from 'react-icons/ai';
import {TbDiscount2} from 'react-icons/tb';
import { IconContext } from "react-icons/lib";

function BakerHome(){
    const iconStyles = { marginRight: "10px", color: "black" };
    return(
        <div className="bakerHomeContainer">
            <div className="bakerHomeNavBar">
                <div className="buttonsContainer">
                    <IconContext.Provider value={{ size: "25px" }}>
                        <div className="iconAndButtonContainer">
                            <MdDashboard style={iconStyles}/>
                            <button className="navigationButtons">DASHBOARD</button>
                        </div>
                       
                        <div className="iconAndButtonContainer">
                            <FaFileInvoiceDollar style={iconStyles}/>
                            <button className="navigationButtons">ORDERS</button>
                        </div>

                        <div className="iconAndButtonContainer">
                            <HiUsers style={iconStyles}/>
                            <button className="navigationButtons">CUSTOMERS</button>
                        </div>

                        <div className="iconAndButtonContainer">
                             <GiShoppingBag style={iconStyles}/>
                            <button className="navigationButtons">PRODUCTS</button>
                        </div>
                        
                        <div className="iconAndButtonContainer">
                             <AiFillDiff style={iconStyles}/>
                            <button className="navigationButtons">PRODUCT VARIANTS</button>
                        </div>

                        <div className="iconAndButtonContainer">
                            <TbDiscount2 style={iconStyles}/>
                            <button className="navigationButtons">DISCOUNTS</button>
                        </div>

                        <div className="iconAndButtonContainer">
                            <MdReviews style={iconStyles}/>
                            <button className="navigationButtons">REVIEWS</button>
                        </div>
                        
                    </IconContext.Provider>

                </div>

            </div>
        </div>
    );
}
export default BakerHome;