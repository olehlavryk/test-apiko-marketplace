import React from 'react';
import T from 'prop-types';
import s from './TextInput.module.scss';

export const TextInput = ({ value, type, ...props }) => {
  return (
    <input
      type={type}
      className={s.formTextInput}
      value={value}
      {...props}
    />
  );
};

TextInput.propTypes = {
  value: T.oneOfType([T.string, T.number]),
  type: T.string,
};

TextInput.defaultProps = {
  type: 'text',
};
