import { createContext, useState } from 'react'
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [user, setUser] = useState(() => (localStorage.getItem('authTokens') ? jwtDecode(localStorage.getItem('authTokens')) : null))
    let [authTokens, setAuthTokens] = useState(() => (localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null))

    const navigate = useNavigate()

    let loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.hjhomelab.com/api/token/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: e.target.username.value,
                    password: e.target.password.value
                })
            });
    
            if (!response.ok) {
                // Check if the response status is not okay (e.g., 401 Unauthorized)
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }
    
            const data = await response.json();
    
            if (data && data.access) {
                localStorage.setItem('authTokens', JSON.stringify(data));
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                navigate('/dashboard');
            } else {
                alert('Something went wrong while logging in the user!');
            }
        } catch (error) {
            console.error('Error during login:', error.message);
            alert('Error during login. Please check your credentials and try again.');
        }
    };
    

    let logoutUser = (e) => {
        e.preventDefault()
        localStorage.removeItem('authTokens')
        setAuthTokens(null)
        setUser(null)
        navigate('/login')
    }

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}