import React from 'react';
import s from './ViewerProfile.module.scss';
import { Text } from '../../components/Text/Text';
import { ViewerProfileForm } from './components/ViwerProfileForm/ViewerProfileForm';

export const ViewerProfile = () => {
  return (
    <>
      <div className={s.user_profile_scene}>
        <div className="container">
          <div className={s.form_wrapper}>
            <Text>Edit Profile</Text>
            <ViewerProfileForm />
          </div>
        </div>
      </div>
    </>
  );
};
