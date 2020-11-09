import { types } from 'mobx-state-tree';
import { ProductsCollection } from './Products/ProductsCollection';
import { UsersCollection } from './Users/UsersCollections';

export const EntitiesStore = types
  .model('EntitiesStore', {
    products: ProductsCollection,
    users: UsersCollection,
  })
  .actions((store) => ({
    merge(entities) {
      Object.keys(entities).forEach((collectionName) => {
        const collectionEntities = entities[collectionName];

        Object.keys(collectionEntities).forEach((id) => {
          const value = collectionEntities[id];

          if (store[collectionName] !== undefined) {
            store[collectionName].add(id, value);
          }
        });
      });
    },
  }));
