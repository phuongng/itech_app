import React, { useState, useEffect,useContext } from "react";
import AuthContext from '../context/AuthContext';
import Navbar from "../components/Navbar/Navbar";
import TopNavbar from "../components/Navbar/topNavbar";
import "./dashboard.css";
import '../components/theme_color.css';
import { Link } from "react-router-dom";
import fetchData from "../utils/FetchData";

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

// import {BiSolidUpArrow} from "react-icons/bi";
import {BiSolidDownArrow} from "react-icons/bi";
// bottom Dashboard icons
import {MdOutlineKeyboardDoubleArrowRight} from "react-icons/md";

// import { dark } from "@mui/material/styles/createPalette";
const Dashboard = () => {
    const { user, authTokens } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [packedCount, setPackedCount] = useState(0);
    const [shippedCount, setShippedCount] = useState(0);
    const [deliveredCount, setDeliveredCount] = useState(0);
    const [invoicedCount, setInvoicedCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);
    useEffect(() => {
      const fetchOrderData = async () => {
          try {
              const orders = await fetchData(
                  "https://api.hjhomelab.com/api/AllOrderInfo",
                  authTokens
              );

            // Sort orders based on order_date in descending order
            const sortedOrders = orders.sort((a, b) => new Date(b.orderdate) - new Date(a.orderdate));

            // Get the first 3 orders
            const recentOrders = sortedOrders.slice(0, 3);
            // Set state for recentOrders
            setRecentOrders(recentOrders);

              // Calculate total amount from orders
              const totalAmount = orders.reduce((acc, order) => acc + parseFloat(order.ordertotal), 0);
              setTotalAmount(totalAmount);
              
              const totalOrders = orders.length;
                setTotalOrders(totalOrders);
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
              (order) => order.paymentstatus === "Paid"
            );

            setPackedCount(packedOrders.length);
            setShippedCount(shippedOrders.length);
            setDeliveredCount(deliveredOrders.length);
            setInvoicedCount(completedPaymentOrders.length);

          } catch (error) {
              console.error("Error fetching order data:", error);
          }
      };

      fetchOrderData();
  }, [authTokens]);

  // Format total amount with two decimal places
  const formattedTotalAmount = parseFloat(totalAmount).toFixed(2);

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

// top selling
const [topSelling, settopselling] = useState([]);
useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const topSelling = await fetchData('https://api.hjhomelab.com/api/TopSelling', authTokens);

        // Get the first 3 top selling items
        const firstThreeOrders = topSelling.slice(0, 3);

        settopselling(firstThreeOrders);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSelling();
  }, []);


  return (user ? (
        <>
        <TopNavbar className="top_Navbar"/>
        <div className="app_body">
        <Navbar /> 
        {/* <div className="dashboardBody"> */}
            <div className="dashboardBody">
            {/* first row - top dashboard will include sale activity section and inventory summary section*/}
            <div className="topDashboard">
                <div className="topDashboard_content">
                {/* saleActivity*/}
                {/* <div className="saleActivity"> */}
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
                        {deliveredCount} 
                        
                        </div>
                        <p className="saleText">package</p>
                        <div className="saleIcons delivered">
                        <LiaShippingFastSolid className="saleIcon" />
                        <p className="saleText">To be Delivered</p>
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
            

            </div> {/* end topDashboard_content */}
            </div> {/* end topDashboard */}

            {/* middle row - middle dashboard*/}
            <div className="middleDashboard">  
                <div className="middleDashboard_content">

                {/* Revenue   */}
                    <div className="total Revenue shadowBox">
                        <div className="icon_vector">
                            <GiProfit className="profit_icon"/>
                            <img src={revenue_vector} className="vector"/>    
                        </div>
                        <div className="profit_number">{`$${formattedTotalAmount}`}</div>
                    
                        <div className="revenue_percentage">
                            <div><h4>Total Revenue</h4></div>    
                            {/* <div><BiSolidUpArrow className="uparrow_icon"/> 25%</div>     */}
                        </div>    
                    </div>

                {/* customer */}
                    <div className="total Customer shadowBox"> 
                    <div className="icon_vector">
                        <div> <IoIosPeople className="profit_icon"/></div>
                        <div>  <img src={customer_vector} className="vector"/></div>
                   
                  
                    </div>
                    <div className="profit_number">{totalCustomers}</div>
                    

                    <div className="revenue_percentage">
                        <div><h4>Total Customer</h4></div>
                        {/* <div><BiSolidUpArrow className="uparrow_icon"/> 25%</div> */}
                    </div>
                    
                    </div>

                {/* order */}
                    <div className="total Order shadowBox" >
                        <div className="icon_vector">
                            <LuClipboardList className="profit_icon"/>
                            <img src={order_vector} className="vector"/>
                        </div>
                    
                        <div className="profit_number">{totalOrders}</div>
                    
                        <div className="revenue_percentage">
                            <div><h4>Total Order</h4></div>
                            {/* <div><BiSolidUpArrow className="uparrow_icon"/> 25%</div> */}
                        </div>
                    </div>

                </div>
            </div>


            {/* bottom dashboard - bottom row */}
            <div className="bottomDashboard">
                <div className="bottomDashboard_content">
                <div className="inventory shadowBox">
                    <div className="inventory_viewall">
                        <div><h4>Inventory</h4></div>

                        <Link to="/orders" relative="path" className="linkDecor">
                        <div><p>view all <MdOutlineKeyboardDoubleArrowRight/> </p></div>
                        </Link>
                        
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
                        <div className="recentorder_detail" key={item.id}>
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

                    <div className="topselling_description">
                        <div>Product Name</div>
                        <div>Sold</div>
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
                  
                    <Link to="/orders" relative="path" className="linkDecor">
                    <div><p>view all <MdOutlineKeyboardDoubleArrowRight/> </p></div>
                    </Link>
                </div>

                <div>
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}

                {!loading && !error && (
                    <div>

                    {recentOrders.map((item) => (
                        <div key={item.id} className="recentorder_detail">
                            <div  className="recentOrder_customerName">
                                <p>
                                    <b>{item.customer_name}</b>
                                </p>
                                <p>Order ID: {item.order_id}</p>
                            </div>
                            <div className="recentOrder_customerName">
                                <p>{item.orderdate}</p>
                                <p
                                    className="completed_button"
                                    style={{
                                        backgroundColor:
                                        item.deliverystatus === "Pending"
                                        ? "#F8B042"
                                        : item.deliverystatus === "Lost"
                                        ? "#F8B042"
                                        : item.deliverystatus === "Delivered"
                                        ? "#26599F"
                                        : "#9ACBE6",
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
            </div>

          </div> {/* end dashboard */}
        {/* end dashboardBody */}
        </div> 
        </>):(
        <div>
            <p>You are not logged in, redirecting...</p>
        </div>
        )
    );
};
 
export default Dashboard;