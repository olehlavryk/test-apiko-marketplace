import React from 'react';
import s from './Footer.module.scss';

export const Footer = ({ children }) => {
  return (
    <footer className={s.footer}>
      <div className="container">{children}</div>
    </footer>
  );
};
