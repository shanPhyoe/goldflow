import React, { useState } from 'react';

import Transaction from '../transaction/transaction.component';
import IconButton from '../iconbutton/iconbutton.component';

import './transaction-popup.styles.scss';

const TransactionPopup = () => {
    const [transactionShown, setTransactionShown] = useState(false);

    return (
        <div
            className={`transaction-popup ${
                transactionShown ? 'transaction-popup--active' : ''
            }`}
        >
            <div className="transaction-popup__button">
                <IconButton
                    onClick={() => setTransactionShown(!transactionShown)}
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
                <Transaction />
            </div>
        </div>
    );
};

export default TransactionPopup;
