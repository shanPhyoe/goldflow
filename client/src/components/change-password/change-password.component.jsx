import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Close } from '../../assets/icons/close.svg';

import { closePopupModal } from '../../redux/popupModal/popupModal.action';
import {
    changePasswordStart,
    clearUserErrorMessage,
} from '../../redux/user/user.action';

import FormPassword from '../form-elements/form-password.component';
import CustomButton from '../custombutton/custombutton.component';
import LogoBox from '../logobox/logobox.component';

import '../../App.scss';

const ChangePassword = ({
    closeModal,
    changePassword,
    clearUserErrorMessage,
    userErrorMessage,
}) => {
    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
    });

    const { oldPassword, newPassword } = passwords;

    useEffect(() => {
        clearUserErrorMessage();
    }, [clearUserErrorMessage]);

    const handleChange = event => {
        const { name, value } = event.target;

        setPasswords({ ...passwords, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        changePassword(oldPassword, newPassword);

        setPasswords({
            oldPassword: '',
            newPassword: '',
        });
    };

    return (
        <div className="change-password">
            <LogoBox />
            <Close className="change-password__close" onClick={closeModal} />
            <div className="change-password__content">
                <h2 className="change-password__heading change-password__heading--main">
                    Change Password
                </h2>
                <h4 className="change-password__heading change-password__heading--sub">
                    Don't share your password with anyone
                </h4>
                <form className="change-password__form" onSubmit={handleSubmit}>
                    <FormPassword
                        name="oldPassword"
                        value={oldPassword}
                        onChange={handleChange}
                        required
                        label="Old Password"
                        placeholder="••••••••"
                    />
                    <FormPassword
                        name="newPassword"
                        value={newPassword}
                        onChange={handleChange}
                        required
                        label="New Password"
                        placeholder="••••••••"
                    />
                    <span className="change-password__error">
                        {userErrorMessage}
                    </span>
                    <div className="change-password__button">
                        <CustomButton>Change Password</CustomButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    userErrorMessage: state.user.userError,
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closePopupModal()),
    changePassword: (oldPassword, newPassword) =>
        dispatch(changePasswordStart({ oldPassword, newPassword })),
    clearUserErrorMessage: () => dispatch(clearUserErrorMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
