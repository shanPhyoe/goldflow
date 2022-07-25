import React from 'react';

import './iconbutton.styles.scss';

const IconButton = ({ isDisable, isSmall, onClick, children }) => {
    return (
        <button
            className={`icon-button ${isSmall ? 'small' : ''} ${
                isDisable ? 'disabled' : ''
            }`}
            onClick={onClick}
            disabled={isDisable}
        >
            {children}
        </button>
    );
};

export default IconButton;
