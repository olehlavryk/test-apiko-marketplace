import React from 'react';
import { iconsConfig } from './iconsConfig';

export const Icon = ({ name, ...props }) => {
  const IconC = iconsConfig[name];

  return <IconC {...props} />;
};
