import React, { useState, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TopNavbar from "../../components/Navbar/topNavbar";
import Breadcrumb from '../../components/breadcrumb';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import '../dashboard.css';
import '../inventory.css';
import '../../components/breadcrum.css';
import './newproduct.css';
import '../../components/theme_color.css';

const NewProduct = () => {
  const navigate = useNavigate();

  const { authTokens } = useContext(AuthContext);
  const [productName, setProductName] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [backOrder, setBackOrder] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [retailPrice, setRetailPrice] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSaveAndPublish = async () => {
    console.log('Form Data:', {
      productName,
      productQuantity,
      category,
      backOrder,
      costPrice,
      retailPrice,
      unitPrice,
      description,
    });
  
    try {
      setLoading(true);
  
      const response = await fetch('https://api.hjhomelab.com/api/Add_Product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`, // Use access token here
        },
        body: JSON.stringify({
          product_name: productName,
          in_stock_total: productQuantity,
          category,
          back_order: backOrder === 'true' ? true : false,
          cost_price: costPrice,
          retail_price: retailPrice,
          unit_price: unitPrice,
          description,
          publish_status: true,
        }),
      });
  
      console.log('Response:', response);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      setSuccessMessage('Product added successfully!');
      // Clear input fields on success
      setProductName('');
      setProductQuantity('');
      setCategory('');
      setBackOrder('');
      setCostPrice('');
      setRetailPrice('');
      setUnitPrice('');
      setDescription('');
      // Redirect to a different route on success
       // Delay navigation by 2 seconds (adjust as needed)
      setTimeout(() => {
        navigate('/inventory');
      }, 2000);
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
    console.log('Request Payload:', JSON.stringify({
      product_name: productName,
      in_stock_total: productQuantity,
      category,
      back_order: backOrder,
      cost_price: costPrice,
      retail_price: retailPrice,
      unit_price: unitPrice,
      description,
      publish_status: true,
    }));



  };

  return (
    <>
      
      <TopNavbar />
      <div className="app_body">
      <Navbar />
      <div className="dashboardBody">
        <div className="breadcrumBody">
          <Breadcrumb className="breadcrumDiv" />
        </div>

        <div className="main_new_product">
          <div className="newproduct_button">
            <div className="addproduct_button">
              <button className="add_product" onClick={handleSaveAndPublish}>
                Submit
              </button>
            </div>
          </div>

          <div className="new_product_form_left shadowBox">
            <div className="product_form_2_columns">
              <div className="product_input">
                <p>Product Name</p>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
              </div>

              <div className="product_input">
                <p>Quantity</p>
                <input type="text" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} />
              </div>
            </div>

            <div className="product_form_2_columns">
              <div className="product_input">
                <p>Category</p>
                
                <input type="category" value={category} onChange={(e) => setCategory(e.target.value)} />
               
              </div>

              <div className="product_input">
                <p>Back Order</p>
                <div className="custom-select ">
                  <select name="order type" value={backOrder} onChange={(e) => setBackOrder(e.target.value)}>
                    <option value="" disabled hidden defaultValue>
                      Select an Option
                    </option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="product_form_2_columns">
              <div className="product_input">
                <p>Unit Price</p>
                <input type="text" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} />
              </div>

              <div className="product_input">
                <p>Retail Price</p>
                <input type="text" value={retailPrice} onChange={(e) => setRetailPrice(e.target.value)} />
              </div>

              

            </div>

           
            <div className="product_form_2_columns">
              <div className="product_input calendar">
                <p>Description</p>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
            </div>

            <div className='display_message'>
                {successMessage && 
                (<div className="success-message" >
                  {successMessage}
                </div>
                )}
                {errorMessage && 
                (<div className="error-message">
                  {errorMessage}
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

export default NewProduct;
