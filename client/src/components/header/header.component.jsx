import React from 'react';
import { connect } from 'react-redux';

import './header.styles.scss';

const Header = ({ currentUser }) => {
    return (
        <header className="header">
            <div className="header__main">
                <h2 className="header__main--title">Welcome to GoldFlow</h2>
                <p className="header__main--text">
                    Save more money with conscious spending!
                </p>
            </div>
            <p className="header__sub">
                Hello <span>{currentUser ? currentUser.name : 'John Doe'}</span>
                , welcome back!
            </p>
        </header>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
