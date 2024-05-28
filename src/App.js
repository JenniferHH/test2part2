
import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Navbar from './Navbar'; 
import Transaction from './Transaction'; 
import Welcomepage from './Welcomepage';
import Footer from './Footer';
import Signup from './signup';
import Login from './Login'; 

const App = () => { 
  const [accountNumber, setAccountNumber] = useState('123456789'); 
  const [balance, setBalance] = useState(1000); 
  const [transactions, setTransactions] = useState([]); 

  const handleTransaction = ({ amount, type }) => { 
    const transaction = { 
      type, 
      accountNumber: Number(accountNumber), 
      amount: Number(amount), 
      timestamp: new Date().toLocaleString() 
    };
  };

  return ( 
    <Router> 
      <div> 
        <Navbar balance={balance} /> 
        <div className="container mt-4"> 
          <Routes> 
            <Route 
              path="/" element={<Welcomepage />} 
            /> 
            <Route path="/Transaction" element={<Transaction accountNumber={accountNumber} balance={balance} transactions={transactions} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes> 
        </div> 
        <Footer balance={balance} /> 
      </div> 
    </Router>
  ); 
}; 

export default App;