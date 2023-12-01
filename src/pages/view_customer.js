import React, { Component, Fragment, useState, useEffect,useContext } from "react";
import AuthContext from '../context/AuthContext';
import fetchData from "../utils/FetchData";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./dashboard.css";
import "./customer.css";
import "./order.css";

import '../components/breadcrum.css';
import Navbar from '../components/Navbar/Navbar';

// import addnewproduct from '../pages/subpages/newinventory_form';
import Breadcrumb from '../components/breadcrumb';

//import icons
import {LuFilter} from 'react-icons/lu';
import {TbArrowsSort} from 'react-icons/tb';

import {PiUserSquareDuotone} from 'react-icons/pi';

const ViewCustomer = () => {
  
    
    const { name } = useParams();
    const { authTokens } = useContext(AuthContext);
    const [customerData, setCustomerData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                setLoading(true);
                // Log the name to check its value
            
                const fetchCustomerData = await fetchData(
                    `https://api.hjhomelab.com/api/GetCustomerDetails?name=${name}`,
                    authTokens
                );

                setCustomerData(fetchCustomerData[0]);
                

            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [name, authTokens]);

   const [orderData, setOrderData] = useState([]);
   useEffect(() => {
    const fetchOrderData = async () => {
        try {
            setLoading(true);
        
            const orderData = await fetchData(`https://api.hjhomelab.com/api/AllOrderInfo?name=${name}`, authTokens);
            setOrderData(orderData);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    fetchOrderData();
}, [name, authTokens]);
    
 


    // Calculate counts and total spending
  const pendingOrders = orderData.filter(order => order.delivery_status === "Pending");
  const completedOrders = orderData.filter(order => order.delivery_status === "Completed");
  const canceledOrders = orderData.filter(order => order.delivery_status === "Canceled");
  const returnedOrders = orderData.filter(order => order.delivery_status === "Returned");
  const damagedOrders = orderData.filter(order => order.delivery_status === "Damaged");

  const totalPendingOrders = pendingOrders.length;
  const totalCompletedOrders = completedOrders.length;
  const totalCanceledOrders = canceledOrders.length;
  const totalReturnedOrders = returnedOrders.length;
  const totalDamagedOrders = damagedOrders.length;

  const totalSpending = orderData.reduce((total, order) => total + parseFloat(order.order_total), 0);
  const spendingRatePercentage = (totalSpending / 6000) * 100;

    return (
        <>
            <Navbar />
            <div className="dashboardBody">
                {/* breadcrumb   */}
                <div className="breadcrumBody">
                    <Breadcrumb className="breadcrumDiv" customerName={name} />
                </div>

                {/* main inventory page */}
                <div className="mainOrder">
                    {/* <div> <input type="search" 
                    placeholder="Enter customer name or ID"
                     className="search_customer">
                        </input>
                    </div> */}

                    <div className="topOrder">
                        {/* topOrder first box */}
                        <div className="topCustomer_1 shadowBox">
                            <div className="view-customer-container" >
                                {loading && <p>Loading...</p>}
                                {error && <p>Error: {error.message}</p>}
                                {!loading && !error && (
                                    <>
                                        <div className="customer_profile">
                                            <div className="customer_avatar">
                                                <PiUserSquareDuotone className="customer_avatar_icon" />
                                                <p className="customer_name">{customerData.name}</p>
                                            </div>
                                            <div className="active_status">{customerData.active_status}</div>
                                        </div>

                                        <div className="customer_info">
                                            <div>
                                                <p>Phone Number</p>
                                                <p><b>{customerData.phone_number}</b></p>
                                            </div>

                                            <div>
                                                <p>Email</p>
                                                <p><b>{customerData.email}</b></p>
                                            </div>

                                            <div>
                                                <p>Address</p>
                                               
                                                <p>
                                                    <b>{customerData.street_address}<br />
                                                    {customerData.city}, {customerData.state} {customerData.zip_code}
                                                    </b>
                                                </p>
                                            </div>

                                            <div>
                                                <p>Date of Birth</p>
                                                <p><b>{customerData.dob}</b></p>
                                            </div>

                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* topOrder 2nd box */}
                        <div className="topOrder_2 shadowBox">
                            <p>Spending Rate</p>
                            

                            <div className="spendingrate_bar">
                                <div className="spent_rate" style={{ width: `${spendingRatePercentage}%`, backgroundColor: getSpendingRateColor(spendingRatePercentage) }}>
                                <div className="spent_money">${totalSpending.toFixed(2)}</div>
                                </div>
                            </div>

                         
                            {/* customer_spending_history */}
                            <div className="customer_spending_history">
                                <div className="allproduct">
                                    <div>All order</div>
                                    <div>{orderData.length}</div>
                                </div>

                                <div className="allproduct">
                                    <div>Pending</div>
                                    <div>{totalPendingOrders}</div>
                                </div>
                                <div className="allproduct">
                                    <div>Completed</div>
                                    <div>{totalCompletedOrders}</div>

                                </div>
                                <div className="allproduct">
                                    <div>Canceled</div>
                                    <div>{totalCanceledOrders}</div>
                                </div>
                                <div className="allproduct">
                                    <div>Returned</div>
                                    <div>{totalReturnedOrders}</div>
                                </div>
                                <div className="allproduct">
                                    <div>Damaged</div>
                                    <div>{totalDamagedOrders}</div>
                                </div>
                            </div>
                            {/* end customer_spending_history */}

                        </div>

                    </div>


                    <div className="bottomInventory">
                        <div className="inventory_summary_search">
                            <h4>Order History</h4>
                            <input type="search" className="inventory_search" placeholder="Search.."></input>
                            <div> <LuFilter />Filter</div>
                            <div><TbArrowsSort />Sort</div>
                        </div>

                        {/* inventory_detail name */}
                        <div>
                        <div className="inventory_detail border_bottom">
                            <div className="customer_item">
                            <div className="checkbox_produtname">
                            <input type="checkbox" className="product_checkbox" />
                            <p>Order ID</p>
                            
                            </div>
                            <p>Order Date</p>
                            <p>Tracking ID</p>
                            <p>Order Total</p>
                            <p>Payment Status</p>
                            <p>Delivery Type</p>
                            <p>Delivery Status</p>
                            </div>
                        
                        </div>

                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        {customerData && (
                            <div className="customer_list">
                            {orderData.map((order) => (
                                <div key={order.id} className="customer_item">
                                <div className="checkbox_produtname">
                                    <input type="checkbox" className="product_checkbox" />
                                    <p>{order.order_id}</p>
                                </div>
                                
                                <p>{order.orderdate}</p>
                                <p>{order.tracking_id}</p>
                                <p>${order.ordertotal}</p>
                                <p>{order.paymentstatus}</p>
                                <p>{order.deliverytype}</p>
                                <p>{order.deliverystatus}</p>
                                </div>
                            ))}
                            </div>
                        )}
                        </div>

                    </div>

                </div>

            </div>
        </>
    );
};

   // Define a function to determine the color based on the spending rate
   const getSpendingRateColor = (percentage) => {
    if (percentage >= 75) {
        return '#26599F'; // or any color you prefer
    } else if (percentage >= 50) {
        return "#9ACBE6";
    } else {
        return '#F8B042';
    }
    };

export default ViewCustomer;
