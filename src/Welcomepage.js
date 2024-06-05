import React from 'react';
import Banner from './Banner.PNG';
import './welcome.css';
import { Link } from 'react-router-dom';

const Welcomepage = () => {
  return (
    <div className='body'>
      <div className='banner'>
        <img src={Banner} className="App-banner img-fluid" alt="banner"/>
      </div>
      <br></br>
      <div className="text-center"><h1 className="display-6">What can we help you?</h1></div>
        <br></br>

      <div className="row row-cols-1 row-cols-md-2 g-4">
  <div className="col shadow p-3 mb-5 bg-body-tertiary rounded" style={{marginRight: "30px", width: "23%"}}>
      <div className="card-body" onclick="location.href='/Transaction';">
        <h5 className="card-title" Link >Unlimited Tansaction</h5>
        <p className="card-text">Get unlimited transactions at a low price with the most popular account and earn the money back.</p>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  <div className="col shadow p-3 mb-5 bg-body-tertiary rounded" style={{marginRight: "30px", width: "23%"}}>
      <div className="card-body1">
        <h5 className="card-title">Shopping</h5>
        <p className="card-text">Shopping evenytime and earn the money back.</p>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  <div className="col shadow p-3 mb-5 bg-body-tertiary rounded" style={{marginRight: "30px", width: "23%"}}>
      <div className="card-body2">
        <h5 className="card-title">Online Bank</h5>
        <p className="card-text">Log in to your online bank account to earn up to cash bonus in easy steps.</p>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
  <div className="col shadow p-3 mb-5 bg-body-tertiary rounded" style={{width: "23%"}}>
      <div className="card-body3">
        <h5 className="card-title">Contact us</h5>
        <p className="card-text">We are always here for help.</p>
        <br></br>
        <br></br>
        <br></br>
      </div>
    </div>
 
</div>
    </div>
  );
};

export default Welcomepage;
