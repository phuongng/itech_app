import React from "react";
import "../dashboard.css";
import "../inventory.css";
import '../../components/breadcrum.css';
import './newproduct.css';
import '../../components/theme_color.css';
import Navbar from '../../components/Navbar/Navbar';



import Breadcrumb from '../../components/breadcrumb';
import { Link } from "react-router-dom";

//import icons

const Product_detail = () => {
    return (
        <>
        <Navbar />
        <div className="dashboardBody">
          {/* breadcrumb   */}
            <div className="breadcrumBody">
            <Breadcrumb className="breadcrumDiv"/>
            </div>

            {/* main inventory page */}
            <div className="main_new_product">
            {/* newproduct_button */}
                <div className="newproduct_button">
                    <div className="addproduct_button">
                    
                        <Link to="/inventory/product_detail" className="add_product"> Save as Draft</Link>      
                    </div>

                    <div className="addproduct_button">
                        <Link to="/inventory/product_detail" className="add_product"> Save & Publish</Link>  
                    </div>
                </div>

            {/* new product form    */}
                <div className="new_product_form">
                    <div className="new_product_form_left shadowBox">
                        <div className="product_form_2_columns">
                            <div className="product_input">
                                <p>Product Name</p>
                                <input type="text" id="product_name"></input>
                            </div>

                            <div className="product_input">
                                <p>Quantity</p>
                                <input type="text" id="product_quantity"></input>
                            </div>
                        </div>
                    
                        <div className="product_form_2_columns">
                        <div className="product_input">
                            {/* <label for="category">Category:</label> */}
                            <p>Category</p>
                            <div className="custom-select ">
                                <select name="category">
                                <option value="none" defaultValue disabled hidden className="custom-option">Select an Option</option> 
                                <option value="iPhone">iPhone</option>
                                <option value="iPad">iPad</option>
                                <option value="Macbook">Macbook</option>
                                <option value="Accessories">Accessories</option>
                                </select>
                            </div>
                            
                        </div>

                        <div className="product_input ">
                            {/* <label for="category">Category:</label> */}
                            <p>Order Type</p>
                            <div className="custom-select ">
                            <select name="order type">
                            <option value="none" selected disabled hidden>Select an Option</option> 
                            <option value="In Store">In Store</option>
                            <option value="Delivery">Delivery</option>
                           
                            </select>
                            </div>
                        </div>

                        {/* <div className="product_input">
                        <p>Order Type</p>
                        <Select options={options} 
                        defaultValue={options[0]}
                        isSearchable={true} 
                        styles={customStyles}
                        classNamePrefix="custom-select_label"
                         />
                        </div> */}
                        </div>

                        <div className="product_form_2_columns">
                            <div className="product_input">
                            {/* price at which the owner or business acquires products from a supplier. */}
                                <p>Cost Price</p>
                                <input type="text" id="cost_price"></input>
                            </div>

                            <div className="product_input">
                                <p>Retail Price</p>
                                <input type="text" id="retail_price"></input>
                            </div>
                        </div>

                        <div className="product_input">
                            <p>Date</p>
                            <input type="date" id="date_import"></input>
                        </div>
                        

                        
                        
                        <div className="product_input short_description">
                            <p>Short Description</p>
                            <input type="text" id="short_description"></input>
                        </div>

                        <div className="product_input long_description">
                            <p>Detail Description</p>
                            <input type="text" id="long_description"></input>
                        </div>

                      
                    </div>

                    <div className="new_product_form_right shadowBox" >

                    </div>
                    
                


                </div>

            {/* new product uploading */}
                <div className="new_product_uploading">



                    
                </div>



                
                    

            </div> {/* end main inventory page */}
           

        </div>
        </>
    );
};
 
export default Product_detail;