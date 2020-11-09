import { applySnapshot, types } from 'mobx-state-tree';
import Api from 'src/api';
import { AuthStore } from './Auth/AuthStore';
import { ViewerStore } from './ViewerStore';
import { LatestProductsStore } from './Products/LatestProductsStore';
import { OwnProducts } from './Products/OwnProductsStore';
import { ProductsSavedStore } from './Products/ProductsSavedStore';
import { EntitiesStore } from './EntitesStore';

export const RootStore = types
  .model('RootStore', {
    auth: types.optional(AuthStore, {}),
    viewer: types.optional(ViewerStore, {}),
    latestProducts: types.optional(LatestProductsStore, {}),
    ownProducts: types.optional(OwnProducts, {}),
    productsSaved: types.optional(ProductsSavedStore, {}),
    entities: types.optional(EntitiesStore, {}),
  })
  .actions((store) => ({
    async bootstrap() {
      try {
        // eslint-disable-next-line no-undef
        const token = localStorage.getItem('__token');

        if (!token) {
          store.auth.setIsLoggedIn(false);
          applySnapshot(store, {});
          return;
        }

        Api.Auth.setToken(token);

        const res = await Api.Account.getUser();

        store.viewer.setViewer(res.data);
        store.auth.setIsLoggedIn(true);
      } catch (err) {
        store.auth.setIsLoggedIn(false);
        applySnapshot(store, {});
      }
    },
  }));
