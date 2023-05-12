import React, {useEffect, useState} from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { MdDashboard, MdReviews } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { GiShoppingBag } from 'react-icons/gi';
import { AiFillDiff } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';
import { IconContext } from "react-icons/lib";
import { BakeryDashboard, BakeryCustomers, BakeryProducts, BakeryAddProduct, Alert } from "../Components";
import axios from "axios";

function BakeryPortal({bakerData, alertDisplay, setAlertDisplay, alertStatus, setAlertStatus, 
    alertMessage, setAlertMessage, hideAlert, getProducts, products, handleProductSearch}) {
    //styling the navbar icons
    const iconStyles = { marginRight: "10px", marginLeft: "6px", color: "black" };

    //declaring and initializing navigate variable function
    const navigate = useNavigate();

    //if baker isn't logged in send go back to homepage
    const length = Object.keys(bakerData).length;
    length < 1 && navigate("/");

    //declaring state variables for customers data
    const [customers, setCustomers] = useState();



    //creating function to get customer data
    function getCustomers(){
        axios.get("/customers")
        .then(response => {
            setCustomers(response.data)

        })
    }

    //creating function to handle customer search
    function handleCustomerSearch(searchInput){
        if(searchInput === ""){
            getCustomers();
        }
        else{
            let filteredCustomers = customers.filter(customer => `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(searchInput));
            setCustomers(filteredCustomers);
        }
    }

    useEffect(()=>{
        getCustomers();
       
    },[])

    return (
        <div className="bakeryPortalContainer">
            <div className="bakeryPortalAlertContainer">
                <Alert requestStatus={alertStatus} alertMessage={alertMessage} display={alertDisplay}/>
            </div>

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
                        <BakeryDashboard />
                    } />

                    <Route path="/customers" element={
                        <BakeryCustomers customers={customers} handleCustomerSearch={handleCustomerSearch}/>
                    } />

                    <Route path="/products" element={
                        <BakeryProducts getProducts={getProducts} products={products} handleProductSearch={handleProductSearch}/>
                    } />

                    <Route path="/add-product" element={
                        <BakeryAddProduct 
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                        />
                    } />

                </Routes>

            </div>
        </div>
    );
}
export default BakeryPortal;