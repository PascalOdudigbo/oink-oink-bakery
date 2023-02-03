import React from "react";

function BakeryCustomer({emailAddress, firstName, lastName, totalOrders, totalSpent}) {
    return (
        <tr className="customerDataRow">
            <td>{emailAddress}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{totalOrders}</td>
            <td>{`KSH ${totalSpent}`}</td>
        </tr>
    );

}
export default BakeryCustomer;