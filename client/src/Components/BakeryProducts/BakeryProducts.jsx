import React from 'react';
import { IconContext } from 'react-icons/lib';
import { Search, BakeryProduct } from "../../Components";
import Tooltip from '@mui/material/Tooltip';
import { RiAddFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';


function BakeryProducts({products, setProducts, handleProductSearch, setTargetProduct, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert }) {
    const iconStyles = { marginRight: "3px", marginLeft: "6px", color: "white" };

   

    return (
        <div className="bakeryProductsContainer">

            <div className='bakeryProductsTitleAndAddButtonContainer'>
                <h1 className="bakeryProductsPageTitle">PRODUCTS</h1>
                <Tooltip title="Add product" arrow>
                    <div className="iconAndButtonContainer">
                        <IconContext.Provider value={{ size: '15px' }}>
                            <RiAddFill style={iconStyles} />
                        </IconContext.Provider>
                        <Link className="addProductLink" to={"/bakery-portal/add-product"}>ADD</Link>
                    </div>
                </Tooltip>

            </div>

            <div className="tableSearchContainer">
                <Search placeholderText={"Search products..."} handleSearch={handleProductSearch}/>
            </div>
            <table className="bakeryProductsTable">
                <thead>
                    <tr className="tableHeadersContainer">
                        <th className="tableHeader">PRODUCT</th>
                        <th className="tableHeader">ORDERS</th>
                        <th className="tableHeader">SALES</th>
                        <th className="tableHeader">ACTIVE</th>
                        <th className="tableHeader">OPTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        products.map(product => 
                        <BakeryProduct 
                            key={product.id}
                            products={products} 
                            setProducts={setProducts}
                            product={product} 
                            setTargetProduct={setTargetProduct}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            hideAlert={hideAlert}
                        />
                            )
                    }
                </tbody>

            </table>

        </div>
    );

}
export default BakeryProducts;