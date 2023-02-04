import React from 'react';
import { IconContext } from 'react-icons/lib';
import { Search, BakeryProduct } from "../../Components";
import Tooltip from '@mui/material/Tooltip';
import { RiAddFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';


function BakeryProducts() {
    const iconStyles = { marginRight: "3px", marginLeft: "6px", color: "white" };
    const products = [
        {id: 1, name: "Chocolate Cake", image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/easy_chocolate_cake-b62f92c.jpg?quality=90&webp=true&resize=300,272", price: "$34", orders: 85, sales: 136000, active: true},
        {id: 2, name: "Vanilla Cake", image: "https://www.recipetineats.com/wp-content/uploads/2020/08/My-best-Vanilla-Cake_9.jpg?resize=650,910", price: "$34", orders: 105, sales: 168000, active: true},
        {id: 3, name: "Caramel Cake", image: "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/caramel_cake-5374396.jpg?quality=90&webp=true&resize=300,272", price: "$34", orders: 65, sales: 104000, active: false},
        {id: 4, name: "Oreo Cake", image: "https://preppykitchen.com/wp-content/uploads/2017/03/Cookies-and-Cream-Cake-3-feature.jpg", price: "$34", orders: 55, sales: 88000, active: true},
        {id: 5, name: "BlueBerry Cake", image: "https://buttermilkbysam.com/wp-content/uploads/2021/06/blueberry-cake-10.jpg",  price: "$34", orders: 115, sales: 184000, active: false}
    ]

    return (
        <div className="bakeryProductsContainer">

            <div className='bakeryProductsTitleAndAddButtonContainer'>
                <h1 className="bakeryProductsPageTitle">PRODUCTS</h1>
                <Tooltip title="Add product" arrow>
                    <div className="iconAndButtonContainer">
                        <IconContext.Provider value={{ size: '20px' }}>
                            <RiAddFill style={iconStyles} />
                        </IconContext.Provider>
                        <Link className="addProductLink" to={"/bakery-portal/add-product"}>ADD</Link>
                    </div>
                </Tooltip>

            </div>

            <div className="tableSearchContainer">
                <Search placeholderText={"Search products..."} />
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
                        products.map(product => <BakeryProduct key={product.id} product={product}/>)
                    }
                </tbody>

            </table>

        </div>
    );

}
export default BakeryProducts;