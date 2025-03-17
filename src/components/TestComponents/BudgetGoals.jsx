
// BudgetGoals.js
import React, { useState } from 'react';

function BudgetGoals() {
    const [budgetGoals, setBudgetGoals] = useState([]);
    const [newGoal, setNewGoal] = useState({ category: '', amount: '' });

    const handleInputChange = (e) => {
        setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
    };

    const addGoal = () => {
        setBudgetGoals([...budgetGoals, newGoal]);
        setNewGoal({ category: '', amount: '' });
    };

    return (
        <div>
            <h2>Budget Goals</h2>
            <table>
                {/* Display budget goals in a table */}
            </table>
            <div>
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newGoal.category}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={newGoal.amount}
                    onChange={handleInputChange}
                />
                <button onClick={addGoal}>Add</button>
            </div>
        </div>
    );
}

export default BudgetGoals;