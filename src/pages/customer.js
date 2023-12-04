import React, { useState, useEffect,useContext } from "react";
import AuthContext from '../context/AuthContext';
import fetchData from "../utils/FetchData";
import { Link } from "react-router-dom";

import { PiUserSquareDuotone } from "react-icons/pi";
import "./dashboard.css";
import "./customer.css";
import "./order.css";
import "./inventory";
import '../components/breadcrum.css';
import Navbar from '../components/Navbar/Navbar';
import TopNavbar from "../components/Navbar/topNavbar";

// import addnewproduct from '../pages/subpages/newinventory_form';
import Breadcrumb from '../components/breadcrumb';



const Customer = () => {
  const { user, authTokens } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
    
        const customerData = await fetchData('https://api.hjhomelab.com/api/GetCustomerDetails', authTokens);
        setCustomerData(customerData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [authTokens]);

  const filteredCustomers = customerData.filter((customer) => {
    const customerName = customer?.name?.toLowerCase() || '';
    const customerId = customer?.customer_id?.toLowerCase() || '';
    const query = searchQuery.toLowerCase();
    return customerName.includes(query) || customerId.includes(query);
  });

    return (
        <>
       
        <TopNavbar />
        <div className="app_body">
        <Navbar />
        <div className="dashboardBody">
        {/* breadcrumb   */}
        <div className="breadcrumBody">
          <Breadcrumb className="breadcrumDiv" />
        </div>

        {/* main customer page */}
        <div className="mainCustomer">
          <div>
            <input
              type="search"
              placeholder="Enter customer name or ID"
              className="search_customer"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

          {filteredCustomers.map((customer) => (
            <div key={customer.customer_id} className="customer_name_link">
              <Link to={`/customer/${customer.name}`}>

                <div className="customer_profile">
                  <div className="customer_avatar">
                    <PiUserSquareDuotone className="customer_avatar_icon" />
                    <p className="customer_name">{customer.name}</p>
                  </div>
                  {/* <div className="active_status">{customer.active_status}</div> */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
</div>
        </>
    );
};
 
export default Customer;