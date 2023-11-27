import React from "react";
import "../dashboard.css";
import '../../components/theme_color.css';
import '../../components/breadcrum.css';
import './category.css';
import '../../components/theme_color.css';
import Navbar from '../../components/Navbar/Navbar';



import Breadcrumb from '../../components/breadcrumb';
import { Link } from "react-router-dom";

//import icons

const Category = () => {
    return (
        <>
        <Navbar />
        <div className="dashboardBody">
          {/* breadcrumb   */}
            <div className="breadcrumBody">
            <Breadcrumb className="breadcrumDiv"/>
            </div>

            {/* main category page */}
            <div className="main_category">
                {/* iphone */}
               <div className="shadowBox_no_padding">
                <div className="category_title">
                   <div><p className="">iPhone</p></div> 
                </div>

                <div className="category_iphone">
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                </div>

               </div>


               {/* ipad */}
               <div className="shadowBox_no_padding">
                <div className="category_title">
                   <p className="">iPad</p> 
                </div>

                <div className="category_iphone">
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                </div>

               </div>

               {/* macbook */}
               <div className="shadowBox_no_padding">
                <div className="category_title">
                   <p className="">Macbook</p> 
                </div>

                <div className="category_iphone">
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                </div>

               </div>

               {/* accessories */}
               <div className="shadowBox_no_padding">
                <div className="category_title">
                    <p className="">Accessories</p>
                </div>

                <div className="category_iphone">
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                    <div className="category_iphone_1"></div>
                </div>

               </div>
            </div> {/* end main inventory page */}
        </div>
        </>
    );
};
 
export default Category;