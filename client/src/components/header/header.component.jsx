import React from 'react';
import { connect } from 'react-redux';

import './header.styles.scss';

const Header = ({ currentUser }) => {
    return (
        <header className="header">
            <h3 className="header__main">
                <p>
                    Hello{' '}
                    <span>{currentUser ? currentUser.name : 'John Doe'}</span>
                    ,&nbsp;
                </p>
                <p>welcome back!</p>
            </h3>
        </header>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Header);
