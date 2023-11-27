import React from "react";
import '../components/breadcrum.css';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/breadcrumb';

import "./dashboard.css";
import "./report.css";
import "./order.css";

//import icons

const Report = () => {
    return (
        <>
        <Navbar />
        <div className="dashboardBody">
          {/* breadcrumb   */}
            <div className="breadcrumBody">
            <Breadcrumb className="breadcrumDiv"/>
            </div>

            {/* main report page */}
            <div className="mainReport">
                {/* revenue */}
               <div className="shadowBox_no_padding">
                <div className="report_revenue">
                    <p className="revenue_title">Revenue</p>
                </div>

               </div>


               {/* expense */}
               <div className="shadowBox_no_padding">
                <div className="report_revenue">
                   <p className="revenue_title">Expense</p> 
                </div>

               </div>

               {/* customer */}
               <div className="shadowBox_no_padding">
                <div className="report_revenue">
                   <p className="revenue_title">Customer</p> 
                    </div>

               </div>

               {/* order */}
               <div className="shadowBox_no_padding">
                <div className="report_revenue">
                    <p className="revenue_title">Order</p>
                    </div>

               </div>
            </div>
           

        </div>
        </>
    );
};
 
export default Report;