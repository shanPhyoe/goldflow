import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Delete } from '../../assets/icons/delete.svg';

import { deleteTransaction } from '../../redux/data/data.action';

import './item.styles.scss';

const Item = ({ transaction, deleteTransaction }) => {
    const { name, date, amount, transactionType } = transaction;
    return (
        <div
            className={`item ${
                transactionType === 'Investment' ? 'investment' : ''
            } ${transactionType === 'Income' ? 'income' : ''}`}
        >
            <div className="item__name">{name}</div>
            <div className="item__date">{new Date(date).toDateString()}</div>
            <div className="item__amount">${amount}</div>
            <div className="item__controls">
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
});

export default connect(null, mapDispatchToProps)(Item);
