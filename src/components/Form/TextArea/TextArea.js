import React from 'react';
import T from 'prop-types';
import s from './TextArea.module.scss';

export const TextArea = ({ children, ...props }) => {
  return (
    <textarea className={s.formAreaInput} {...props}>
      {children}
    </textarea>
  );
};

TextArea.propTypes = {
  children: T.string,
};

TextArea.defaultValue = {
  children: 'For example: Iron man suit',
};
