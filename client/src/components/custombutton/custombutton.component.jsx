import React from 'react';

import './custombutton.styles.scss';

const CustomButton = ({ children, isGoogleButton, onClick }) => {
    return (
        <button
            className={`button ${isGoogleButton ? 'google-button' : ''}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default CustomButton;
