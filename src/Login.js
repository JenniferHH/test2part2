import React, { useState, useEffect } from 'react';
import './log.css';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [users, setUsers] = useState([]);

  const url = 'https://json-storage-api.p.rapidapi.com/datalake';
  const headers = {
    'Content-Type': 'application/json',
    'X-RapidAPI-Key': '66d105c179msh9c5b82c1cf62460p15aa72jsn63c558e1dc1e',
    'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
  };

  useEffect(() => {
    loadUsers();
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

  const handleLogin = (event) => {
    event.preventDefault();
    const user = users.find(user => user.About.Email === email && user.About.Password === password);
    if (user) {
      localStorage.setItem('accountNumber', user.About.AccountNumber);
      window.location.href = '/Transaction';
    } else {
      setErrorMessage('Invalid email or password');
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <form onSubmit={handleLogin}>
            <div className="bg-image">
              <div className="shadow p-3 mb-5 bg-body-tertiary rounded fromtable">
                <div className="mb-3 login">
                  <h4 style={{ padding: "10px" }}>Welcome</h4>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input 
                      type="password" 
                      className="form-control" 
                      id="password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  <button type="submit" className="loginbutton btn btn-primary">Login</button>
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

export default Login;
