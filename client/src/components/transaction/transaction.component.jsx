import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { addTransaction, editTransaction } from '../../redux/data/data.action';
import { setTransactionShown } from '../../redux/transactionPopup/transactionPopup.action';

import CustomButton from '../custombutton/custombutton.component';
import FormInput from '../form-elements/form-input.component';
import FormSelect from '../form-elements/form-select.component';

import './transaction.styles.scss';

const Transaction = ({
    addTransaction,
    transactionToEdit,
    editTransaction,
    setTransactionShown,
}) => {
    const [transactionData, setTransactionData] = useState({
        name: '',
        transactionType: 'Income',
        amount: '',
        date: new Date().toISOString().split('T')[0],
    });

    useEffect(() => {
        if (transactionToEdit)
            setTransactionData({
                name: transactionToEdit.name,
                transactionType: transactionToEdit.transactionType,
                amount: transactionToEdit.amount,
                date: transactionToEdit.date.split('T')[0],
            });
        else
            setTransactionData({
                name: '',
                transactionType: 'Income',
                amount: '',
                date: new Date().toISOString().split('T')[0],
            });
    }, [transactionToEdit]);

    const { name, transactionType, amount, date } = transactionData;

    const handleChange = event => {
        const { name, value } = event.target;

        setTransactionData({ ...transactionData, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        if (transactionToEdit)
            editTransaction({
                ...transactionToEdit,
                name,
                transactionType,
                date,
                amount: parseFloat(amount).toFixed(2),
            });
        else
            addTransaction({
                ...transactionData,
                amount: parseFloat(amount).toFixed(2),
            });

        setTransactionData({
            ...transactionData,
            name: '',
            amount: '',
            date: new Date().toISOString().split('T')[0],
        });
        setTransactionShown(false);
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
                    label="Details"
                    placeholder="Buy stocks"
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
                    placeholder="300"
                    required
                />
                <FormInput
                    name="date"
                    type="date"
                    value={date}
                    onChange={handleChange}
                    min="0"
                    label="Date"
                />
                <div className="transaction__button">
                    <CustomButton>
                        {transactionToEdit
                            ? 'Edit Transaction'
                            : 'Save Transaction'}
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    addTransaction: transaction => dispatch(addTransaction(transaction)),
    editTransaction: transaction => dispatch(editTransaction(transaction)),
    setTransactionShown: boolean => dispatch(setTransactionShown(boolean)),
});

export default connect(null, mapDispatchToProps)(Transaction);
