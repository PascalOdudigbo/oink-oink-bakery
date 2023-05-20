import React, {useEffect, useState} from "react";
import { Link, Route, Routes } from "react-router-dom";
import { MdDashboard, MdReviews } from 'react-icons/md';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { HiUsers } from 'react-icons/hi';
import { GiShoppingBag } from 'react-icons/gi';
import { AiFillDiff } from 'react-icons/ai';
import { TbDiscount2 } from 'react-icons/tb';
import { IconContext } from "react-icons/lib";
import { 
    BakeryDashboard, 
    BakeryCustomers, 
    BakeryProducts, 
    BakeryAddProduct, 
    Alert, 
    BakeryEditProduct, 
    BakeryProductVariants, 
    BakeryDiscounts, 
    BakeryAddDiscount, 
    BakeryEditDiscount
} from "../Components";
import axios from "axios";

function BakeryPortal({bakerData, alertDisplay, setAlertDisplay, alertStatus, setAlertStatus, 
    alertMessage, setAlertMessage, hideAlert, getProducts, products, setProducts, handleProductSearch}) {
    //styling the navbar icons
    const iconStyles = { marginRight: "10px", marginLeft: "6px", color: "black" };

    //declaring state variables for customers data
    const [customers, setCustomers] = useState();

    //declaring state variables for variantGroups data
    const [variantGroups, setVariantGroups] = useState([]);

    //declaring state variables for discounts data 
    const [discounts, setDiscounts] = useState([]);

    //declaring state variable for target product (edit/delete)
    const [targetProduct, setTargetProduct] = useState({});

    //declaring state variable for target discount (edit/delete)
    const [targetDiscount, setTargetDiscount] = useState({});
 
    //creating state variables to manage target variantGroup and variantOption data
    const [variantGroup, setVariantGroup] = useState({});
    const [variantOption, setVariantOption] = useState({});

    //creating function to get customer data
    function getCustomers(){
        axios.get("/customers")
        .then(response => {
            setCustomers(response.data)

        })
    }

    //creating function to get variant_groups 
    function getVariantGroups(){
        axios.get("/variant_groups")
        .then(response => {
            setVariantGroups(response.data)

        })
    }

    //creating function to get discounts
    function getDiscounts(){
        axios.get("/discounts")
        .then(response => {
            setDiscounts(response.data)
        })
    }

    //creating function to handle customer search
    function handleCustomerSearch(searchInput){
        if(searchInput === ""){
            getCustomers();
        }
        else{
            let filteredCustomers = customers.filter(customer => `${customer.first_name} ${customer.last_name}`.toLowerCase().includes(searchInput.toLowerCase()));
            setCustomers(filteredCustomers);
        }
    }

    //creating function to handle customer search
    function handleDiscountSearch(searchInput){
        if(searchInput === ""){
            getDiscounts();
        }
        else{
            let filteredDiscounts = discounts.filter(discount => discount?.name.toLowerCase().includes(searchInput.toLowerCase()));
            setDiscounts(filteredDiscounts);
        }
    }


    useEffect(()=>{
        getCustomers();
        getVariantGroups();
        getDiscounts();
       
    },[])

    return (
        //if customer is logged in display the full page
        bakerData?.first_name ? 
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
                        <BakeryDashboard products={products} customers={customers}/>
                    } />

                    <Route path="/customers" element={
                        <BakeryCustomers customers={customers} handleCustomerSearch={handleCustomerSearch}/>
                    } />

                    <Route path="/products" element={
                        <BakeryProducts 
                            getProducts={getProducts}
                            setProducts={setProducts} 
                            products={products} 
                            handleProductSearch={handleProductSearch} 
                            setTargetProduct={setTargetProduct}
                            setAlertDisplay={setAlertDisplay}
                            setAlertMessage={setAlertMessage}
                            setAlertStatus={setAlertStatus}
                            hideAlert={hideAlert}
                        />
                    } />

                    <Route path="/add-product" element={
                        <BakeryAddProduct
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                            variantGroups={variantGroups}
                            discounts={discounts}
                            getProducts={getProducts}
                        />
                    } />


                    <Route path="/edit-product" element={
                        <BakeryEditProduct 
                            targetProduct={targetProduct}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                            variantGroups={variantGroups}
                            discounts={discounts}
                            getProducts={getProducts}
                            getDiscounts={getDiscounts}
                            getVariantGroups={getVariantGroups}
                        />
                    } />


                    <Route path="/product-variants/*" element={
                        <BakeryProductVariants
                            variantGroup={variantGroup}
                            setVariantGroup={setVariantGroup}
                            variantOption={variantOption}
                            setVariantOption={setVariantOption}
                            variantGroups={variantGroups}
                            setVariantGroups={setVariantGroups}
                            getVariantGroups={getVariantGroups}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                        />
                    } />


                    <Route path="/discounts" element={
                        <BakeryDiscounts
                            getDiscounts={getDiscounts}
                            discounts={discounts}
                            setDiscounts={setDiscounts}
                            handleDiscountSearch={handleDiscountSearch}
                            setTargetDiscount={setTargetDiscount}
                            setAlertDisplay={setAlertDisplay}
                            setAlertMessage={setAlertMessage}
                            setAlertStatus={setAlertStatus}
                            hideAlert={hideAlert}
                        />
                    }/>

                    <Route path="/add-discount" element={
                        <BakeryAddDiscount
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                            getDiscounts={getDiscounts}
                        />
                    } />

                    <Route path="/edit-discount" element={
                        <BakeryEditDiscount 
                            targetDiscount={targetDiscount}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                            variantGroups={variantGroups}
                            discounts={discounts}
                            getDiscounts={getDiscounts}
                        />
                    } />

                </Routes>

            </div>
        </div> : 
        //else display an empty page
        <>
            
        </>
    );
}
export default BakeryPortal;