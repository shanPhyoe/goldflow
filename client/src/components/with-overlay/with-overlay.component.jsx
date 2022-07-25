import React from 'react';

import './with-overlay.styles.scss';

const WithOverlay = ({ children }) => {
    return (
        <div className="overlay-container">
            <div className="overlay" />
            {children}
        </div>
    );
};

export default WithOverlay;
