import React from "react";
import {BakeryCustomer, Search} from "../../Components";

function BakeryCustomers(){
    const customersArray = [
        {id: 1, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
        {id: 1, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
        {id: 1, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
        {id: 1, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
        {id: 1, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
        {id: 1, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
        {id: 1, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
        {id: 1, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
        {id: 1, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
        {id: 1, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
        {id: 1, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
        {id: 1, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
        {id: 1, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
        {id: 1, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
        {id: 1, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
        {id: 1, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
        {id: 1, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
        {id: 1, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
        {id: 1, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
        {id: 1, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
        {id: 1, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
        {id: 1, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
        {id: 1, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
        {id: 1, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
        {id: 1, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
    ]

    return(
        <div className="bakeryCustomersContainer">

            <h1 className="bakeryCustomersPageTitle">CUSTOMERS</h1>
            <div className="tableSearchContainer">
                    <Search placeholderText={"Input first name"}/>
            </div>
            <table className="bakeryCustomersTable">
                <tr className="tableHeadersContainer">
                    <th className="tableHeader">EMAIL ADDRESS</th>
                    <th className="tableHeader">FIRST NAME</th>
                    <th className="tableHeader">LAST NAME</th>
                    <th className="tableHeader">TOTAL ORDERS</th>
                    <th className="tableHeader">TOTAL SPENT</th>
                </tr>
                
                {customersArray.map(customer => 
                <BakeryCustomer 
                    key={customer.id}
                    emailAddress={customer.email}
                    firstName={customer.firstName}
                    lastName={customer.lastName}
                    totalOrders={customer.totalOrders}
                    totalSpent={customer.totalSpent}
                />)}
               

            </table>

        </div>
    )

}
export default BakeryCustomers;