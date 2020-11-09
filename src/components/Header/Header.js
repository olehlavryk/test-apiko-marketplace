import React, { useEffect, useState, useRef } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import s from './Header.module.scss';
import { Icon } from '../Icons/Icon';
import { routes } from '../../scenes/routes';
import './../../App.css';
import { useStore } from '../../stores/createStore';
import { ViewerLogo } from '../Viewer/ViewerLogo/ViewerLogo';

const UserInfo = observer(() => {
  const store = useStore();

  const [state, setState] = useState({ open: false });

  const toggleDropDown = () => {
    setState({ open: !state.open });
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setState({ open: false });
        }
      }

      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <div className={s.user_info} ref={wrapperRef}>
      <ViewerLogo user={store.viewer.user} onClick={toggleDropDown} />
      {state.open && (
        <div className={s.user_info_dropdown}>
          <div className={s.user_details_box}>
            <ViewerLogo user={store.viewer.user} />
            <div className={s.user_profile}>
              <div className={s.user_name}>
                {store.viewer.user.fullName}
              </div>
              <div className={s.user_email}>
                {store.viewer.user.email}
              </div>
              <Link
                to={generatePath(routes.user, {
                  userId: store.viewer.user.id,
                })}
                className={s.user_text}
              >
                Profile
              </Link>
            </div>
          </div>

          <ul className={s.profile_menu}>
            <li>
              <Link to={routes.viewerProfile}>Edit Profile</Link>
            </li>
            <li>
              <Link to={routes.login} onClick={store.auth.logout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
});

export const Header = observer(() => {
  const store = useStore();

  const completedClass = store.auth.isLoggedIn ? s.header_auth : null;

  return (
    <header className={`${s.header} ${completedClass}`}>
      <div className="container">
        <div className={s.left}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={routes.home} className={s.logo}>
            {store.auth.isLoggedIn ? (
              <Icon name="logo_white" />
            ) : (
              <Icon name="logo" />
            )}
          </Link>
        </div>
        <div className={s.right}>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={routes.productAdd} className={s.primary_link}>
            Sell
          </Link>

          {store.auth.isLoggedIn ? (
            <UserInfo />
          ) : (
            <Link to={routes.login} className={s.outline_link}>
              Login
            </Link>
          )}

          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <Link to={routes.productsSaved}>
            <Icon
              name={store.auth.isLoggedIn ? 'like_white' : 'like'}
            />
          </Link>
        </div>
      </div>
    </header>
  );
});
