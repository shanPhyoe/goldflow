import React from 'react';

import Logo from '../logo/logo.component';

import './logobox.styles.scss';

const LogoBox = () => {
    return (
        <div className="logo-box">
            <Logo className="logo-box__main" />
            <p className="logo-box__sub">
                Save more money with conscious spending!
            </p>
        </div>
    );
};

export default LogoBox;
