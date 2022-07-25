import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';

import {
    clearUserErrorMessage,
    googleSignInStart,
    signInStart,
} from '../../redux/user/user.action';

import CustomButton from '../custombutton/custombutton.component';
import FormInput from '../form-elements/form-input.component';
import FormPassword from '../form-elements/form-password.component';
import LogoBox from '../logobox/logobox.component';

import '../../App.scss';

const Signin = ({
    toggleModal,
    googleSignIn,
    signIn,
    userErrorMessage,
    clearUserErrorMessage,
}) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
    });

    const { email, password } = userCredentials;

    useEffect(() => {
        clearUserErrorMessage();
    }, [clearUserErrorMessage]);

    const handleChange = event => {
        const { name, value } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    const handleSubmit = event => {
        event.preventDefault();

        signIn(email, password);

        setUserCredentials({
            email: '',
            password: '',
        });
    };

    return (
        <motion.div
            key="signin"
            className="signin"
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
            <div className="signin__content">
                <h2 className="signin__heading signin__heading--main">
                    Welcome Back
                </h2>
                <h4 className="signin__heading signin__heading--sub">
                    Make unconscious things conscious
                </h4>
                <form className="signin__form" onSubmit={handleSubmit}>
                    <FormInput
                        name="email"
                        type="email"
                        value={email}
                        onChange={handleChange}
                        required
                        label="Email"
                        autoComplete="off"
                        placeholder="ex. john@example.com"
                    />
                    <FormPassword
                        name="password"
                        value={password}
                        onChange={handleChange}
                        required
                        label="Password"
                        placeholder="••••••••"
                    />
                    <span className="signin__error">{userErrorMessage}</span>
                    <div className="signin__button" onClick={handleSubmit}>
                        <CustomButton>Sign In</CustomButton>
                    </div>
                    <p>Or sign in with</p>
                    <div className="signin__button" onClick={googleSignIn}>
                        <CustomButton isGoogleButton={true}>
                            <span>G</span>
                            <span>o</span>
                            <span>o</span>
                            <span>g</span>
                            <span>l</span>
                            <span>e</span>
                        </CustomButton>
                    </div>
                    <p>
                        Don't have an account? Sign up{' '}
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
    googleSignIn: () => dispatch(googleSignInStart()),
    signIn: (email, password) => dispatch(signInStart({ email, password })),
    clearUserErrorMessage: () => dispatch(clearUserErrorMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
