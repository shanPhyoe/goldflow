import React from 'react';

import './form-elements.styles.scss';

const FormSelect = ({ onChange, label, options, ...otherProps }) => {
    return (
        <div className="form-element">
            <label className="form-element__label">{label}</label>
            <select
                className="form-element__input form-element__input--select"
                onChange={onChange}
                {...otherProps}
            >
                {options.map((option, idx) => {
                    return (
                        <option key={idx} value={option}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default FormSelect;
