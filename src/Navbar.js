import React from 'react'; 
import { Link } from 'react-router-dom'; 
import logo from './logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap'; 
import './nav.css';

const CustomNavbar = ({ balance }) => { 
    return ( 
        <Navbar bg="light" expand="lg" fixed="top"> 
            <div className="container" > 
                <Navbar.Brand href="#">
                    <img src={logo} className="App-logo" alt="HSBC Bank Canada"  />
                </Navbar.Brand>
                <ul className="nav justify-content-end">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/Login">Transactions</Nav.Link>
                    <Nav.Link as={Link} to="/signup">Sign up</Nav.Link>
                    <Nav.Link as={Link} to="/Login">Log in</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </ul>
            </div>  
        </Navbar> 
    ); 
}; 

export default CustomNavbar;
