import React, { useContext }from "react";
import "./navbar.css";
import "./topNavbar.css";
import logo from '../../image/logo.png';
import { RxAvatar } from "react-icons/rx";
import { MdOutlineNotificationsNone } from "react-icons/md";

import AuthContext from '../../context/AuthContext'



  const TopNavbar = () => { 
    let { user, logoutUser } = useContext(AuthContext)
   
    return ( 
      <>
     
      <div className="topNavbar">
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
      </div>
        </>
    );
};
 
export default TopNavbar;