import {
  getRoot,
  types,
  getParent,
  flow,
  getSnapshot,
} from 'mobx-state-tree';
import { UserModel } from '../Users/UserModel';
import Api from '../../api';
import { asyncModel } from '../utils';
import { ChatSchema } from '../schemas';

export const ProductModel = types
  .model('ProductModel', {
    id: types.identifierNumber,
    ownerId: types.number,
    title: types.string,
    description: types.maybeNull(types.string),
    photos: types.maybeNull(types.array(types.string)),
    location: types.string,
    price: types.number,
    saved: types.optional(types.boolean, false),
    createdAt: types.string,
    updatedAt: types.string,
    owner: types.maybe(types.late(() => UserModel)),
    createChat: asyncModel(createChat, false),
  })
  .views((store) => ({
    get firstLetterToUpper() {
      return (
        store.title.charAt(0).toUpperCase() + store.title.slice(1)
      );
    },
  }))
  .actions((store) => ({
    productSave: flow(function* productSave() {
      store.saved = !store.saved;

      try {
        yield Api.Products.saveById(+store.id);
      } catch (e) {
        console.log(e);
        store.likeRevert();
      }
    }),

    removeProductSave: flow(function* removeProductSave() {
      store.saved = !store.saved;

      try {
        yield Api.Products.removeSaveById(+store.id);

        // update savedProducts store
        yield getRoot(store).productsSaved.fetch.run();
      } catch (e) {
        console.log(e);
        store.likeRevert();
      }
    }),
    likeRevert() {
      store.saved = !store.saved;
    },
  }));

function createChat(message) {
  return async function createChatFlow(flow, store) {
    let chatId;

    try {
      flow.start();
      const res = await Api.Chats.createChat(store.id, message);
      chatId = res.data.id;

      res.data.participants = [getSnapshot(store.owner)];

      flow.merge(res.data, ChatSchema);
      flow.success();
    } catch (error) {
      flow.error(error);
      throw error;
    }

    return chatId;
  };
}
