
import { NavLink as Link } from 'react-router-dom'; 
import styled from 'styled-components'; 

export const Nav = styled.nav` 
background: white; 
overflow-y: hidden;
z-index:1;
display: flex;
flex-direction: column;
justify-content: space-between;

`; 

export const NavLink = styled(Link)` 
display: flex; 
align-items: center;  
text-decoration: none; 
cursor: pointer; 

&.active { 
	color: #fff; 
	background: #26599F; 
	box-shadow:  0 2px 4px  rgba(187, 187, 187, 0.7) ;
} 
`; 


export const NavMenu = styled.div` 
height: 100vh;
padding-top: 70px;
display: flex; 
flex-direction: column;
justify-content: space-between;
align-items: center; 

white-space: nowrap; */
// @media screen and (max-width: 500px) { 
// 	display: none; 
// } 
`; 


export const NavBtnLink = styled(Link)` 
display: flex;
algin-items: center;
border-radius: 25px; 
background: none; 
padding: 10px 22px; 
text-align: left;
color: 26599F; 
outline: none; 
border: none; 
cursor: pointer; 
transition: all 0.2s ease-in-out; 
text-decoration: none; 
/* Second Nav */
 
&:hover { 
	transition: all 0.2s ease-in-out; 
	background: #fff; 
	color: #26599F; 
} 

@media (max-width: 1024px) { 
    padding: 12px;
} 

@media (max-width: 550px) { 
	// width: 30px;
	padding: 5px;
	justify-content: center;
	border-radius: 100%;

}


`;
