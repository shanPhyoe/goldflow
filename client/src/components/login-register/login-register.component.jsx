import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Signin from '../signin/signin.component';
import Signup from '../signup/signup.component';
import WithOverlay from '../with-overlay/with-overlay.component';

const LoginRegister = () => {
    const [toggle, setToggle] = useState('signin');

    const toggleModal = () => {
        if (toggle === 'signin') setToggle('signup');
        else setToggle('signin');
    };

    return (
        <WithOverlay>
            <AnimatePresence exitBeforeEnter={true}>
                {toggle === 'signin' ? (
                    <Signin toggleModal={toggleModal} />
                ) : null}
            </AnimatePresence>
            <AnimatePresence exitBeforeEnter={true}>
                {toggle === 'signup' ? (
                    <Signup toggleModal={toggleModal} />
                ) : null}
            </AnimatePresence>
        </WithOverlay>
    );
};

export default LoginRegister;
