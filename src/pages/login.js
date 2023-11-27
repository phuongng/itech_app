import React, { useState } from 'react';
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

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = () => {
    client.post(
      "api/token/login",
      {
        username: username,
        password: password
      }
    )
    .then((response) => {
      const { auth_token } = response.data;
      localStorage.setItem("token", auth_token);
      navigate("/dashboard");
    })
    .catch((error) => {
      setError("Invalid username or password");
      console.error("Login error:", error);
    });
  };

  return (
    <div className="loginBody">
      <div className="card">
        <div className="loginLeft">
          <img src={logo} className="loginImageLeft" />
          <h1>Log in</h1>
          <p>See your growth and get support</p>
          <form>
            <div className="form">
              <label>
                Username:
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </label>
            </div>
            <div className="form">
              <label>
                Password:
                <div className="password-input">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="showPasswordButton"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
              </label>
            </div>
          </form>
          <div className="beforeLogin">
            <div className="rememberMe">
              <Checkbox
                className="checkBox"
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
              <p>Remember me</p>
            </div>
            <div>
              <p>Forgot Password</p>
            </div>
          </div>
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
          <p>Not registered yet? Create an account</p>
        </div>
        <div className="loginRight">
          <img src={logo} className="loginImage" />
          <p className="introduction">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
