import React, { useState, useEffect } from 'react';
import './tran.css';
import Table from 'react-bootstrap/Table';

const url = 'https://json-storage-api.p.rapidapi.com/datalake';
const headers = {
  'Content-Type': 'application/json',
  'X-RapidAPI-Key': '66d105c179msh9c5b82c1cf62460p15aa72jsn63c558e1dc1e',
  'X-RapidAPI-Host': 'json-storage-api.p.rapidapi.com'
};

const accountNumber = localStorage.getItem('accountNumber');
const accountId = 'USERID-4711'+accountNumber;


function Transaction() {
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
  
  
    const storeTransaction = async (transaction) => {
      try {
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
              Name: 'Transaction',
              Creator: {
                '@type': 'UserAccount',
                Identifier: accountId 
              },
              About: {
                '@type': 'Organization'
              },
              Amount: transaction.amount,
              Balance: transaction.balance,
              Type: transaction.type,
              SerialNumber: transaction.serial 
            }
          })
        });
  
        const data = await response.json();
        console.log(data);
       
        loadTransactions();
      } catch (error) {
        console.error('Error storing transaction:', error);
      }
    };
  
    const loadTransactions = async () => {
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
                  Identifier: accountId 
                }
              }
            }
          })
        });
  
        const data = await response.json();
        const result = data.Result.ItemListElement.map(item => item.Item);
        
        result.sort((a, b) => a.SerialNumber - b.SerialNumber);
        setTransactions(result);
        if (result.length > 0) {
          
          const latestBalance = result[result.length - 1].Balance;
          setBalance(latestBalance);
          if (latestBalance < 0) {
            setErrorMessage('Insufficient balance for withdrawal');
          } else {
            setErrorMessage('');
          }
        }
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    };
  
    const clearTransactions = async () => {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            '@context': [
              'http://schema4i.org/Thing.jsonld',
              'http://schema4i.org/Action.jsonld',
              'http://schema4i.org/DeleteAction.jsonld'
            ],
            '@type': 'DeleteAction',
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
                  Identifier: accountId
                }
              }
            }
          })
        });
  
        const data = await response.json();
        console.log(data);
        setTransactions([]);
        setBalance(0);
        setErrorMessage('');
      } catch (error) {
        console.error('Error clearing transactions:', error);
      }
    };
  
    const handleDeposit = async () => {
      const newBalance = balance + parseFloat(amount);
      await storeTransaction({ amount: parseFloat(amount), balance: newBalance, type: 'Deposit', serial: transactions.length + 1 });
      setBalance(newBalance); 
      setAmount(0); 
    };
    
    const handleWithdraw = async () => {
      if (amount > balance) {
        setErrorMessage('Insufficient balance for withdrawal');
        return;
      }
      const newBalance = balance - parseFloat(amount);
      await storeTransaction({ amount: parseFloat(amount), balance: newBalance, type: 'Withdraw', serial: transactions.length + 1 });
      setBalance(newBalance); 
      setAmount(0); 
    };
  
    return (
         
      <div className="App">
        
        <h1 >Transaction</h1>
        
    
         
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{marginRight: "50px"}}
            class="form-control" id="exampleInputEmail1"
          />
          <br></br>
           <div class="btn-group" role="group" aria-label="Basic radio toggle button group"  className='button'>
          <button onClick={handleDeposit} className="btn btn-outline-secondary" style={{marginRight: "10px"}}>Deposit</button>
          <button onClick={handleWithdraw} className="btn btn-outline-secondary" style={{marginRight: "10px"}}>Withdraw</button>
          <button onClick={loadTransactions} className="btn btn-outline-secondary" >Transaction</button>
          </div>
          <br></br>
          <h4>Current Balance: ${balance}</h4>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <table className="table table-striped">
        <thead>
        <tr>
            <th>No</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Current Balance</th>
        </tr>
        </thead>
        <tbody>
        {transactions.map((transaction, index) => (
            <tr key={index}>
                <td>{transaction.SerialNumber}</td>
                <td>{transaction.Type}</td>
                <td>${transaction.Amount}</td>
                <td>${transaction.Balance}</td>
            </tr>
            ))}
        </tbody>
        </table>
        </div>



    );
  }
  

export default Transaction;