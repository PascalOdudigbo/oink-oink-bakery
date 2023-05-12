import React from "react";
import {BakeryCustomer, Search} from "../../Components";

function BakeryCustomers({customers, handleCustomerSearch}){
    // const customersArray = [
    //     {id: 1, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
    //     {id: 2, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
    //     {id: 3, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
    //     {id: 4, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
    //     {id: 5, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
    //     {id: 6, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
    //     {id: 7, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
    //     {id: 8, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
    //     {id: 9, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
    //     {id: 10, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
    //     {id: 11, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
    //     {id: 12, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
    //     {id: 13, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
    //     {id: 14, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
    //     {id: 15, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
    //     {id: 16, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
    //     {id: 17, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
    //     {id: 18, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
    //     {id: 19, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
    //     {id: 20, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
    //     {id: 21, email: "pascalodudigbo@gmail.com", firstName: "Pascal", lastName: "Odudigbo", totalOrders: "50", totalSpent: "150000"},
    //     {id: 22, email: "evansmwangi@gmail.com", firstName: "Evans", lastName: "Mwangi", totalOrders: "30", totalSpent: "120000"},
    //     {id: 23, email: "shalomlee@gmail.com", firstName: "Shalom", lastName: "Lee", totalOrders: "15", totalSpent: "60000"},
    //     {id: 24, email: "eunicemukiria@gmail.com", firstName: "Eunice", lastName: "Mukiria", totalOrders: "40", totalSpent: "135000"},
    //     {id: 25, email: "muthariaian@gmail.com", firstName: "Ian", lastName: "Mutharia", totalOrders: "20", totalSpent: "80000"},
    // ]

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
                    {customers.map(customer => 
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