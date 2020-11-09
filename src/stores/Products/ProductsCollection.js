import Api from 'src/api';
import { ProductModel } from './ProductModel';
import { asyncModel, createCollection } from '../utils';
import { useStore } from '../createStore';

export const ProductsCollection = createCollection(ProductModel, {
  getProduct: asyncModel(getProduct),
  addProduct: asyncModel(addProduct),
});

export function useProductsCollection() {
  const store = useStore();
  return store.entities.products;
}

function getProduct(id) {
  return async function getProductFlow(flow, store, Root) {
    try {
      const res = await Api.Products.getById(id);
      Root.entities.users.add(res.data.owner.id, res.data.owner);

      // todo fix owner, add reference to User model
      store.add(res.data.id, res.data);
    } catch (e) {
      console.log(e);
    }
  };
}

function addProduct({ title, location, description, price, photos }) {
  return async function addProductFlow(flow, store) {
    try {
      const res = await Api.Products.addProduct({
        title,
        location,
        description,
        price,
        photos,
      });

      console.log(res.data);
      // console.log({
      //   title,
      //   location,
      //   description,
      //   price,
      //   photos,
      // });

      store.add(res.data.id, res.data);
    } catch (e) {
      console.log(e);
    }
  };
}
