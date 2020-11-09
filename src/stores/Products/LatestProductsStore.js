import { getParent, types } from 'mobx-state-tree';
import { normalize } from 'normalizr';
import Api from 'src/api';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import { LatestProductsCollection } from '../schemas';

export const LatestProductsStore = types
  .model('LatestProductsStore', {
    items: types.array(types.reference(ProductModel)),
    fetchLatest: asyncModel(fetchLatest),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchLatest() {
  return async function fetchLatestFlow(flow, store, Root) {
    const res = await Api.Products.fetchLatest();

    const result = flow.merge(res.data, LatestProductsCollection);

    //Root.entities.merge(entities);

    store.setItems(result);
  };
}
