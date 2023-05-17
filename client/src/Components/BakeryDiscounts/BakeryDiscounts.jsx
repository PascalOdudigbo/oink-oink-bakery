import React, { useEffect } from 'react';
import { IconContext } from 'react-icons/lib';
import { Search, BakeryDiscount } from "../../Components";
import Tooltip from '@mui/material/Tooltip';
import { RiAddFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';


function BakeryDiscounts({getDiscounts, discounts, setDiscounts, handleDiscountSearch, setTargetDiscount, setAlertDisplay, setAlertStatus, setAlertMessage, hideAlert }) {
    //creating icon styling variable
    const iconStyles = { marginRight: "3px", marginLeft: "6px", color: "white" };

   useEffect(()=>{
    getDiscounts();
   }, [])

    return (
        <div className="bakeryDiscountsContainer">

            <div className='bakeryDiscountsTitleAndAddButtonContainer'>
                <h1 className="bakeryDiscountsPageTitle">DISCOUNTS</h1>
                <Tooltip title="Add discount" arrow>
                    <div className="iconAndButtonContainer">
                        <IconContext.Provider value={{ size: '15px' }}>
                            <RiAddFill style={iconStyles} />
                        </IconContext.Provider>
                        <Link className="addDiscountLink" to={"/bakery-portal/add-discount"}>ADD</Link>
                    </div>
                </Tooltip>

            </div>

            <div className="tableSearchContainer">
                <Search placeholderText={"Search discounts..."} handleSearch={handleDiscountSearch}/>
            </div>
            <table className="bakeryDiscountsTable">
                <thead>
                    <tr className="tableHeadersContainer">
                        <th className="tableHeader">DISCOUNT</th>
                        <th className="tableHeader">DESCRIPTION</th>
                        <th className="tableHeader">PERCENTAGE</th>
                        <th className="tableHeader">OPTIONS</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        discounts.map(discount => 
                        <BakeryDiscount 
                            key={discount?.id}
                            discounts={discounts} 
                            setDiscounts={setDiscounts}
                            discount={discount} 
                            setTargetDiscount={setTargetDiscount}
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
export default BakeryDiscounts;