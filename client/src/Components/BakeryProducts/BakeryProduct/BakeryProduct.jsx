import React, { useState } from 'react';
import { IconContext } from 'react-icons/lib';
import { RxDotFilled } from 'react-icons/rx';
import { SlOptions } from 'react-icons/sl';
import { useNavigate } from 'react-router-dom';


function BakeryProduct({ product }) {
    const activeIconStyles = { marginRight: "3px", marginLeft: "6px", color: "green" };
    const notActiveIconStyles = { marginRight: "3px", marginLeft: "6px", color: "red" };
    const [dropdownDisplay, setDropdownDisplay] = useState("none");
    const navigate = useNavigate();

    return (
        <tr className="productsDataRow">

            <td className="productsDataCell">
                <div className='productImageAndNameContainer'>
                    <img className='productImage' src={product.image} alt={product.name} />
                    <p className='productName'>{product.name}</p>
                </div>
            </td>
            <td className="productsDataCell">{product.orders}</td>
            <td className="productsDataCell">KSH {product.sales}</td>
            <td className="productsDataCell">{
                product.active ?
                    <div className='productActiveIconAndText'>
                        <IconContext.Provider value={{ size: '20px' }}>
                            <RxDotFilled style={activeIconStyles} />
                        </IconContext.Provider>
                        <p className='productActive'>Active</p>
                    </div>
                    :
                    <div className='productActiveIconAndText'>
                        <IconContext.Provider value={{ size: '20px' }}>
                            <RxDotFilled style={notActiveIconStyles} />
                        </IconContext.Provider>
                        <p className='productActive'>Not active</p>
                    </div>


            }
            </td>
            <td className="productsDataCell">
                <div className="dropdown">
                    <IconContext.Provider value={{ size: '20px' }}>
                        <SlOptions onClick={() => dropdownDisplay === "block" ? setDropdownDisplay("none") : setDropdownDisplay("block")} style={{color: "black"}} />
                    </IconContext.Provider>
                    <div className="dropdown-content" style={{display: dropdownDisplay}}>
                        <p onClick={() => {
                            //set target product here
                            navigate("/bakery-portal/edit-product")
                        }}>Edit</p>
                        <p>Delete</p> 
                    </div>
                </div>
            </td>
        </tr>

    );


}
export default BakeryProduct;