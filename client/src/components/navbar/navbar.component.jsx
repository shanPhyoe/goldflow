import React from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Settings } from '../../assets/icons/setting.svg';
import { ReactComponent as Password } from '../../assets/icons/password.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';

import {
    openAccSettingModal,
    openChangePasswordModal,
} from '../../redux/popupModal/popupModal.action';
import { signOutStart } from '../../redux/user/user.action';

import './navbar.styles.scss';

const Navbar = ({
    currentUser,
    openAccSettingModal,
    openChangePasswordModal,
    signOutStart,
}) => {
    return (
        <nav className="navbar">
            <div className="navbar__group" onClick={openAccSettingModal}>
                <Settings className="navbar__icon" />
                <p className="navbar__text">Account Settings</p>
            </div>
            {!currentUser || !currentUser.googleSignin ? (
                <div
                    className="navbar__group"
                    onClick={openChangePasswordModal}
                >
                    <Password className="navbar__icon" />
                    <p className="navbar__text">Change Password</p>
                </div>
            ) : (
                <div className="navbar__group navbar__group--google">
                    <p className="navbar__text">
                        <span>G</span>
                        <span>o</span>
                        <span>o</span>
                        <span>g</span>
                        <span>l</span>
                        <span>e</span> signed in
                    </p>
                </div>
            )}
            <div className="navbar__group" onClick={signOutStart}>
                <Logout className="navbar__icon" />
                <p className="navbar__text">Logout</p>
            </div>
        </nav>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
    openAccSettingModal: () => dispatch(openAccSettingModal()),
    openChangePasswordModal: () => dispatch(openChangePasswordModal()),
    signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
