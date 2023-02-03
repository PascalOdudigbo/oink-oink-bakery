import React from "react";

function BakeryCustomers(){
    return(
        <div className="bakeryCustomerContainer">
            <table className="bakeryCustomerTable">
                <tr className="tableHeadersContainer">
                    <th className="tableHeader">EMAIL ADDRESS</th>
                    <th className="tableHeader">FIRST NAME</th>
                    <th className="tableHeader">LAST NAME</th>
                    <th className="tableHeader">TOTAL ORDERS</th>
                    <th className="tableHeader">TOTAL SPENT</th>
                </tr>
                <tr>
                    {/* {map through data here} */}
                </tr>

            </table>

        </div>
    )

}
export default BakeryCustomers;