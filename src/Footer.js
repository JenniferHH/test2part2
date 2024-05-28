import React from 'react'; 
import { Link } from 'react-router-dom'; 
import facebook from './facebook.png';
import instagram from './instagram.png';
import linkedin from './linkedin.png';
import './foot.css';

const Footer = ({ balance }) => { 
    return ( 
        <footer className="shadow-sm p-3 mb-5 bg-light rounded footer"> 
            <div className="container text-center">
                <div className="row">
                    <div className="col socialmedia">
                        <a href="http://www.facebook.com" target="_blank">
                            <img src={facebook} className="facebook" alt="facebook" style={{width: "50px", marginRight: "10px"}}/>
                        </a>
                        <a href="http://www.instagram.com" target="_blank">
                            <img src={instagram} className="instagram" alt="instagram" style={{width: "50px", marginRight: "10px"}}/>
                        </a>
                        <a href="http://www.linkedin.com" target="_blank">
                            <img src={linkedin} className="linkedin" alt="linkedin" style={{width: "50px"}}/>
                        </a>
                    </div>
                </div>    
                <div className="row text">
                    <div className="col">
                        <p>© HSBC Group 2024</p>
                    </div>
                </div>
            </div>
        </footer>
    ); 
}; 

export default Footer;