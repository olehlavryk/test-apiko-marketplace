import { types } from 'mobx-state-tree';
import Api from 'src/api';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import { ProductsSaved as ProductsSavedSchema } from '../schemas';

export const ProductsSavedStore = types
  .model('ProductsSavedStore', {
    items: types.array(
      types.reference(types.late(() => ProductModel)),
    ),
    fetch: asyncModel(fetchProductsSaved),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchProductsSaved() {
  return async function fetchOwnProductsFlow(flow, store) {
    const res = await Api.Products.fetchSaved();

    const result = flow.merge(res.data, ProductsSavedSchema);

    store.setItems(result);
  };
}
