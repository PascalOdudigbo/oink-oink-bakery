import React from "react";
import {BakeryCustomer, Search} from "../../Components";

function BakeryCustomers({customers, handleCustomerSearch}){

    return(
        <div className="bakeryCustomersContainer">

            <h1 className="bakeryCustomersPageTitle">CUSTOMERS</h1>
            <div className="tableSearchContainer">
                    <Search placeholderText={"Search customers..."} handleSearch={handleCustomerSearch}/>
            </div>
            <table className="bakeryCustomersTable">
                <thead>
                    <tr className="tableHeadersContainer">
                        <th className="tableHeader">EMAIL ADDRESS</th>
                        <th className="tableHeader">FIRST NAME</th>
                        <th className="tableHeader">LAST NAME</th>
                        <th className="tableHeader">TOTAL ORDERS</th>
                        <th className="tableHeader">TOTAL SPENT</th>
                    </tr>
                </thead>
                
                <tbody>
                    {customers?.map(customer => 
                    <BakeryCustomer 
                        key={customer.id}
                        customer={customer}
                    />)}
                </tbody>
               

            </table>

        </div>
    )

}
export default BakeryCustomers;