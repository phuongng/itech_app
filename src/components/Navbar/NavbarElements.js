import { FaBars } from 'react-icons/fa'; 
import { NavLink as Link } from 'react-router-dom'; 
import styled from 'styled-components'; 

export const Nav = styled.nav` 
background: white; 
// box-shadow: 0 0 10px 1px rgba(0, 0, 0, .25);
backdrop-filter: blur(15px);
height: 100vh;
width: 200px;
position: fixed;
left: 0;
top: 0px;
padding-top: 120px;
padding-bottom: 0px;
z-index:1;

display: flex;
flex-direction: column;
justify-content: space-between;

  @media (max-width: 1024px) { 
	width: 160px;

} 

@media (max-width: 1000px) { 
	width: 150px;
} 

@media (max-width: 740px) {
	width: 130px;
} 

@media (max-width: 600px) {
	width: 110px;
} 

// @media (max-width: 530px) { 
// 	width: 80px;
// }
	@media (max-width: 550px) { 
		width: 50px;

	}

/* Third Nav */
/* justify-content: flex-start; */


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

export const Bars = styled(FaBars)` 
display: none; 
color: #26599F; 
@media (max-width: 430px) { 
	display: block; 
	position: absolute; 
	top: 0; 
	right: 0; 
	transform: translate(-100%, 75%); 
	font-size: 1.8rem; 
	cursor: pointer; 
} 
`; 

export const Bar = styled(FaBars)` 
display: none; 
color: #26599F; 
@media (max-width: 530px) { 
	display: block; 
	position: absolute; 
	top: 0; 
	right: 0; 
	transform: translate(-100%, 75%); 
	font-size: 1.8rem; 
	cursor: pointer; 
} 
`; 


export const NavMenu = styled.div` 
height: 100vh;
padding-bottom: 30px;
display: flex; 
flex-direction: column;
justify-content: space-between;
align-items: center; 
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw; 
white-space: nowrap; */
// @media screen and (max-width: 500px) { 
// 	display: none; 
// } 
`; 

export const NavBtn = styled.nav` 
display: flex; 
align-items: center; 

/* Third Nav */
/* justify-content: flex-end; 
width: 100vw; */
@media screen and (max-width: 768px) { 
	display: none; 
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
	width: 100px;
    padding: 10px 15px;
} 

@media (max-width: 600px) {
	width: 100px;
} 

@media (max-width: 550px) { 
	width: 30px;
	padding: 5px;
	justify-content: center;
	border-radius: 100%;

}


`;
