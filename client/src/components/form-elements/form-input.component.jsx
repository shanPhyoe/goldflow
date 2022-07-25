import React from 'react';

import './form-elements.styles.scss';

const FormInput = ({ onChange, label, value, ...otherProps }) => {
    return (
        <div className="form-element">
            <label className="form-element__label">{label}</label>
            <input
                onChange={onChange}
                value={value}
                {...otherProps}
                className="form-element__input"
            />
        </div>
    );
};

export default FormInput;
