import { types } from 'mobx-state-tree';
import { UserModel } from './Users/UserModel';
import { asyncModel } from 'src/stores/utils';
import Api from 'src/api/index';

export const ViewerStore = types
  .model('ViewerStore', {
    user: types.maybe(UserModel),
    updateViewer: asyncModel(updateViewerFlow),
  })
  .actions((store) => ({
    setViewer(user) {
      store.user = user;
    },
  }));

function updateViewerFlow({ fullName, avatar, phone, location }) {
  return async (flow, store, Root) => {
    const res = await Api.Account.updateViewer({
      fullName,
      avatar,
      phone,
      location,
    });
    Root.viewer.setViewer(res.data);
  };
}
