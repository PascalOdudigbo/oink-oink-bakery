import React from 'react';
import { IconContext } from 'react-icons/lib';
import { Search } from "../../Components";
import Tooltip from '@mui/material/Tooltip';


function BakeryProducts() {
    const iconStyles = { marginRight: "10px", marginLeft: "6px", color: "black" };

    return (
        <div className="bakeryCustomersContainer">

            <div className='bakeryCustomersTitleAndAddButtonContainer'>
                <h1 className="bakeryCustomersPageTitle">PRODUCTS</h1>
                <Tooltip title="Add product" arrow>
                    <button className="btn-addProduct" onClick={() => { }}>
                        <IconContext.Provider value={{ size: '20px' }}>
                            <MdAddShoppingCart style={iconStyles} />
                        </IconContext.Provider>
                        ADD
                    </button>
                </Tooltip>

            </div>

            <div className="tableSearchContainer">
                <Search placeholderText={"Search products..."} />
            </div>
            <table className="bakeryCustomersTable">
                <tr className="tableHeadersContainer">
                    <th className="tableHeader">PRODUCT</th>
                    <th className="tableHeader">ORDERS</th>
                    <th className="tableHeader">SALES</th>
                    <th className="tableHeader">ACTIVE</th>
                    <th className="tableHeader">OPTIONS</th>
                </tr>

                {/* map through BakeryProduct component here*/}


            </table>

        </div>
    );

}
export default BakeryProducts;