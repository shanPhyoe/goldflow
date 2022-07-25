import React, { useState } from 'react';
import { ReactComponent as Hide } from '../../assets/icons/hide.svg';
import { ReactComponent as Show } from '../../assets/icons/show.svg';

import './form-elements.styles.scss';

// dont expect to include type in "otherProps" for togglePassword functionality
const FormPassword = ({ label, onChange, ...otherProps }) => {
    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="form-element">
            <label className="form-element__label">{label}</label>
            <div className="form-element__input-container">
                <input
                    type={passwordShown ? 'text' : 'password'}
                    onChange={onChange}
                    {...otherProps}
                    className="form-element__input form-element__input--password"
                />
                {passwordShown ? (
                    <Hide
                        className="form-element__icon"
                        onClick={togglePassword}
                    />
                ) : (
                    <Show
                        className="form-element__icon"
                        onClick={togglePassword}
                    />
                )}
            </div>
        </div>
    );
};

export default FormPassword;
