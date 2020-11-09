import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactFileReader from 'react-file-reader';
import * as Yup from 'yup';
import { Formik } from 'formik';
import s from './AddProductForm.module.scss';
import { useStore } from '../../../../stores/createStore';
import { routes } from '../../../routes';
import { Label } from '../../../../components/Form/Label/Label';
import { TextInput } from '../../../../components/Form/TextInput/TextInput';
import { Button } from '../../../../components/Form/Button/Button';
import { TextArea } from '../../../../components/Form/TextArea/TextArea';
import { Icon } from '../../../../components/Icons/Icon';

export const AddProductForm = () => {
  const store = useStore();
  const history = useHistory();

  const [state, setState] = useState({
    error: false,
    errorMessage: null,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleUploadImages = async () => {
    const photosLinks = [];
    const data = new FormData();

    for (const image of selectedFiles) {
      try {
        data.append('file', image);
        data.append('upload_preset', 'apiko_upload');

        const res = await fetch(
          'https://api.cloudinary.com/v1_1/olehlavryk/image/upload',
          {
            method: 'POST',
            body: data,
          },
        );

        const file = await res.json();
        photosLinks.push(file.secure_url);
      } catch (error) {
        console.log('Error:', error);
      }
    }

    return photosLinks;
  };

  const handleFiles = (files) => {
    const arrFiles = [];
    let count = 0;
    for (const file of files.base64) {
      if (count < 5) {
        arrFiles.push(file);
      }
      count++;
    }
    setSelectedFiles(arrFiles);
  };

  const imagesPreview = selectedFiles.map((item, key) => (
    <img key={key} src={item} alt="Product preview" />
  ));

  const AddProductSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is a required field')
      .min(2, 'Seems a bit short...')
      .max(45, 'We prefer insecure system, try a shorter title.'),
    location: Yup.string()
      .required('Location is a required field')
      .min(2, 'Seems a bit short...')
      .max(60, 'We prefer insecure system, try a shorter password.'),
    price: Yup.string().required('Location is a required field'),
  });

  return (
    <Formik
      initialValues={{
        title: '',
        location: '',
        description: '',
        price: 0,
        photos: selectedFiles,
      }}
      validationSchema={AddProductSchema}
      onSubmit={async (values, { resetForm, setFieldValue }) => {
        const { title, location, description, price } = values;

        const photos = await handleUploadImages();

        console.log(photos);
        try {
          await store.entities.products.addProduct.run({
            title,
            location,
            description,
            price,
            photos,
          });
          history.push(routes.home);
        } catch (err) {
          if (err.response.status === 404) {
            setState({
              error: true,
              errorMessage:
                'Wrong login or password! Please try again!',
            });
          } else {
            setState({
              error: true,
              errorMessage: 'Something goes wrong! Please try again.',
            });
          }

          resetForm({
            title: '',
            location: '',
            description: '',
            price: 0,
            photos: [],
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
        <form className={s.add_product_form} onSubmit={handleSubmit}>
          <div className={s.form_row}>
            <Label htmlFor="title" required>
              Title
            </Label>
            <TextInput
              type="text"
              name="title"
              id="title"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              placeholder="For example: Iron man suit"
            />
            {errors.title && touched.title ? (
              <span className={s.errors_small}>
                {errors.title && touched.title && errors.title}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="location" required>
              Location
            </Label>
            <TextInput
              type="text"
              name="location"
              id="location"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.location}
              placeholder="For example: Los Angeles, CA"
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
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              rows={10}
            />
            {errors.description && touched.description ? (
              <span className={s.errors_small}>
                {errors.description &&
                  touched.description &&
                  errors.description}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="description">Photos</Label>
            <div className={s.photos_wrapper}>
              <div className={s.images_preview_box}>
                {imagesPreview}
              </div>
              <ReactFileReader
                handleFiles={handleFiles}
                multipleFiles
                base64
              >
                <button
                  className={s.add_photo_btn}
                  onClick={(e) => e.preventDefault()}
                >
                  <Icon name="plus" />
                </button>
              </ReactFileReader>
            </div>
            {errors.photos && touched.photos ? (
              <span className={s.errors_small}>
                {errors.photos && touched.photos && errors.photos}
              </span>
            ) : null}
          </div>
          <div className={s.form_row}>
            <Label htmlFor="price" required>
              Price
            </Label>
            <TextInput
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.price && touched.price ? (
              <span className={s.errors_small}>
                {errors.price && touched.price && errors.price}
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
              className={s.add_product_btn}
            >
              {isSubmitting ? 'Loading...' : 'Submit'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};
