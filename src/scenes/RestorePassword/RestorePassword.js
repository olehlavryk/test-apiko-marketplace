import React from 'react';
import s from './RestorePassword.module.scss';
import { Text } from '../../components/Text/Text';
import { RestoreForm } from './components/RestoreForm';

export const RestorePassword = () => {
  return (
    <main className={s.restore_scene}>
      <div className="container">
        <div className={s.form_wrapper}>
          <Text>Restore Password</Text>
          <RestoreForm />
        </div>
      </div>
    </main>
  );
};
