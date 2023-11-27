import './App.css';
import React from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Dashboard from './pages/dashboard';
import Inventory from './pages/inventory';
import Customer from './pages/customer';
import Orders from './pages/orders';
import Report from './pages/report';
import Chatbot from './pages/help';
import ViewCustomer from './pages/view_customer';
import NewProduct from './pages/subpages/newproduct';
import Product_detail from './pages/subpages/product_detail';
import Category from './pages/subpages/category';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
	return (
			<div className="App">
				<Router>
				<AuthProvider>
					<Header/>
						<Routes>
							<Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>} />
                			<Route path="/login" element={<LoginPage/>}/>
							<Route path="/" element={<PrivateRoute><Dashboard/></PrivateRoute>} />

							
							<Route path='/inventory' element={<PrivateRoute><Inventory/></PrivateRoute>}/>	
							<Route path='/customer' element={<PrivateRoute><Customer /></PrivateRoute>} />
							<Route path='/orders' element={<PrivateRoute><Orders /></PrivateRoute>} />
							<Route path='/report' element={<PrivateRoute><Report /></PrivateRoute>} />

							<Route path='/help' element={<PrivateRoute><Chatbot/></PrivateRoute>} />

							{/* subpages */}
							<Route path='/customer/view_customer/:customer_name' element={<PrivateRoute><ViewCustomer /></PrivateRoute>} />
							<Route path='/inventory/new_product' element={<PrivateRoute><NewProduct/></PrivateRoute>} />
							<Route path='/inventory/product_detail' element={<PrivateRoute><Product_detail/></PrivateRoute>} />
							<Route path='/inventory/category' element={<PrivateRoute><Category/></PrivateRoute>} />
						</Routes>
				</AuthProvider>
				</Router>
			</div>
	);
}

export default App;

