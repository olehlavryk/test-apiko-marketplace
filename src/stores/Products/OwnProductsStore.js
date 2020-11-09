import { getParent, types } from 'mobx-state-tree';
import Api from 'src/api';
import { ProductModel } from './ProductModel';
import { asyncModel } from '../utils';
import { OwnProducts as OwnProductsSchema } from '../schemas';

export const OwnProducts = types
  .model('OwnProductsStore', {
    items: types.array(
      types.reference(types.late(() => ProductModel)),
    ),
    fetch: asyncModel(fetchOwnProducts),
  })
  .actions((store) => ({
    setItems(items) {
      store.items = items;
    },
  }));

function fetchOwnProducts(id) {
  return async function fetchOwnProductsFlow(flow, store) {
    const res = await Api.Products.byUserId(id);

    const result = flow.merge(res.data.list, OwnProductsSchema);

    store.setItems(result);
  };
}
