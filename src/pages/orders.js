import React, { Component, Fragment, useState, useEffect,useContext } from "react";
import AuthContext from '../context/AuthContext';
import fetchData from "../utils/FletchData";
import axios from 'axios';
import "./dashboard.css";
import "./order.css";
import "./inventory";
import '../components/breadcrum.css';
import Navbar from '../components/Navbar/Navbar';
import Breadcrumb from '../components/breadcrumb';
import {LuFilter} from 'react-icons/lu';
import {TbArrowsSort} from 'react-icons/tb';
import {TbShoppingBagX, TbShoppingBag} from 'react-icons/tb';
import {BiSolidDownArrow} from "react-icons/bi";

const Order = () => {
    const { user, authTokens } = useContext(AuthContext);
    const [customerData, setCustomerData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                setLoading(true);
            
                const customerData = await fetchData('https://api.hjhomelab.com/api/AllOrderInfo', authTokens);
                setCustomerData(customerData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [authTokens]);

    const handleSort = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);

        const sortedData = [...customerData].sort((a, b) => {
            const dateA = new Date(a.order_date);
            const dateB = new Date(b.order_date);

            if (newSortOrder === "asc") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setCustomerData(sortedData);
    };

    const orderCount = customerData.length;
    const pendingOrders = customerData.filter(order => order.delivery_status === "Pending");
    const pendingOrderCount = pendingOrders.length;
    const deliveredOrders = customerData.filter(order => order.delivery_status === "Delivered");
    const deliveredOrdersCount = deliveredOrders.length;
    const canceledOrders = customerData.filter(order => order.delivery_status === "Lost");
    const canceledOrdersCount = canceledOrders.length;

    return (
        <>
        <Navbar />
        <div className="dashboardBody">
            <div className="breadcrumBody">
                <Breadcrumb className="breadcrumDiv"/>
            </div>

            <div className="mainOrder">
                <h4>Order Summary</h4>
                <div className="topOrder">
                    <div className="topOrder_1 shadowBox">
                        <div className="thisweek_order">
                            <TbShoppingBag className="shoppingcart_icons" />
                        </div>
                        <div className="allorder_detail">
                            <div className="allproduct">
                                <div>All order</div>
                                <div>{orderCount}</div>
                            </div>
                            <div className="allproduct">
                                <div>Pending</div>
                                <div>{pendingOrderCount}</div>
                            </div>
                            <div className="allproduct">
                                <div>Completed</div>
                                <div>{deliveredOrdersCount}</div>
                            </div>
                        </div>
                    </div>

                    <div className="topOrder_1 shadowBox">
                        <div className="thisweek_order">
                            <TbShoppingBagX  className="shoppingcart_icons"/>
                        </div>
                        <div className="allorder_detail">
                            <div className="allproduct">
                                <div>Canceled</div>
                                <div>{canceledOrdersCount}</div>
                            </div>
                            <div className="allproduct">
                                <div>Returned</div>
                                <div></div>
                            </div>
                            <div className="allproduct">
                                <div>Damaged</div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottomInventory">
                    <div className="inventory_summary_search">
                        <h4>Customer Orders</h4>
                        <input type="seach" className="inventory_search" placeholder="Search.."></input>
                        <div onClick={handleSort}><TbArrowsSort />Sort</div>
                        {/* <div><LuFilter />Filter</div> */}
                    </div>

                    <div>
                        <div className="inventory_detail border_bottom">
                            <div className="customer_item">
                                <div className="checkbox_produtname">
                                    <input type="checkbox" className="product_checkbox" />
                                    <p>Order ID</p>
                                </div>
                                <p>Customer Name</p>
                                <p>Order Date</p>
                                <p>Delivery Type</p>
                                <p>Tracking ID</p>
                                <p>Order Total</p>
                                <p>Delivery Status</p>
                            </div>
                        </div>

                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error.message}</p>}
                        {customerData && (
                            <div className="customer_list">
                                {customerData.map((customer) => (
                                    <div key={customer.id} className="customer_item">
                                        <div className="checkbox_produtname">
                                            <input type="checkbox" className="product_checkbox" />
                                            <p>{customer.order_id}</p>
                                        </div>
                                        <p>{customer.customer_name}</p>
                                        <p>{customer.orderdate}</p>
                                        <p>{customer.deliverytype}</p>
                                        <p>{customer.tracking_id}</p>
                                        <p>${customer.ordertotal}</p>
                                        <p>{customer.deliverystatus}</p>
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

export default Order;
