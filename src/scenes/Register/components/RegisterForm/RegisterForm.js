import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useHistory } from 'react-router';
import { Label } from 'src/components/Form/Label/Label';
import { TextInput } from 'src/components/Form/TextInput/TextInput';
import { PasswordInput } from 'src/components/Form/PasswordInput/PasswordInput';
import { Button } from 'src/components/Form/Button/Button';
import { routes } from 'src/scenes/routes';
import { useStore } from 'src/stores/createStore';
import s from './RegisterForm.module.scss';

export const RegisterForm = () => {
  const store = useStore();
  const history = useHistory();
  const [state, setState] = useState({
    error: false,
    errorMessage: null,
  });

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is a required field'),
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Full name is a required field'),
    password: Yup.string()
      .label('Password')
      .required('Password is a required field')
      .min(2, 'Seems a bit short...')
      .max(10, 'We prefer insecure system, try a shorter password.'),
    confirmPassword: Yup.string()
      .required()
      .label('Confirm password')
      .test('passwords-match', 'Passwords must match...', function(
        value,
      ) {
        return this.parent.password === value;
      }),
  });

  return (
    <Formik
      initialValues={{
        email: '',
        fullName: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { resetForm }) => {
        const { email, password, fullName } = values;
        try {
          await store.auth.register.run({
            email,
            password,
            fullName,
          });
          store.auth.setIsLoggedIn(true);
          history.push(routes.home);
        } catch (err) {
          if (err.response.status === 409) {
            setState({
              error: true,
              errorMessage:
                'This email already exist! Please try an other password.',
            });
          } else {
            setState({
              error: true,
              errorMessage: 'Something goes wrong! Please try again.',
            });
          }

          resetForm({
            email: '',
            fullName: '',
            password: '',
            confirmPassword: '',
          });
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit} className={s.register_form}>
          <div className={s.form_row}>
            <Label htmlFor="userEmail">Email</Label>
            <TextInput
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Example@gmail.com"
            />
            {errors.email && touched.email ? (
              <span className={s.errors_small}>
                {errors.email && touched.email && errors.email}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="fullName">Full name</Label>
            <TextInput
              name="fullName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
              placeholder="Tony Stark"
            />
            {errors.fullName && touched.fullName ? (
              <span className={s.errors_small}>
                {errors.fullName &&
                  touched.fullName &&
                  errors.fullName}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              name="password"
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password ? (
              <span className={s.errors_small}>
                {errors.password &&
                  touched.password &&
                  errors.password}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="confirmPassword">Password again</Label>
            <PasswordInput
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.confirmPassword && touched.confirmPassword ? (
              <span className={s.errors_small}>
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </span>
            ) : null}
          </div>

          {state.error ? (
            <span className={s.errors_small}>
              {state.errorMessage}
            </span>
          ) : null}

          <div className={s.form_row}>
            <Button
              disabled={isSubmitting}
              className={s.register_btn}
            >
              Register
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
