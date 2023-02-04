import React from 'react';
import { IconContext } from 'react-icons/lib';
import {RxDotFilled} from 'react-icons/rx';
// import { Tooltip } from '@mui/material';


function BakeryProduct({ product }) {
    const activeIconStyles = { marginRight: "3px", marginLeft: "6px", color: "green" };
    const notActiveIconStyles = { marginRight: "3px", marginLeft: "6px", color: "red" };

    return (
        <tr className="productsDataRow">

            <td className="productsDataCell">
                <div className='productImageAndNameContainer'>
                    <img className='productImage' src={product.image} alt={product.name}/>
                    <p className='productName'>{product.name}</p>
                </div>
            </td>
            <td className="productsDataCell">{product.orders}</td>
            <td className="productsDataCell">{product.sales}</td>
            <td className="productsDataCell">{
                product.active ? 
                <div className='productActiveIconAndText'>
                    <IconContext.Provider value={{ size: '20px' }}>
                        <RxDotFilled style={activeIconStyles} />
                    </IconContext.Provider>
                    <p className='productActive'>{product.active}</p>
                </div> 
                : 
                <div className='productActiveIconAndText'>
                    <IconContext.Provider value={{ size: '20px' }}>
                        <RxDotFilled style={notActiveIconStyles} />
                    </IconContext.Provider>
                    <p className='productActive'>{product.active}</p>
                </div>


            }
            </td>
            <td className="productsDataCell">
                <div>
                    {/* <Tooltip title="options" arrow>

                    </Tooltip> */}
                </div>
            </td>
        </tr>

    );


}
export default BakeryProduct;