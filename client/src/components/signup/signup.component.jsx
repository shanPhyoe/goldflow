import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import {
    clearUserErrorMessage,
    signUpStart,
} from '../../redux/user/user.action';

import FormInput from '../form-elements/form-input.component';
import FormPassword from '../form-elements/form-password.component';
import CustomButton from '../custombutton/custombutton.component';
import LogoBox from '../logobox/logobox.component';

import '../../App.scss';

const Signup = ({
    toggleModal,
    signUp,
    clearUserErrorMessage,
    userErrorMessage,
}) => {
    const [userCredentials, setUserCredentials] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { name, email, password } = userCredentials;

    useEffect(() => {
        clearUserErrorMessage();
    }, [clearUserErrorMessage]);

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        signUp(name, email, password);
    };

    return (
        <motion.div
            key="signup"
            className="signup"
            initial={{
                x: '100vw',
            }}
            animate={{
                opacity: 1,
                x: '0',
                transition: {
                    delay: 0.5,
                    type: 'spring',
                    stiffness: 100,
                },
            }}
            exit={{
                x: '-100vw',
                transition: {
                    type: 'easeIn',
                },
            }}
        >
            <LogoBox />
            <div className="signup__content">
                <h2 className="signup__heading signup__heading--main">
                    Create Account
                </h2>
                <h4 className="signup__heading signup__heading--sub">
                    Visualize your gold flow from today
                </h4>
                <form className="signup__form" onSubmit={handleSubmit}>
                    <FormInput
                        name="name"
                        label="Name"
                        type="text"
                        value={name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="ex. John Doe"
                    />
                    <FormInput
                        name="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                        placeholder="ex. john@example.com"
                    />
                    <FormPassword
                        name="password"
                        label="Password"
                        value={password}
                        onChange={handleChange}
                        required
                        placeholder="••••••••"
                    />
                    <span className="signup__error">{userErrorMessage}</span>
                    <div className="signup__button">
                        <CustomButton>Create Account</CustomButton>
                    </div>
                    <p>
                        Already have an account? Log in{' '}
                        <span onClick={toggleModal}>here</span>.
                    </p>
                </form>
            </div>
        </motion.div>
    );
};

const mapStateToProps = state => ({
    userErrorMessage: state.user.userError,
});

const mapDispatchToProps = dispatch => ({
    signUp: (name, email, password) =>
        dispatch(signUpStart({ name, email, password })),
    clearUserErrorMessage: () => dispatch(clearUserErrorMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
