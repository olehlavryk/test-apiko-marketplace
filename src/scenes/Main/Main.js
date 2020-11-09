import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import s from './Main.module.scss';
import { Header } from '../../components/Header/Header';
import { ProtectedRoute, routes } from '../routes';
import { Home } from '../Home/Home';
import { ProductView } from '../ProductView/ProductView';
import { User } from '../User/User';
import { ProductAdd } from '../ProductAdd/ProductAdd';
import { ProductsSaved } from '../ProductsSaved/ProductsSaved';
import { ViewerProfile } from '../ViewerProfile/ViewerProfile';

export const Main = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <ProtectedRoute
          exact
          path={routes.productsSaved}
          component={ProductsSaved}
        />
        <Route path={routes.product} component={ProductView} />
        <Route path={routes.user} component={User} />
        <ProtectedRoute
          path={routes.productAdd}
          component={ProductAdd}
        />
        <ProtectedRoute
          path={routes.viewerProfile}
          component={ViewerProfile}
        />
      </Switch>
    </>
  );
};
