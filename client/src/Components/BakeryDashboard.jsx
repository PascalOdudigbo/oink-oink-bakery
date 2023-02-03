import React from "react";


function BakeryDashboard() {
    return (
        <div className="bakeryDashboardContainer">

            <div className="bakeryDashboardStatisticsContainer">

                <div className="bakeryDashboardStatistic">
                   
                    <h3 className="statisticTitle">TOTAL CUSTOMERS</h3>
                    <p className="statisticValue">{0}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                    
                        <h3 className="statisticTitle">TOTAL ORDERS</h3>
                  

                    <p className="statisticValue">{0}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                        <h3 className="statisticTitle">TOTAL PRODUCTS</h3>
                    <p className="statisticValue">{0}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                        <h3 className="statisticTitle">TOTAL REVIEWS</h3>
                    <p className="statisticValue">{0}</p>
                </div>


            </div>
        </div>
    );
}
export default BakeryDashboard