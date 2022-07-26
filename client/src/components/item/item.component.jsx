import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';

import { deleteTransaction } from '../../redux/data/data.action';
import {
    setTransactionData,
    setTransactionShown,
} from '../../redux/transactionPopup/transactionPopup.action';

import './item.styles.scss';

const Item = ({
    transaction,
    deleteTransaction,
    setTransactionShown,
    setTransactionData,
}) => {
    const { name, date, amount, transactionType } = transaction;
    return (
        <div
            className={`item ${
                transactionType === 'Investment' ? 'investment' : ''
            } ${transactionType === 'Income' ? 'income' : ''}`}
        >
            <div className="item__name">{name}</div>
            <div className="item__date">
                {new Date(date).toDateString().slice(4)}
            </div>
            <div className="item__amount">${amount}</div>
            <div className="item__controls">
                <Edit
                    className="item__icon item__icon--edit"
                    onClick={() => {
                        setTransactionShown(true);
                        setTransactionData(transaction);
                    }}
                />
                <Delete
                    className="item__icon"
                    onClick={() => deleteTransaction(transaction)}
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    deleteTransaction: transaction => dispatch(deleteTransaction(transaction)),
    setTransactionShown: boolean => dispatch(setTransactionShown(boolean)),
    setTransactionData: data => dispatch(setTransactionData(data)),
});

export default connect(null, mapDispatchToProps)(Item);
