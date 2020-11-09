import React, { useState, useEffect } from 'react';
// import Modal from 'react-modal';
import Router from './scenes/routes';
import { createStore, Provider } from './stores/createStore';

const store = createStore();

function App() {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    store.bootstrap().then(() => {
      setLoading(false);
      // Modal.setAppElement('#modalRoot');
    });
  }, []);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <main>
      <Provider value={store}>
        <Router />
      </Provider>
    </main>
  );
}

export default App;
