import React, { useState, useContext } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Breadcrumb from '../../components/breadcrumb';
import { useNavigate } from 'react-router-dom'; // Updated import
import AuthContext from '../../context/AuthContext';
import '../dashboard.css';
import '../inventory.css';
import '../../components/breadcrum.css';
import './newproduct.css';
import '../../components/theme_color.css';

const NewProduct = () => {
 const navigate = useNavigate(); // Updated hook

 const { authTokens } = useContext(AuthContext);
 const [productName, setProductName] = useState('');
 const [productQuantity, setProductQuantity] = useState('');
 const [category, setCategory] = useState('');
 const [backOrder, setBackOrder] = useState('');
 const [costPrice, setCostPrice] = useState('');
 const [retailPrice, setRetailPrice] = useState('');
 const [description, setDescription] = useState('');
 const [loading, setLoading] = useState(false);
 const [successMessage, setSuccessMessage] = useState('');
 const [errorMessage, setErrorMessage] = useState('');

 const handleSaveAndPublish = async () => {
    // Basic client-side validation
    if (!productName || !productQuantity || !category || !backOrder || !costPrice || !retailPrice || !description) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const formData = {
      product_name: productName,
      in_stock_total: productQuantity,
      category,
      back_order: backOrder,
      cost_price: costPrice,
      retail_price: retailPrice,
      description,
    };

    try {
      setLoading(true);

      const response = await fetch('https://api.hjhomelab.com/api/Add_Product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens}`,
        },
        body: JSON.stringify(formData),
      });

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
      setDescription('');
      // Redirect to a different route on success
      navigate('/inventory');
    } catch (error) {
      console.error('Error adding product:', error);
      setErrorMessage('Failed to add product. Please try again.');
    } finally {
      setLoading(false);
    }
 };

 return (
    <>
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
            {/* Input fields and logic for form */}

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
                <div className="custom-select">
                  <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="none" defaultValue disabled hidden className="custom-option">
                      Select an Option
                    </option>
                    <option value="Phone">Phone</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Laptop">Laptop</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="product_input ">
                <p>Back Order</p>
                <div className="custom-select ">
                  <select name="order type" value={backOrder} onChange={(e) => setBackOrder(e.target.value)}>
                    <option value="none" selected disabled hidden>
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
                <p>Cost Price</p>
                <input type="text" value={costPrice} onChange={(e) => setCostPrice(e.target.value)} />
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
            {/* Display success or error message */}
            {successMessage && <div className="success-message" style={{ color: 'green' }}>{successMessage}</div>}
            {errorMessage && <div className="error-message" style={{ color: 'red' }}>{errorMessage}</div>}
          </div>
        </div>
      </div>
    </>
 );
};

export default NewProduct;