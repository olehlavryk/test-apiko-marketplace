import React from 'react';
import T from 'prop-types';
import './Button.module.scss';

export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

Button.propTypes = {
  children: T.string.isRequired,
};
