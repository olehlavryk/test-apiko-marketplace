import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './PersonLogo.module.scss';

export const PersonLogo = ({ size, avatar, fullName }) => {
  let initials = fullName.match(/\b\w/g) || [];
  initials = (
    (initials.shift() || '') + (initials.pop() || '')
  ).toUpperCase();

  const styles = {
    width: `${size}px`,
    height: `${size}px`,
    fontSize: `${size / 3}px`,
    lineHeight: `${size / 3}px`,
  };

  const content =
    avatar != null ? (
      <img
        className={s.viewer_avatar}
        src={avatar}
        alt={fullName}
        style={styles}
      />
    ) : (
      <span className={s.viewer_without_avatar} style={styles}>
        {initials}
      </span>
    );

  return <div className={s.viewer_box}>{content}</div>;
};
