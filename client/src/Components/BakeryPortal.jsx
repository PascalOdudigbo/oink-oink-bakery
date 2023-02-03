import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MdDashboard, MdReviews } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { GiShoppingBag } from 'react-icons/gi';
import { AiFillDiff } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';
import { IconContext } from "react-icons/lib";
import {BakeryDashboard} from "../Components";

function BakerHome() {
    const iconStyles = { marginRight: "10px", marginLeft: "6px", color: "black" };
    return (
        <div className="bakeryPortalContainer">
            <div className="bakeryPortalNavBar">
                <div className="buttonsContainer">
                    <IconContext.Provider value={{ size: "25px" }}>
                        <div className="iconAndButtonContainer">
                            <MdDashboard style={iconStyles} />
                            <Link className="navigationButtons" to="/bakery-portal">DASHBOARD</Link>
                        </div>

                        <div className="iconAndButtonContainer">
                            <FaFileInvoiceDollar style={iconStyles} />
                            <Link className="navigationButtons" to="/bakery-portal/orders">ORDERS</Link>
                        </div>

                        <div className="iconAndButtonContainer">
                            <HiUsers style={iconStyles} />
                            <Link className="navigationButtons" to="/bakery-portal/customers">CUSTOMERS</Link>
                        </div>

                        <div className="iconAndButtonContainer">
                            <GiShoppingBag style={iconStyles} />
                            <Link className="navigationButtons" to="/bakery-portal/products">PRODUCTS</Link>
                        </div>

                        <div className="iconAndButtonContainer">
                            <AiFillDiff style={iconStyles} />
                            <Link className="navigationButtons" to="/bakery-portal/product-variants">PRODUCT VARIANTS</Link>
                        </div>

                        <div className="iconAndButtonContainer">
                            <TbDiscount2 style={iconStyles} />
                            <Link className="navigationButtons" to="/bakery-portal/discounts">DISCOUNTS</Link>
                        </div>

                        <div className="iconAndButtonContainer">
                            <MdReviews style={iconStyles} />
                            <Link className="navigationButtons" to="/bakery-portal/reviews">REVIEWS</Link>
                        </div>

                    </IconContext.Provider>

                </div>

            </div>

            <div className="bakeryPortalPagesContainer">
                <Routes>
                    <Route path="/" element={
                        <BakeryDashboard/>
                    } />

                </Routes>

            </div>
        </div>
    );
}
export default BakerHome;