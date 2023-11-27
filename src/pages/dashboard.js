import React, { Component, Fragment, useState, useEffect,useContext } from "react";
import AuthContext from '../context/AuthContext';
import Navbar from "../components/Navbar/Navbar";
import "./dashboard.css";
import '../components/theme_color.css';
import axios from 'axios';
import fetchData from "../utils/FletchData";

// top Dashboard icons
import {LuPackageOpen} from "react-icons/lu";
import {LuPackageCheck} from "react-icons/lu";
import { LiaShippingFastSolid} from "react-icons/lia";
import {AiOutlineDollarCircle} from "react-icons/ai";

// Middle Dashboard Icons
import {GiProfit} from "react-icons/gi";
// import {GiExpense} from "react-icons/gi";
import {IoIosPeople} from "react-icons/io";
import {LuClipboardList} from "react-icons/lu";

import revenue_vector from '../image/revenue_vector.svg';
// import expense_vector from '../image/expense_vector.svg';
import customer_vector from '../image/customer_vector.svg';
import order_vector from '../image/order_vector.svg';

import {BiSolidUpArrow} from "react-icons/bi";

// bottom Dashboard icons
import {MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";
import {BiSolidDownArrow} from "react-icons/bi";
// import { dark } from "@mui/material/styles/createPalette";
const Dashboard = () => {
    const { user, authTokens } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [packedCount, setPackedCount] = useState(0);
    const [shippedCount, setShippedCount] = useState(0);
    const [deliveredCount, setDeliveredCount] = useState(0);
    const [invoicedCount, setInvoicedCount] = useState(0);

    useEffect(() => {
        const fetchOrderData = async () => {
          try {
            const response = await axios.get(
              "https://api.hjhomelab.com/api/AllOrderInfo"
            );
    
            const orders = response.data;
    
            // Count orders based on different statuses
            const packedOrders = orders.filter(
              (order) => order.deliverystatus === "Pending"
            );
            const shippedOrders = orders.filter(
              (order) => order.deliverystatus === "Shipped"
            );
            const deliveredOrders = orders.filter(
              (order) => order.deliverystatus === "Delivered"
            );
            const completedPaymentOrders = orders.filter(
              (order) => order.payment_status === "Completed"
            );
    
            setPackedCount(packedOrders.length);
            setShippedCount(shippedOrders.length);
            setDeliveredCount(deliveredOrders.length);
            setInvoicedCount(completedPaymentOrders.length);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchOrderData();
      }, []);


    //   middle Dashboard
      
    const [totalCustomers, setTotalCustomers] = useState(0);
    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                setLoading(true);

                // Adjust the API endpoint to match your actual endpoint for customer data
                const customersData = await fetchData("https://api.hjhomelab.com/api/GetCustomerDetails", authTokens);

                // Assuming the data contains information about customers
                const totalCustomers = customersData.length;

                setTotalCustomers(totalCustomers);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [authTokens]);


      const [orderCount, setOrderCount] = useState(0);
      useEffect(() => {
        const fetchOrderData = async () => {
          try {
            setLoading(true);
        
            const OrderData = await fetchData("https://api.hjhomelab.com/api/TotalOrders", authTokens);

            // Count total order
            setOrderCount(OrderData);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchOrderData();
      }, []);

      const [totalRevenue, setTotalRevenue] = useState(0);
      useEffect(() => {
        const fetchOrderData = async () => {
          try {
            const response = await axios.get(
              "https://my-json-server.typicode.com/phuongng/itech_customer_order_data/customer_order"
            );
    
            // Extract order_total values and calculate the total revenue
            const orderData = response.data;
            const total = orderData.reduce((acc, order) => acc + order.order_total, 0);
              
            // Round the total to two decimal places
            const roundedTotal = total.toFixed(2);

            setTotalRevenue(roundedTotal);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchOrderData();
      }, []);



// bottom Dashboard

const [totalStockQuantity, setTotalStockQuantity] = useState(0);
const [lowStockItems, setLowStockItems] = useState([]);
useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const inventoryData = await fetchData("https://api.hjhomelab.com/api/Add_Product",authTokens);

        // Extract in_stock_quantity values and calculate the total stock quantity
        const total = inventoryData.reduce(
          (acc, item) => acc + item.in_stock_total,
          0
        );

        // Filter items with quantity less than or equal to 10
        const lowStockItems = inventoryData.filter(
          (item) => item.in_stock_total <= 10
        );

        const lowstockitemcount = inventoryData.filter(
          (item) => item.in_stock_total <= 10
        );

        setTotalStockQuantity(total);
        setLowStockItems(lowstockitemcount);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

// recent order

const [recentOrders, setRecentOrders] = useState([]);
useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const recentOrders = await fetchData('https://api.hjhomelab.com/api/RecentlySold', authTokens);

        // Sort orders based on order_date in descending order
        const sortedOrders = recentOrders.sort(
          (a, b) => new Date(b.order_date) - new Date(a.order_date)
        );

        // Get the first 3 recently ordered items
        const firstThreeOrders = sortedOrders.slice(0, 3);

        setRecentOrders(firstThreeOrders);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);




// Top Selling

const [topSelling, settopselling] = useState([]);
useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const topSelling = await fetchData('https://api.hjhomelab.com/api/TopSelling', authTokens);

        // Get the first 3 top selling items
        const firstThreeOrders = topSelling.slice(0, 4);

        settopselling(firstThreeOrders);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []);




  //Pending delivery

const [ItemsInShipping, setOrdersShipping] = useState(0);
useEffect(() => {
  const fetchCustomerData = async () => {
    try {
      setLoading(true);

      const shipping = await fetchData("https://api.hjhomelab.com/api/OrdersInShipping", authTokens);
      // Assuming the data contains information about customers
      setOrdersShipping(shipping[0].count_ordersinshipping);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  // Call the function
  fetchCustomerData();
}, []);



  return (user ? (
        <>
        <Navbar />
        <div className="dashboardBody">
            <div className="dashboard">
            {/* first row - top dashboard will include sale activity section and inventory summary section*/}
            <div className="topDashboard">
                <div className="topDashboard_content">
                {/* saleActivity*/}
            <div className="saleActivity">
                <div><h4 className="titletext" >Sale Activity</h4> </div>
                <div className="saleActivityBox">
                    <div className="shadowBox saleBox">
                        <div className="saleNumber">
                        {packedCount}
                        </div>
                        <p className="saleText">package</p>
                        <div className="saleIcons packed">
                        <LuPackageOpen className="saleIcon" />
                        <p className="saleText">To be Packed</p>
                        </div>
                    </div>

                    <div className="shadowBox saleBox">
                        <div className="saleNumber">
                        {shippedCount} 
                            </div>
                        <p className="saleText">package</p>
                        <div className="saleIcons shipped">
                        <LuPackageCheck className="saleIcon" />
                        <p className="saleText">To be Shipped</p>
                        </div>
                    </div>

                    <div className="shadowBox saleBox">
                        <div className="saleNumber">
                        {ItemsInShipping}
                        
                        </div>
                        <p className="saleText">package</p>
                        <div className="saleIcons delivered">
                        <LiaShippingFastSolid className="saleIcon" />
                        <p className="saleText">Orders in Transit</p>
                        </div>
                    </div>

                    <div className="shadowBox saleBox">
                        <div className="saleNumber">
                        {invoicedCount}

                        </div>
                        <p className="saleText">quantity</p>
                        <div className="saleIcons invoiced">
                        <AiOutlineDollarCircle className="saleIcon" />
                        <p className="saleText">To be Invoiced</p>
                        </div>
                    </div>
                    </div>
            </div>

            </div> {/* end topDashboard_content */}
            </div> {/* end topDashboard */}

            {/* middle row - middle dashboard*/}
            <div className="middleDashboard">  

            {/* Revenue   */}
                <div className="total Revenue shadowBox">
                    <div className="icon_vector">
                        <GiProfit className="profit_icon"/>
                        <img src={revenue_vector} className=""/>    
                    </div>

                   
                    <div className="profit_number">{`$${totalRevenue}`}</div>
                   
                    
                    <div className="revenue_percentage">
                        <div>Total Revenue</div>    
                        {/* <div><BiSolidUpArrow className="uparrow_icon"/> 25%</div>     */}
                    </div>    
                </div>



           {/* customer */}
           <div className="total Customer shadowBox"> 
                <div className="icon_vector">
                <IoIosPeople className="profit_icon"/>
                <img src={customer_vector} className=""/>
                </div>
                
               
                <div className="profit_number">{totalCustomers}</div>
                 

                <div className="revenue_percentage">
                    <div>Total Customer</div>
                    {/* <div><BiSolidUpArrow className="uparrow_icon"/> 25%</div> */}
                </div>
                  
                
                </div>


                {/* order */}
                <div className="total Order shadowBox" >
                    <div className="icon_vector">
                        <LuClipboardList className="profit_icon"/>
                        <img src={order_vector} className=""/>
                    </div>
                
                    <div className="profit_number">{orderCount}</div>

                    <div className="revenue_percentage">
                        <div>Total Order</div>
                        {/* <div><BiSolidUpArrow className="uparrow_icon"/> 25%</div> */}
                    </div>
                  
                </div>

            </div>


            {/* bottom dashboard - bottom row */}
            <div className="bottomDashboard">
                <div className="inventory shadowBox">
                    <div className="inventory_viewall">
                        <div><h4>Inventory</h4></div>
                        <div><p className="viewall">view all <MdOutlineKeyboardDoubleArrowRight/> </p></div>
                    </div>

                    <div className="instock-inventory">
                        <div className="stockText">
                            <div className="instockText"><b>Total In-stock Quantity</b></div>
                            <div className="stock_quantity">{totalStockQuantity}</div>
                        </div>
                    </div>

                    <div>
                        <div className="lowStock">This item is low on stock, please order it soon!</div>
                    </div>

                    {/* list of items low of stock */}
                    <div>
                        <div className="topselling_description">
                        <div>Product Name</div>
                        <div>Quantity</div>
                        </div>
                    
                    <div>
                        {lowStockItems.map((item) => (     
                        <div className="topselling_description" key={item.id}>
                        <p>{item.product_name}</p>
                        <p>{item.in_stock_total} </p>
                        </div>
                        ))}
                      
                    </div>  

                    </div>
                               
                </div>

                {/* topSelling */}
                <div className="topSelling shadowBox"> 
                    <div className="inventory_viewall">
                        <div><h4>Top Selling</h4></div>
                        <div><p>This month <BiSolidDownArrow/> </p></div>
                    </div>
                    <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}

                {!loading && !error && (
                    <div>
                    {/* Display the first 5 recently ordered items */}
                    {topSelling.map((item) => (
                        <div key={item.id} className="recentorder_detail">
                        <div>
                            <p style={{ float: 'left' }}>
                            
                            </p>
                            <p>{item.product_name}</p>
                        </div>
                        <div>
                            <p>{item.Sold}</p>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
    
                </div>
                
                

                {/* recentOrders */}
                <div className="recentOrders shadowBox"> 
                <div className="inventory_viewall">
                    <div><h4>Recent Orders</h4></div>
                    <div><p>view all <MdOutlineKeyboardDoubleArrowRight/> </p></div>
                </div>

                <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}

                {!loading && !error && (
                    <div>
                    {/* Display the first 3 recently ordered items */}
                    {recentOrders.map((item) => (
                        <div key={item.id} className="recentorder_detail">
                        <div>
                            <p style={{ float: 'left' }}>
                            <b>{item.name}</b>
                            </p>
                            <p>Order ID: {item.order_id}</p>
                        </div>
                        <div>
                            <p>{item.order_date}</p>
                            <p
                              className="completed_button"
                              style={{
                                backgroundColor:
                                  item.deliverystatus === "Pending"
                                    ? "#F8B042"
                                    : item.deliverystatus === "Lost"
                                    ? "#cc0000"
                                    : item.deliverystatus === "Delivered"
                                    ? "#56dc1c"  
                                    : "#26599F",
                              }}
                            >
                            {item.deliverystatus}
                            </p>
                        </div>
                        </div>
                    ))}
                    </div>
                )}
                </div>
  
                </div>
            </div>

          </div> {/* end dashboard */}
        </div> {/* end dashboardBody */}
        </>):(
        <div>
            <p>You are not logged in, redirecting...</p>
        </div>
        )
    );
};
 
export default Dashboard;