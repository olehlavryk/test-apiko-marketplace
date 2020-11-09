import React from 'react';
import T from 'prop-types';
import s from './Text.module.scss';

export const Text = ({ children }) => {
  return <div className={s.text}>{children}</div>;
};

Text.propTypes = {
  children: T.string.isRequired,
};
