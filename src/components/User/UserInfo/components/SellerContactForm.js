import React, { useState } from 'react';
import { useHistory, generatePath } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Button } from 'src/components/Form/Button/Button';
import { TextArea } from 'src/components/Form/TextArea/TextArea';
import { Label } from 'src/components/Form/Label/Label';
import s from './SellerContactForm.module.scss';
import { routes } from 'src/scenes/routes';

export const SellerContactForm = ({ product }) => {
  const history = useHistory();

  const [state, setState] = useState({
    error: false,
    errorMessage: null,
  });

  const [messageText, setMessageText] = useState(
    'For example: Iron man suit',
  );

  const formValidationSchema = Yup.object().shape({
    message: Yup.string()
      .required('Message is a required field')
      .min(2, 'Seems a bit short...')
      .max(300, 'Massage has max 300 symbols length'),
  });

  return (
    <Formik
      initialValues={{
        message: messageText,
      }}
      validationSchema={formValidationSchema}
      onSubmit={async (values, { resetForm, setFieldValue }) => {
        try {
          const { message } = values;

          const chatId = await product.createChat.run(message);
          //setVisible(false);

          history.push(generatePath(routes.inbox, { chatId }));
        } catch (err) {
          console.log(err);
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
        <form
          className={s.seller_contact_form}
          onSubmit={handleSubmit}
        >
          <div className={s.form_row}>
            <Label htmlFor="message" required>
              Message
            </Label>
            <TextArea
              id="message"
              name="message"
              onChange={handleChange}
              onBlur={handleBlur}
              rows={10}
              defaultValue={messageText}
            />

            {errors.message && touched.message ? (
              <span className={s.errors_small}>
                {errors.message && touched.message && errors.message}
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
              type="submit"
              className={s.form_btn}
            >
              {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
