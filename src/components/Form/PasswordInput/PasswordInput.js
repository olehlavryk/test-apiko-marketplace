import React, { Fragment, useState } from 'react';
import T from 'prop-types';
import s from './PasswordInput.module.scss';
import { Icon } from '../../Icons/Icon';

export const PasswordInput = ({ value, ...props }) => {
  const [formState, setFormState] = useState({
    passwordHidden: true,
  });

  const passwordSwitch = () => {
    setFormState({ passwordHidden: !formState.passwordHidden });
  };

  return (
    <Fragment>
      <div className={s.passwordFieldWrapper}>
        <input
          type={formState.passwordHidden ? 'password' : 'text'}
          className={s.formPasswordInput}
          value={value}
          {...props}
        />
        <span className={s.showPassword}>
          <Icon name="eye" size="18px" onClick={passwordSwitch} />
        </span>
      </div>
    </Fragment>
  );
};

PasswordInput.propTypes = {
  value: T.string,
};
