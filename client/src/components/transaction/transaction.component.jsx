import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTransaction } from '../../redux/data/data.action';

import CustomButton from '../custombutton/custombutton.component';
import FormInput from '../form-elements/form-input.component';
import FormSelect from '../form-elements/form-select.component';

import './transaction.styles.scss';

const Transaction = ({ addTransaction }) => {
    const [transactionData, setTransactionData] = useState({
        name: '',
        transactionType: 'Income',
        amount: '',
        date: new Date().toISOString().split('T')[0],
    });

    const { name, transactionType, amount, date } = transactionData;

    const handleChange = event => {
        const { name, value } = event.target;

        setTransactionData({ ...transactionData, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        addTransaction({
            name,
            transactionType,
            amount: parseFloat(amount).toFixed(2),
            date,
        });

        setTransactionData({
            ...transactionData,
            name: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
        });
    };

    return (
        <div className="transaction">
            <h3 className="transaction__heading">Transaction</h3>
            <form className="transaction__form" onSubmit={handleSubmit}>
                <FormInput
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleChange}
                    label="Name"
                    placeholder="ex. Buy stocks"
                    autoComplete="off"
                    required
                />
                <FormSelect
                    name="transactionType"
                    value={transactionType}
                    onChange={handleChange}
                    label="Type"
                    options={['Income', 'Expense', 'Investment']}
                />
                <FormInput
                    name="amount"
                    type="number"
                    value={amount}
                    onChange={handleChange}
                    min="0"
                    label="Amount"
                    placeholder="ex. 15"
                    required
                />
                <FormInput
                    name="date"
                    type="date"
                    defaultValue={date}
                    onChange={handleChange}
                    min="0"
                    label="Date"
                />
                <div className="transaction__button">
                    <CustomButton>Make Transaction</CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addTransaction: transaction => dispatch(addTransaction(transaction)),
});

export default connect(null, mapDispatchToProps)(Transaction);
