import React, {useState, useEffect,useContext } from "react";
import AuthContext from '../context/AuthContext';
import fetchData from "../utils/FetchData";

import "./dashboard.css";
import "./inventory.css";
import '../components/breadcrum.css';
import Navbar from '../components/Navbar/Navbar';
import TopNavbar from "../components/Navbar/topNavbar";


// import addnewproduct from '../pages/subpages/newinventory_form';
import Breadcrumb from '../components/breadcrumb';
import { Link } from "react-router-dom";

//import icons
import {RiFileList3Line} from 'react-icons/ri';
import {TbArrowsSort} from 'react-icons/tb';

const Inventory = () => {

    const { authTokens } = useContext(AuthContext);
    const [inventoryData, setInventoryData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending
   
  
    useEffect(() => {
      const fetchInventoryData = async () => {
        try {
            setLoading(true);
        
            const inventoryData = await fetchData('https://api.hjhomelab.com/api/Add_Product', authTokens);
          setInventoryData(inventoryData);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchInventoryData();
    }, [authTokens]);

    const handleSort = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
    
        const sortedData = [...inventoryData].sort((a, b) => {
            const quantityA = a.in_stock_total;
            const quantityB = b.in_stock_total;
    
            if (newSortOrder === "asc") {
                return quantityA - quantityB; // Sort in ascending order
            } else {
                return quantityB - quantityA; // Sort in descending order
            }
        });
    
        setInventoryData(sortedData);
    };
    

    const inStockQuantity = inventoryData.reduce((total, item) => total + item.in_stock_total, 0);
    const lowStockCount = inventoryData.reduce((count, item) => {
        return item.in_stock_total <= 10 ? count + 1 : count;
      }, 0);
    return (
        <>
     
        <TopNavbar />
        <div className="app_body">
        <Navbar />
        <div className="dashboardBody">
          {/* breadcrumb   */}
            <div className="breadcrumBody">
            <Breadcrumb className="breadcrumDiv"/>
            </div>

            {/* main inventory page */}
            <div className="mainInventory">
                <div className="addproduct_button">
                    <Link to="/inventory/new_product" className="add_product"> + Add New Product</Link>    
                </div>

                {/* <div className="addproduct_button">
                 
                    <Link to="/inventory/product_detail" className="add_product" > Product Detail</Link> 
                </div> */}

                <div className="topInventory">
                    <div className="topleftInventory">
                    {/* Product Summary */}
                            <div className="topleftInventory-productsummary">
                            <div className="productsummary_icon">
                            <RiFileList3Line className="boxlist_icon"/>
                            <h4>Product Summary</h4>
                            </div>
                            {/* <div  className="productsummary_viewall">
                                <p>view all <MdOutlineKeyboardDoubleArrowRight/> </p>
                                </div> */}
                        
                            </div>

                        {/* Product Summary detail */}
                        <div className="allproduct_detail">
                            <div className="allproduct">
                                <div>All Products</div>
                                <div className="">
                                    <p>{inStockQuantity}</p></div>
                            </div>

                            <div className="allproduct">
                                <div>Number of low stock products:</div>
                                <div>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error: {error.message}</p>}
                                <p> {lowStockCount}</p>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                    {/* category */}
                    
                    
                </div>
                
                <div className="bottomInventory">
                   <div className="inventory_summary_search">
                    <h4>Inventory Summary</h4>
                    <input type="seach" className="inventory_search" placeholder="Search.."></input>
                    {/* <div> <LuFilter />Filter</div> */}
                    <div onClick={handleSort}><TbArrowsSort />Sort by Quantity</div>
                   </div>

                   {/* inventory_detai */}
                   <div>
                    <div>
                        <div className='inventory_item inventory_item_title'>
                        {/* <div className="checkbox_produtname">
                        <input type="checkbox" className="product_checkbox" />
                        <p>Product ID</p>
                        </div> */}
                        <p>Product ID</p>
                        <p>Product Name</p>
                        <p>Category</p>
                        <p>Unit Price</p>
                        <p>Retail Price</p>
                        <p>In Stock Quantity</p>
                        {/* <p>Publish Status</p> */}


                        </div>
                        
                    </div>

                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {inventoryData && (
                        <div>
                        {inventoryData.map((item) => (
                            <div key={item.id} className="inventory_item ">
                            {/* <div className="checkbox_produtname">
                                <input type="checkbox" className="product_checkbox" />
                                <p>{item.product_id}</p>
                            </div> */}

                            <p>{item.product_id}</p>
                            <p>{item.product_name}</p>
                            <p>{item.category}</p>
                            <p>{item.unit_price}</p>
                            <p>{item.retail_price}</p>
                            <p>{item.in_stock_total}</p>
                            
                            </div>
                        ))}
                        </div>
                    )}
                    </div>


                   


                   
                   
                </div>

            </div>
           

        </div>
        </div>

        </>
    );
};
 
export default Inventory;