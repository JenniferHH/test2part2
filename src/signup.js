import React, { useState, useEffect } from 'react';
import './log.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [lastAccountNumber, setLastAccountNumber] = useState(4711); // Assuming initial value
  
    const url = 'https://json-storage-api.p.rapidapi.com/datalake';
    const headers = {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': '66d105c179msh9c5b82c1cf62460p15aa72jsn63c558e1dc1e',
      'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
    };
  
    useEffect(() => {
      loadUsers();
      getLastAccountNumber();
    }, []);
  
    const loadUsers = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            '@context': [
              'http://schema4i.org/Thing.jsonld',
              'http://schema4i.org/Action.jsonld',
              'http://schema4i.org/SearchAction.jsonld'
            ],
            '@type': 'SearchAction',
            Object: {
              '@context': [
                'http://schema4i.org/Thing.jsonld',
                'http://schema4i.org/Filter',
                'http://schema4i.org/DataLakeItem',
                'http://schema4i.org/UserAccount'
              ],
              '@type': 'Filter',
              FilterItem: {
                '@type': 'DataLakeItem',
                Creator: {
                  '@type': 'UserAccount',
                  Identifier: 'USERID-4711' 
                }
              }
            }
          })
        });
        const data = await response.json();
        setUsers(data.Result.ItemListElement.map(item => item.Item));
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };
  
    const getLastAccountNumber = async () => {
        try {
          const response = await fetch('https://your-api.com/last-account-number');
          const data = await response.json();
          setLastAccountNumber(data.lastAccountNumber); 
        } catch (error) {
          console.error('Error fetching last account number:', error);
        }
      };

    const handleSignup = async () => {
      try {
       
        const newAccountNumber = lastAccountNumber + users.length + 1;
  
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            '@context': [
              'http://schema4i.org/Thing.jsonld',
              'http://schema4i.org/Action.jsonld',
              'http://schema4i.org/CreateAction.jsonld'
            ],
            '@type': 'CreateAction',
            Result: {
              '@context': [
                'http://schema4i.org/DataLakeItem.jsonld',
                'http://schema4i.org/UserAccount.jsonld',
                'http://schema4i.org/OfferForPurchase.jsonld',
                'http://schema4i.org/Offer.jsonld',
                'http://schema4i.org/Organization.jsonld',
                'http://schema4i.org/PostalAddress.jsonld'
              ],
              '@type': 'DataLakeItem',
              Name: username,
              Creator: {
                '@type': 'UserAccount',
                Identifier: 'USERID-4711', 
              },
              About: {
                '@type': 'Organization',
                Email: email,
                Password: password, 
                AccountNumber: newAccountNumber 
              }
            }
          })
        });
        await response.text();
 
        setUsername('');
        setEmail('');
        setPassword('');
        setErrorMessage('');
 
        loadUsers();
      } catch (error) {
        console.error('Error signing up:', error);
        setErrorMessage('Error signing up. Please try again.');
      }
    };
 return (
  <Container fluid>
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <form onSubmit={handleSignup}>
          <div className="bg-image">
            <div className="shadow p-3 mb-5 bg-body-tertiary rounded fromtable">
              <div className="mb-3 login">
                <h4 style={{ padding: "10px" }}>Sign up</h4>
                <input className="form-control" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <br />
                <input className="form-control" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <input className="form-control" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button className="btn btn-primary themebutton" onClick={handleSignup}>Signup</button>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
              </div>
            </div>
          </div>
        </form>
      </Col>
    </Row>
  </Container>
);
};

export default Signup;
