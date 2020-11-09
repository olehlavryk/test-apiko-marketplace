import React, { useState } from 'react';
import s from './ViewerProfileForm.module.scss';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link, useHistory } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import { Label } from 'src/components/Form/Label/Label';
import { TextInput } from 'src/components/Form/TextInput/TextInput';
import { Button } from 'src/components/Form/Button/Button';
import ReactFileReader from 'react-file-reader';
import { observer } from 'mobx-react';

export const ViewerProfileForm = observer(() => {
  const store = useStore();
  const history = useHistory();

  const [state, setState] = useState({
    error: false,
    errorMessage: null,
    success: false,
    successMessage: null,
    viewerAvatar: store.viewer.user.avatar,
  });

  const handleFiles = (files) => {
    setState({ ...state, viewerAvatar: files.base64 });
  };

  const handleUploadImages = async () => {
    let fileUrl = '';
    const data = new FormData();

    try {
      data.append('file', state.viewerAvatar);
      data.append('upload_preset', 'apiko_upload');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/olehlavryk/image/upload',
        {
          method: 'POST',
          body: data,
        },
      );

      const file = await res.json();
      fileUrl = file.secure_url;
    } catch (error) {
      console.log('Error:', error);
    }

    return fileUrl;
  };

  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  const ProfileSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(30, 'Too Long!')
      .required('Full name is a required field'),
    phone: Yup.string().matches(
      phoneRegExp,
      'Phone number is not valid',
    ),
  });

  const user = store.viewer.user;

  let initials = user.fullName.match(/\b\w/g) || [];
  initials = (
    (initials.shift() || '') + (initials.pop() || '')
  ).toUpperCase();

  return (
    <Formik
      initialValues={{
        fullName: user.fullName,
        phone: user.phone || '',
        avatar: state.viewerAvatar,
        location: user.location || '',
      }}
      validationSchema={ProfileSchema}
      onSubmit={async (values) => {
        const fullName = values.fullName;
        const phone = values.phone !== '' ? values.phone : null;
        const avatar = await handleUploadImages();
        const location =
          values.location !== '' ? values.location : null;

        try {
          await store.viewer.updateViewer.run({
            fullName,
            avatar,
            phone,
            location,
          });

          setState({
            ...state,
            success: true,
            successMessage:
              'Viewer profile has successfully updated.',
            error: false,
            errorMessage: '',
          });
        } catch (err) {
          setState({
            ...state,
            success: false,
            successMessage: '',
            error: true,
            errorMessage: 'Something goes wrong! Please try again.',
          });
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
        <form className={s.viewer_form} onSubmit={handleSubmit}>
          {/* Avatar */}
          <div className={s.form_row}>
            <div className={s.viewer_box}>
              {state.viewerAvatar != null ? (
                <img
                  className={s.viewer_avatar}
                  src={state.viewerAvatar}
                  alt={user.fullName}
                />
              ) : (
                <div className={s.viewer_without_avatar}>
                  {initials}
                </div>
              )}
              <div className={s.upgrade_photo_box}>
                <ReactFileReader handleFiles={handleFiles} base64>
                  <button
                    className={s.upgrade_user_photo_btn}
                    onClick={(e) => e.preventDefault()}
                  >
                    Upgrade Photo
                  </button>
                </ReactFileReader>
              </div>
            </div>
          </div>

          <div className={s.form_row}>
            <Label htmlFor="email">Full Name</Label>
            <TextInput
              type="text"
              name="fullName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
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
            <Label htmlFor="email">Location</Label>
            <TextInput
              type="text"
              name="location"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
            />
            {errors.location && touched.location ? (
              <span className={s.errors_small}>
                {errors.location &&
                  touched.location &&
                  errors.location}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="email">Phone Number</Label>
            <TextInput
              type="text"
              name="phone"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {errors.phone && touched.phone ? (
              <span className={s.errors_small}>
                {errors.phone && touched.phone && errors.phone}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
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
          </div>

          <div className={s.form_row}>
            <Button
              disabled={isSubmitting}
              type="submit"
              className={s.login_btn}
            >
              {isSubmitting ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
});
