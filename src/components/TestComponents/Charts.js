// Charts.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Example using Recharts
function Charts({ transactions }) {
    // Process transaction data for charting (example: expenses by category)
    const expenseData = transactions.filter(t => t.type === "expense").map(t => ({name: t.source, value: parseFloat(t.amount) || 0}));
    return (
        <div>
            <h2>Charts</h2>
            <BarChart width={600} height={300} data={expenseData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
        </div>
    );
}
export default Charts;