import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Label } from 'src/components/Form/Label/Label';
import { TextInput } from 'src/components/Form/TextInput/TextInput';
import { Button } from 'src/components/Form/Button/Button';
import { useStore } from 'src/stores/createStore';
import s from './RestoreForm.module.scss';

export const RestoreForm = () => {
  const store = useStore();
  const [state, setState] = useState({
    error: false,
    errorMessage: null,
    success: null,
    successMessage: null,
  });

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('Email is a required field'),
  });

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={RegisterSchema}
      onSubmit={async (values, { resetForm }) => {
        const { email } = values;
        try {
          const result = await store.auth.restore.run({
            email,
          });
          setState({
            ...state,
            success: true,
            successMessage: result,
          });
        } catch (err) {
          setState({
            error: true,
            errorMessage: 'Something goes wrong! Please try again.',
          });

          resetForm({
            email: '',
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
        <form onSubmit={handleSubmit} className={s.restore_form}>
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

          {state.error ? (
            <span className={s.errors_small}>
              {state.errorMessage}
            </span>
          ) : null}

          {state.success ? (
            <span className={s.success_small}>
              {state.successMessage}
            </span>
          ) : null}

          <div className={s.form_row}>
            <Button
              disabled={isSubmitting}
              className={s.register_btn}
            >
              Continue
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
