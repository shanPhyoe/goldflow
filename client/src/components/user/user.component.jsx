import React from 'react';
import { connect } from 'react-redux';

import defaultUserPhoto from '../../assets/img/default-user.jpg';

import './user.styles.scss';

const User = ({ currentUser }) => {
    return (
        <div className="user">
            <div className="user__photo-container">
                <img
                    src={
                        currentUser
                            ? currentUser.photoURL.startsWith('https')
                                ? currentUser.photoURL
                                : `/img/users/${currentUser.photoURL}`
                            : defaultUserPhoto
                    }
                    alt="user"
                    referrerPolicy="no-referrer"
                    className="user__photo"
                />
            </div>
            <div className="user__data-container">
                <p className="user__name">
                    {currentUser ? currentUser.name : 'John Doe'}
                </p>
                <p className="user__email">
                    {currentUser ? currentUser.email : 'johndoe@example.com'}
                </p>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(User);
