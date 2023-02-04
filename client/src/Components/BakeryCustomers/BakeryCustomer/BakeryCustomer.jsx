import React from "react";

function BakeryCustomer({customer}) {
    return (
        <tr className="customerDataRow">
            <td className="customerDataCell">{customer.email}</td>
            <td className="customerDataCell">{customer.firstName}</td>
            <td className="customerDataCell">{customer.lastName}</td>
            <td className="customerDataCell">{customer.totalOrders}</td>
            <td className="customerDataCell">{`KSH ${customer.totalSpent}`}</td>
        </tr>
    );

}
export default BakeryCustomer;