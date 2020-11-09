import React from 'react';
import s from './ProductAdd.module.scss';
import { Text } from '../../components/Text/Text';
import { AddProductForm } from './components/AddProductForm/AddProductForm';

export const ProductAdd = () => {
  return (
    <main className={s.add_product_scene}>
      <div className="container">
        <div className={s.form_wrapper}>
          <Text>Add product</Text>
          <AddProductForm />
        </div>
      </div>
    </main>
  );
};
