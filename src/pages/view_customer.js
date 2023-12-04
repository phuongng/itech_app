import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import AuthContext from '../context/AuthContext';
import fetchData from "../utils/FetchData";
import Navbar from '../components/Navbar/Navbar';
import TopNavbar from "../components/Navbar/topNavbar";
import Breadcrumb from '../components/breadcrumb';
import { LuFilter } from 'react-icons/lu';
import { TbArrowsSort } from 'react-icons/tb';
import { PiUserSquareDuotone } from 'react-icons/pi';
import './dashboard.css';
import './customer.css';
import './order.css';
import '../components/breadcrum.css';

const ViewCustomer = () => {
    const { name } = useParams();
    const { authTokens } = useContext(AuthContext);
    const [customerData, setCustomerData] = useState({});
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                setLoading(true);

                const customerDetails = await fetchData(
                    `https://api.hjhomelab.com/api/GetCustomerDetails?name=${name}`,
                    authTokens
                );

                console.log('Fetched customer details:', customerDetails);

                if (customerDetails.length > 0) {
                    const selectedCustomer = customerDetails.find(customer => customer.name === name);

                    if (selectedCustomer) {
                        setCustomerData(selectedCustomer);

                        const orders = await fetchData(
                            `https://api.hjhomelab.com/api/AllOrderInfo?customer_id=${selectedCustomer.customer_id}`,
                            authTokens
                        );

                        setOrderData(orders);
                    } else {
                        setError(new Error('Customer not found'));
                    }
                } else {
                    setError(new Error('Customer details not available'));
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [name, authTokens]);

 

    const getSpendingRateColor = (percentage) => {
        if (percentage >= 75) {
            return { backgroundColor: '#26599F', color: 'white' };
        } else if (percentage >= 50) {
            return { backgroundColor: "#9ACBE6", color: 'black' };
        } else {
            return { backgroundColor: '#F8B042', color: 'black' };
        }
    };

    const renderCustomerInfo = () => (
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
    );

   

    const renderOrderHistorySection = () => {
          // Filtered orders used for this section
          const filteredOrders = orderData.filter(order => order.customer_id === customerData.customer_id);
          return (
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
                
                {orderData.length > 0 && (
                    <div className="customer_list">
                        {orderData
                            .filter(order => order.customer_id === customerData.customer_id)
                            .map((order) => (
                                <div key={order.order_id} className="customer_item">
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
          );
        
};
const renderSpendingRateSection = () => {
    // Filter orders based on the current customer
    const filteredOrders = orderData.filter(order => order.customer_id === customerData.customer_id);

    // Calculate counts and total spending
    const pendingOrders = filteredOrders.filter(order => order.deliverystatus === "Pending");
    const completedOrders = filteredOrders.filter(order => order.deliverystatus === "Completed");
    const canceledOrders = filteredOrders.filter(order => order.deliverystatus === "Canceled");
    const returnedOrders = filteredOrders.filter(order => order.deliverystatus === "Lost");
    const damagedOrders = filteredOrders.filter(order => order.deliverystatus === "Damaged");

    const totalPendingOrders = pendingOrders.length;
    const totalCompletedOrders = completedOrders.length;
    const totalCanceledOrders = canceledOrders.length;
    const totalReturnedOrders = returnedOrders.length;
    const totalDamagedOrders = damagedOrders.length;

    const totalSpending = filteredOrders
        .reduce((total, order) => total + parseFloat(order.ordertotal), 0);
    const spendingRatePercentage = (totalSpending / 100000) * 100;

    return (
        <div className="topOrder_2 shadowBox">
            <p>Spending Rate</p>
            <div className="spendingrate_bar">
                <div className="spent_rate" style={{ width: `${spendingRatePercentage}%`,  ...getSpendingRateColor(spendingRatePercentage) }}>
                    <div className="spent_money">${totalSpending.toFixed(2)}</div>
                </div>
            </div>

            {/* customer_spending_history */}
            <div className="customer_spending_history">
                <div className="allproduct">
                    <div>All order</div>
                    <div>{filteredOrders.length}</div>
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
    );
};

      

    return (
        <>
            <TopNavbar />
            <div className="app_body">
            <Navbar />
            <div className="dashboardBody">
                <div className="breadcrumBody">
                    <Breadcrumb className="breadcrumDiv" customerName={name} />
                </div>
                <div className="mainOrder">
                    <div className="topOrder">
                        <div className="topCustomer_1 shadowBox">
                            <div className="view-customer-container">
                                {loading && <p>Loading...</p>}
                                {error && <p>Error: {error.message}</p>}
                                {!loading && !error && renderCustomerInfo()}
                            </div>
                        </div>

                        {renderSpendingRateSection()}
                    </div>

                    {renderOrderHistorySection()}
                </div>
            </div>
            </div>
        </>
    );
};

export default ViewCustomer;
