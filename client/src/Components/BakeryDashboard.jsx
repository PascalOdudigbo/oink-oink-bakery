import React from "react";


function BakeryDashboard() {
    return (
        <div className="bakeryDashboardContainer">

            <div className="bakeryDashboardStatisticsContainer">

                <div className="bakeryDashboardStatistic">
                    <div className="statisticTitleContainer">
                        <h3 className="statisticTitle">TOTAL CUSTOMERS</h3>
                    </div>

                    <p>{0}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                    <div className="statisticTitleContainer">
                        <h3 className="statisticTitle">TOTAL ORDERS</h3>
                    </div>

                    <p>{0}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                    <div className="statisticTitleContainer">
                        <h3 className="statisticTitle">TOTAL PRODUCTS</h3>
                    </div>
                    <p>{0}</p>
                </div>

                <div className="bakeryDashboardStatistic">
                    <div className="statisticTitleContainer">
                        <h3 className="statisticTitle">TOTAL REVIEWS</h3>
                    </div>
                    <p>{0}</p>
                </div>


            </div>
        </div>
    );
}
export default BakeryDashboard