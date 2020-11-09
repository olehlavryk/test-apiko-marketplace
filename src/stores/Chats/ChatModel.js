import { types } from 'mobx-state-tree';
import { ProductModel } from '../Products/ProductModel';
import { UserModel } from '../Users/UserModel';
import { MessageModel } from './MessageModel';

export const ChatModel = types
  .model('Chat', {
    id: types.identifier,
    productId: types.number,
    ownerId: types.number,
    createdAt: types.number,
    updatedAt: types.number,
    message: types.reference(MessageModel),
    product: types.reference(ProductModel),
    user: types.reference(UserModel),
  })
  .preProcessSnapshot((snapshot) => ({
    ...snapshot,
    product: snapshot.product || snapshot.productId,
    participants: undefined,
    user: snapshot.participants[0],
  }));
