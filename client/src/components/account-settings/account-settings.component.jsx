import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { ReactComponent as Close } from '../../assets/icons/close.svg';

import { closePopupModal } from '../../redux/popupModal/popupModal.action';
import {
    clearUserErrorMessage,
    updateSettingsStart,
} from '../../redux/user/user.action';

import LogoBox from '../logobox/logobox.component';
import FormInput from '../form-elements/form-input.component';
import CustomButton from '../custombutton/custombutton.component';
import ProfilePhoto from '../profile-photo/profile-photo.component.';

import '../../App.scss';

const AccountSetting = ({
    closeModal,
    currentUser,
    updateSettings,
    clearUserErrorMessage,
    userErrorMessage,
}) => {
    const [userCredentials, setUserCredentials] = useState({
        name: currentUser.name,
        email: currentUser.email,
    });

    const [file, setFile] = useState(null);

    const { name, email } = userCredentials;

    useEffect(() => {
        clearUserErrorMessage();
    }, [clearUserErrorMessage]);

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('photo', file);

        updateSettings(formData);
    };

    return (
        <div className="account-setting">
            <LogoBox />
            <Close className="account-setting__close" onClick={closeModal} />
            <div className="account-setting__content">
                <h2 className="account-setting__heading account-setting__heading--main">
                    Account Settings
                </h2>
                <h4 className="account-setting__heading account-setting__heading--sub">
                    Account details to be displayed
                </h4>
                <form className="account-setting__form" onSubmit={handleSubmit}>
                    <FormInput
                        name="name"
                        type="text"
                        value={name}
                        onChange={handleChange}
                        required
                        label="Name"
                        autoComplete="off"
                    />
                    <FormInput
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        required
                        label="Email"
                        autoComplete="off"
                    />
                    <ProfilePhoto
                        photoURL={currentUser.photoURL}
                        setFile={setFile}
                    />
                    <span className="account-setting__error">
                        {userErrorMessage}
                    </span>
                    <div className="account-setting__button">
                        <CustomButton>Save</CustomButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    userErrorMessage: state.user.userError,
});

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closePopupModal()),
    updateSettings: formData => dispatch(updateSettingsStart(formData)),
    clearUserErrorMessage: () => dispatch(clearUserErrorMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AccountSetting);
