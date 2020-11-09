import React from 'react';
import T from 'prop-types';
import s from './Label.module.scss';

export const Label = ({ children, htmlFor, required = false }) => {
  return (
    <label htmlFor={htmlFor} className={s.formLabel}>
      {children}
      {required ? <span className={s.required_star}>*</span> : null}
    </label>
  );
};

Label.propTypes = {
  children: T.string.isRequired,
  htmlFor: T.string,
  required: T.bool,
};
