import React, { useRef } from 'react';
import { useClickAway } from 'react-use';
import { connect } from 'react-redux';

import {
    setTransactionData,
    setTransactionShown,
} from '../../redux/transactionPopup/transactionPopup.action';

import Transaction from '../transaction/transaction.component';
import IconButton from '../iconbutton/iconbutton.component';

import './transaction-popup.styles.scss';

const TransactionPopup = ({
    transactionShown,
    setTransactionShown,
    transactionData,
    setTransactionData,
}) => {
    const ref = useRef(null);

    useClickAway(ref, () => {
        setTransactionShown(false);
    });

    return (
        <div
            ref={ref}
            className={`transaction-popup ${
                transactionShown ? 'transaction-popup--active' : ''
            }`}
        >
            <div className="transaction-popup__button">
                <IconButton
                    onClick={() => {
                        setTransactionShown(!transactionShown);
                        setTimeout(() => {
                            setTransactionData(null);
                        }, 800);
                    }}
                >
                    <span
                        className={`transaction-popup__icon ${
                            transactionShown
                                ? 'transaction-popup__icon--rotate'
                                : ''
                        }`}
                    >
                        +
                    </span>
                </IconButton>
            </div>
            <div
                className={`transaction-popup__overlay ${
                    transactionShown ? 'transaction-popup__overlay--shown' : ''
                }`}
            ></div>
            <div
                className={`transaction-popup__form ${
                    transactionShown ? 'transaction-popup__form--shown' : ''
                }`}
            >
                <Transaction transactionToEdit={transactionData} />
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    transactionShown: state.transactionPopup.showTransaction,
    transactionData: state.transactionPopup.transactionData,
});

const mapDispatchToProps = dispatch => ({
    setTransactionShown: boolean => dispatch(setTransactionShown(boolean)),
    setTransactionData: data => dispatch(setTransactionData(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPopup);
