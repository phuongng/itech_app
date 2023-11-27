import React, {useContext,useState} from 'react'
import AuthContext from '../context/AuthContext'
import axios from 'axios';
import { Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../image/logo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./login.css";


axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

const client = axios.create({
    baseURL: "http://13.59.124.138"
  });


const LoginPage = () => {

    let {loginUser} = useContext(AuthContext)



    const [checked, setChecked] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

return (
   <div className="loginBody">
      <div className="card">
            <div className="loginLeft">
                <img src={logo} className="loginImageLeft" />
                <h1>Log in</h1>
                <p>See your growth and get support</p>
                    <div className="form">
                        <form onSubmit={loginUser}>
                            <div className="form">
                                <label>
                                    Username:
                                    <input type="text" name="username" placeholder="Enter username"/>
                                    <div className="form">
                                    Password:
                                    <div className="password-input">
                                    <input type={showPassword ? "text" : "password"} name="password" placeholder="enter password"/>
                                    <button type="button" onClick={toggleShowPassword} className="showPasswordButton">
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </button>
                                    </div>
                                    <input type="submit"/>
                                    </div>     
                                </label>
                            </div>    
                        </form>
                    </div>
            </div>

                 <div className="loginRight">
                    <img src={logo} className="loginImage" />
                    <p className="introduction">
                        ITECH
                    </p>
                </div>
        
        
        
        
        </div>
    </div>

        

)
}

export default LoginPage