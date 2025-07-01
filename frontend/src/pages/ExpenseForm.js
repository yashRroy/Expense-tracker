import React, { useState } from 'react';
import { handleError } from '../utils';
import './ExpenseForm.css';

function ExpenseForm({ addTransaction }) {
    const [expenseInfo, setExpenseInfo] = useState({
        amount: '',
        text: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpenseInfo(prev => ({ ...prev, [name]: value }));
    };

    const addExpenses = (e) => {
        e.preventDefault();
        const { amount, text } = expenseInfo;

        if (!amount || !text) {
            handleError('Please add Expense Details');
            return;
        }

        // Optional: Force amount to number
        const num = parseFloat(amount);
        if (isNaN(num) || num === 0) {
            handleError('Amount must be a non-zero number');
            return;
        }

        addTransaction({ amount: +num, text: text.trim() });
        setExpenseInfo({ amount: '', text: '' });
    };

    return (
        <div className="expense-form-container fade-in">
            <h2>Add New Transaction</h2>
            <form onSubmit={addExpenses}>
                <div className="form-group">
                    <label htmlFor='text'>Detail</label>
                    <input
                        onChange={handleChange}
                        type='text'
                        name='text'
                        placeholder='e.g. Grocery shopping'
                        value={expenseInfo.text}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor='amount'>Amount</label>
                    <input
                        onChange={handleChange}
                        type='number'
                        name='amount'
                        placeholder='e.g. -250 (expense), 500 (income)'
                        value={expenseInfo.amount}
                    />
                </div>
                <button type='submit' className="submit-btn">Add Transaction</button>
            </form>
        </div>
    );
}

export default ExpenseForm;
