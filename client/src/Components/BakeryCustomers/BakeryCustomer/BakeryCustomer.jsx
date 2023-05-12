import React from "react";

function BakeryCustomer({customer}) {
    //defining a function to get customers total orders
    function getTotalOrders(){
        let totalOrders = 0
        customer?.carts?.forEach(cart => {
            if (cart?.active === false){
                totalOrders += 1;
            }
        });
        return totalOrders;

    }

    //defining a function to calculate total amount spent
    function getTotalAmountSpent(){
        let totalAmountSpent = 0;
        customer?.carts?.forEach(cart =>{
            if (cart?.active === false){
                totalAmountSpent += cart?.total
            }
        });
        return totalAmountSpent;
    }

    return (
        <tr className="customerDataRow">
            <td className="customerDataCell">{customer?.email}</td>
            <td className="customerDataCell">{customer?.first_name}</td>
            <td className="customerDataCell">{customer?.last_name}</td>
            <td className="customerDataCell">{getTotalOrders()}</td>
            <td className="customerDataCell">{`KSH ${getTotalAmountSpent()}`}</td>
        </tr>
    );

}
export default BakeryCustomer;