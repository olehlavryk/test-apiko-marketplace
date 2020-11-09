import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './AddToFavoriteBtn.module.scss';
import { observer } from 'mobx-react';
import { Icon } from '../Icons/Icon';
import { useStore } from 'src/stores/createStore';
import { routes } from 'src/scenes/routes';

export const AddToFavoriteBtn = observer(({ product }) => {
  const store = useStore();
  const history = useHistory();
  const [state, setState] = useState({ isFavorite: product.saved });

  const handleProductLike = async () => {
    if (!store.auth.isLoggedIn) {
      history.push(routes.login);
      return;
    }

    await product.productSave();

    if (product.saved) {
      setState({ isFavorite: !state.isFavorite });
    }
  };

  const handleProductDisLike = async () => {
    if (!store.auth.isLoggedIn) {
      history.push(routes.login);
      return;
    }

    await product.removeProductSave();

    if (!product.saved) {
      setState({ isFavorite: !state.isFavorite });
    }
  };

  if (state.isFavorite) {
    return (
      <button
        className={s.favorited_btn}
        onClick={handleProductDisLike}
      >
        <Icon name="like_white" size="16px" />
        <span>Favourited</span>
      </button>
    );
  }

  return (
    <button
      className={s.add_to_favorite_btn}
      onClick={handleProductLike}
    >
      <Icon name="like" size="16px" />
      <span>Add to favorite</span>
    </button>
  );
});
