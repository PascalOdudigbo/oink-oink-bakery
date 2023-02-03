import React from "react";

function BakeryCustomer({emailAddress, firstName, lastName, totalOrders, totalSpent}) {
    return (
        <tr className="customerDataRow">
            <td className="customerDataCell">{emailAddress}</td>
            <td className="customerDataCell">{firstName}</td>
            <td className="customerDataCell">{lastName}</td>
            <td className="customerDataCell">{totalOrders}</td>
            <td className="customerDataCell">{`KSH ${totalSpent}`}</td>
        </tr>
    );

}
export default BakeryCustomer;