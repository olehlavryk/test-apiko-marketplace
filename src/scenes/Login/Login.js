import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import s from './Login.module.scss';
import { routes } from '../routes';
import { Text } from '../../components/Text/Text';
import { LoginForm } from './components/LoginForm/LoginForm';

export const Login = observer(() => {
  return (
    <>
      <div className={s.login_scene}>
        <div className="container">
          {/* Login Form */}
          <div className={s.form_wrapper}>
            <Text>Login</Text>
            <LoginForm />
          </div>
          {/* Register Box */}
          <div className={s.auth_box}>
            I have no account,{' '}
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link className={s.auth_box_link} to={routes.register}>
              REGISTER NOW
            </Link>
          </div>
        </div>
      </div>
    </>
  );
});
