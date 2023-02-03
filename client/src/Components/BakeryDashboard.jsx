import React from "react";


function BakeryDashboard() {
    return (
        <div className="bakeryDashboardContainer">

            <h1 className="bakeryDashboardPageTitle">DASHBOARD</h1>

            <div className="bakeryDashboardStatisticsContainer">

                <div className="bakeryDashboardStatistic">
                    <h3 className="statisticTitle">TOTAL CUSTOMERS</h3>
                    <p className="statisticValue">{25}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                    <h3 className="statisticTitle">TOTAL ORDERS</h3>
                    <p className="statisticValue">{425}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                    <h3 className="statisticTitle">TOTAL PRODUCTS</h3>
                    <p className="statisticValue">{9}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                    <h3 className="statisticTitle">TOTAL REVIEWS</h3>
                    <p className="statisticValue">{135}</p>
                </div>

            </div>
        </div>
    );
}
export default BakeryDashboard