
import { NavLink as Link } from 'react-router-dom'; 
import styled from 'styled-components'; 

export const Nav = styled.nav` 
background: white; 
overflow-y: hidden;
z-index:1;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;

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
height: 80%;
width: fit-content;
// padding-top: 70px;
display: grid; 
grid-template-rows: 2fr 1fr;
gap: 70px;
// flex-direction: column;
padding-top: 50px;
// justify-content: space-between;
align-items: center; 

white-space: nowrap; */
@media screen and (min-height: 1100px) { 
	
} 
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

@media (max-width: 700px) { 
	padding: 7px;
} 

@media (max-width: 600px) { 
	// width: 30px;
	padding: 5px;
	justify-content: center;
	border-radius: 100%;

}


`;
