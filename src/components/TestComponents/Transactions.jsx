// Transactions.js
import React, { useState } from 'react';
function Transactions({ transactions, addTransaction }) {
    const [newTransaction, setNewTransaction] = useState({
        type: 'expense',
        source: '',
        amount: '',
        date: '',
    });
    const handleInputChange = (e) => {
        setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        addTransaction(newTransaction);
        setNewTransaction({ type: 'expense', source: '', amount: '', date: '' }); // Clear the form
    };
    return (
        <div>
            <h2>Transactions</h2>
            <form onSubmit={handleSubmit}>
                <select name="type" value={newTransaction.type} onChange={handleInputChange}>
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                </select>
                <input
                    type="text"
                    name="source"
                    placeholder="Source"
                    value={newTransaction.source}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={newTransaction.amount}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="date"
                    name="date"
                    value={newTransaction.date}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Add Transaction</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Source</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction, index) => (
                        <tr key={index}>
                            <td>{transaction.type}</td>
                            <td>{transaction.source}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Transactions;