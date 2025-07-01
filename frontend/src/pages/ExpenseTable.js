import React, { useState } from 'react';
import './ExpenseTable.css';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#27ae60', '#c0392b'];

const ExpenseTable = ({ expenses, deleteExpens }) => {
    const [showChart, setShowChart] = useState(false);

    const data = [
        { name: 'Income', value: expenses.filter(e => e.amount > 0).reduce((a, b) => a + b.amount, 0) },
        { name: 'Expense', value: expenses.filter(e => e.amount < 0).reduce((a, b) => a + Math.abs(b.amount), 0) }
    ];

    return (
        <div className="expense-table-container fade-in">
            <h2>Transactions</h2>

            <div className="expense-table-wrapper">
                <table className="expense-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense, index) => (
                            <tr key={index} className="slide-in">
                                <td>{expense.text}</td>
                                <td style={{ color: expense.amount > 0 ? '#27ae60' : '#c0392b' }}>
                                    ₹{expense.amount}
                                </td>
                                <td>
                                    <button className="delete-button" onClick={() => deleteExpens(expense._id)}>
                                        ✕
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button className="toggle-chart-btn" onClick={() => setShowChart(!showChart)}>
                {showChart ? 'Hide' : 'Show'} Chart
            </button>

            {showChart && (
                <div className="chart-section">
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={data}
                                innerRadius={50}
                                outerRadius={80}
                                dataKey="value"
                                label
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default ExpenseTable;
