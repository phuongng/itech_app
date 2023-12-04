import React, { useContext }from "react";
import { Nav, NavLink, NavMenu, NavBtnLink, } from './NavbarElements';
import "./navbar.css";

import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineInventory2 } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineCustomerService } from "react-icons/ai";
import AuthContext from '../../context/AuthContext';


  const Navbar = () => { 
    let { user, logoutUser } = useContext(AuthContext)
    //console.log('Decoded JWT:', jwtDecode(localStorage.getItem('authTokens')));
    //console.log('User State:', user);
    return ( 
      <>
      <div className="sideNavbar"> 
        <Nav> 
          <NavMenu className="navMenu">    
          {/* top_SideNav */}
          <div className="top_SideNav">
            <NavLink className="navLink" to="/dashboard" activeStyle>              
              <MdOutlineDashboard  className="sidenavIcon"/>                      
            <div className="navText">Dashboard</div>                     
            </NavLink>
            
            <NavLink className="navLink" to="/inventory" activeStyle>
              <MdOutlineInventory2 className="sidenavIcon"/> 
              <div className="navText"> Inventory</div>
  
            </NavLink>
            <NavLink className="navLink" to="/orders" activeStyle>
              <MdOutlineShoppingCart className="sidenavIcon"/> 
              <div className="navText"> Orders</div>
              
            </NavLink>
            <NavLink className="navLink" to="/customer" activeStyle>
            <AiOutlineUser className="sidenavIcon"/> 
            <div className="navText"> Customer</div>
            
            </NavLink>
            {/* <NavLink className="navLink" to="/report" activeStyle>
              <MdOutlineAnalytics className="sidenavIcon"/> 
              <div className="navText"> Report</div>
            </NavLink>   */}
            </div>
            {/* bottomSideNav */}
            <div className="bottom_SideNav">          
            {/* <NavLink className="navNoLink settings" to="/customer" activeStyle>
                <MdOutlineSettings className="sidenavIcon"/>
                <div className="navText"> Settings</div>                    
            </NavLink> */}
            <NavLink className="navNoLink" to="/help" activeStyle>
                <AiOutlineCustomerService className="sidenavIcon"/> 
                <div className="navText"> Help</div>                       
            </NavLink>                                            
            <NavBtnLink className="navNoLink" to="/login" activeStyle>              
              <AiOutlineLogout className="sidenavIcon"/> 
              <div className="navText" onClick={logoutUser}>Logout</div>                   
            </NavBtnLink>    
            </div> 

          </NavMenu>
        </Nav>
        </div>
      {/* <div className="topNavbar">
        <div className="logo">
        <img src={logo} className="navbarImage"/>
        </div>
        <div className="topNavLeft"> 
        <input type="search" placeholder="Search.." name="search" id="seach" className="searchbar"/> 
        </div>
        <div className="topNavRight">
        <div >
         <p className="name">{user ? user.username : 'Guest'}</p>     
          </div>
          <div >
            <MdOutlineNotificationsNone className="topnavIcon" />
          </div>
          <div >
          <RxAvatar className="topnavIcon"/>
          </div>
        </div>
      </div> */}
        </>
    );
};
 
export default Navbar;