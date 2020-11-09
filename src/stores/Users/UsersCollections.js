import Api from 'src/api';
import { asyncModel, createCollection } from '../utils';
import { useStore } from '../createStore';
import { UserModel } from './UserModel';

export const UsersCollection = createCollection(UserModel, {
  getUser: asyncModel(getUser),
});

export function useUsersCollection() {
  const store = useStore();
  return store.entities.users;
}

function getUser(id) {
  return async function getUserFlow(flow, store) {
    try {
      const res = await Api.Users.getById(id);

      store.add(res.data.id, res.data);
    } catch (e) {
      console.log(e);
    }
  };
}
