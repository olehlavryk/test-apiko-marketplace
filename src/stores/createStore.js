import { createContext, useContext } from 'react';
import { RootStore } from 'src/stores/RootStore';
import { createPersist } from './utils';

export function createStore() {
  const root = RootStore.create();

  const persist = createPersist(root);

  persist.rehydrate();

  return root;
}

const MSTContext = createContext(null);

export const { Provider } = MSTContext;

export function useStore(mapStateToProps) {
  const store = useContext(MSTContext);

  if (typeof mapStateToProps === 'function') {
    return mapStateToProps(store);
  }

  return store;
}
