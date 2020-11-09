import { schema } from 'normalizr';

export const User = new schema.Entity('users');
export const Product = new schema.Entity('products', {
  owner: User,
});
export const LatestProducts = new schema.Entity('products');
export const LatestProductsCollection = [LatestProducts];
export const OwnProducts = [Product];
export const ProductsSaved = [Product];
export const MessageSchema = new schema.Entity('messages');
export const ChatSchema = new schema.Entity('chats', {
  message: MessageSchema,
  product: Product,
  //participants: [User],
});
