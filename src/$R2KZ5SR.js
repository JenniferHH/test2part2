// ParentComponent.js
import React from 'react';
import TransactionForm from './TransactionForm';

const ParentComponent = () => {
    const handleSubmit = (transactionData) => {
        // Handle form submission logic here
        console.log("Transaction data submitted:", transactionData);
    };

    return (
        <div>
            <TransactionForm type="deposit" onSubmit={handleSubmit} />
        </div>
    );
};

export default ParentComponent;
