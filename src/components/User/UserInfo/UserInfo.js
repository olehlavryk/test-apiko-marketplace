import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStore } from 'src/stores/createStore';
import Modal from 'react-modal';
import { generatePath, Link } from 'react-router-dom';
import s from './UserInfo.module.scss';
import { Icon } from '../../Icons/Icon';
import { routes } from '../../../scenes/routes';
import { PersonLogo } from 'src/components/PersonLogo/PersonLogo';
import { SellerContactForm } from './components/SellerContactForm';
import { AddToFavoriteBtn } from 'src/components/AddToFavoriteBtn/AddToFavoriteBtn';

export const UserInfo = ({ product }) => {
  const store = useStore();
  const history = useHistory();

  const { avatar, fullName, location, id } = product.owner;
  const [isVisible, setVisible] = useState(false);

  const handleChatWithSeller = () => {
    if (!store.auth.isLoggedIn) {
      history.push(routes.login);
      return;
    }

    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <>
      <div className={s.seller_info}>
        <div className={s.seller_avatar}>
          <Link
            to={generatePath(routes.user, {
              userId: id,
            })}
          >
            <PersonLogo
              size="72"
              avatar={avatar}
              fullName={fullName}
            />
          </Link>
        </div>
        <div className={s.seller_name}>
          <Link
            to={generatePath(routes.user, {
              userId: id,
            })}
          >
            {fullName}
          </Link>
        </div>
        {location && (
          <div className={s.seller_location}> {location} </div>
        )}
      </div>
      <button
        className={s.seller_chat_btn}
        onClick={handleChatWithSeller}
      >
        Chat with seller
      </button>
      <AddToFavoriteBtn product={product} />
      {/* Modal window */}
      <Modal
        isOpen={isVisible}
        onRequestClose={handleClose}
        className={s.modal}
        overlayClassName={s.modal_overlay}
      >
        <Icon
          name="close"
          className={s.close_window}
          onClick={handleClose}
        />
        <div className={s.modal_title}> Contact seller </div>
        <div className={s.about_seller_box}>
          <div className={s.seller_avatar}>
            <Link
              to={generatePath(routes.user, {
                userId: id,
              })}
            >
              <PersonLogo
                size="72"
                avatar={avatar}
                fullName={fullName}
              />
            </Link>
          </div>
          <div className={s.seller_info_text}>
            <div className={s.seller_name}> {fullName} </div>
            <div className={s.seller_location}> {location} </div>
          </div>
        </div>
        {/* Seller contact form */}
        <SellerContactForm {...{ product }} />
      </Modal>
    </>
  );
};
