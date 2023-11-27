import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return null;
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {user ? (
                <p onClick={logoutUser}>Logout</p>
            ) : (
                <Link to="/login" >Login</Link>
            )}
            {user && <p>Hello {user.username}!</p>}
            <p onClick={logoutUser}>Logout</p>
        </div>
    )
}

export default Header