import { getRoot, types } from 'mobx-state-tree';
import { asyncModel } from '../utils';
import Api from '../../api';

export const AuthStore = types
  .model('AuthStore', {
    login: asyncModel(loginFlow),
    isLoggedIn: false,
    register: asyncModel(registerFlow),
    restore: asyncModel(restoreFlow),
  })
  .actions((store) => ({
    setIsLoggedIn(value) {
      store.isLoggedIn = value;
    },
    logout() {
      store.setIsLoggedIn(false);
      Api.Auth.logout();
    },
  }));

function loginFlow({ password, email }) {
  return async (flow) => {
    const res = await Api.Auth.login({ password, email });
    console.log(res.data);

    Api.Auth.setToken(res.data.token);

    getRoot(flow).viewer.setViewer(res.data.user);
  };
}

function registerFlow({ email, password, fullName }) {
  return async (flow) => {
    const res = await Api.Auth.register({
      email,
      password,
      fullName,
    });

    Api.Auth.setToken(res.data.token);

    getRoot(flow).viewer.setViewer(res.data.user);
  };
}

function restoreFlow({ email }) {
  return async (flow) => {
    // todo generate new random password, then send email

    // send back message to user
    return `We've got your request for restoring password and send restore instructions to ${email}`;
  };
}
