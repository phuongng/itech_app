import React, { Component, Fragment, useState, useEffect,useContext } from "react";
import AuthContext from '../context/AuthContext';
import fetchData from "../utils/FetchData";
import "./dashboard.css";
import "./order.css";
import "./inventory";
import '../components/breadcrum.css';
import Navbar from '../components/Navbar/Navbar';
import TopNavbar from "../components/Navbar/topNavbar";
import Breadcrumb from '../components/breadcrumb';
import {LuFilter} from 'react-icons/lu';
import {TbArrowsSort} from 'react-icons/tb';
import {TbShoppingBagX, TbShoppingBag} from 'react-icons/tb';
import {BiSolidDownArrow} from "react-icons/bi";

const Order = () => {
    const { user, authTokens } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" for ascending, "desc" for descending

    useEffect(() => {
        const fetchrderData = async () => {
            try {
                setLoading(true);
            
                const rderData = await fetchData('https://api.hjhomelab.com/api/AllOrderInfo', authTokens);
                setOrderData(rderData);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchrderData();
    }, [authTokens]);

    const handleSort = () => {
        const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);

        const sortedData = [...orderData].sort((a, b) => {
            const dateA = new Date(a.orderdate);
            const dateB = new Date(b.orderdate);

            if (newSortOrder === "asc") {
                return dateA - dateB;
            } else {
                return dateB - dateA;
            }
        });

        setOrderData(sortedData);
    };

    const orderCount = orderData.length;
    const pendingOrders = orderData.filter(order => order.deliverystatus === "Pending");
    const pendingOrderCount = pendingOrders.length;
    const deliveredOrders = orderData.filter(order => order.deliverystatus === "Delivered");
    const deliveredOrdersCount = deliveredOrders.length;
    const canceledOrders = orderData.filter(order => order.deliverystatus === "Lost");
    const canceledOrdersCount = canceledOrders.length;
    const damamgedOrders = orderData.filter(order => order.deliverystatus === "Damaged");
    const damamgedOrdersCount = damamgedOrders.length;
    const returnedOrders = orderData.filter(order => order.deliverystatus === "Returned");
    const returnedOrdersCount = returnedOrders.length;


    return (
        <>
        <TopNavbar />

        <div className="app_body">
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
                                <div>{returnedOrdersCount}</div>
                            </div>
                            <div className="allproduct">
                                <div>Damaged</div>
                                <div>{damamgedOrdersCount}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottomInventory">
                    <div className="inventory_summary_search">
                        <h4>Customer Orders</h4>
                        <input type="seach" className="inventory_search" placeholder="Search.."></input>
                        <div onClick={handleSort}><TbArrowsSort />Sort by Date</div>
                        {/* <div><LuFilter />Filter</div> */}
                    </div>

                    <div>
                        <div className="inventory_detail border_bottom">
                            <div className="customer_item">
                                {/* <div className="checkbox_produtname">
                                    <input type="checkbox" className="product_checkbox" />
                                    <p>Order ID</p>
                                </div> */}

                                <p>Order ID</p>
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
                        {orderData && (
                            <div className="customer_list">
                                {orderData.map((order) => {
                                const [datePart, timePart] = order.orderdate.split("T"); // Fix: Extract date and time here
                                return(
                                    <div key={order.id} className="customer_item">
                                    {/* <div className="checkbox_produtname">
                                        <input type="checkbox" className="product_checkbox" />
                                        <p>{order.order_id}</p>
                                    </div> */}
                                    <p>{order.order_id}</p>
                                    <p className="center_text">{order.customer_name}</p>
                                    <p>{datePart} {timePart}</p>
                                    <p>{order.deliverytype}</p>
                                    <p>{order.tracking_id}</p>
                                    <p>${order.ordertotal}</p>
                                    <p>{order.deliverystatus}</p>
                                </div>
                                );
                                })}
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

export default Order;
