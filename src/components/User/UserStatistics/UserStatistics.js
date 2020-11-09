import React, { useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { observer } from 'mobx-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import s from './UserStatistics.module.scss';
import { useStore } from '../../../stores/createStore';
import { Product } from '../../Product/Product';

export const UserStatistics = observer(({ user }) => {
  const store = useStore();
  useEffect(() => {
    store.ownProducts.fetch.run(user.id);
  }, []);

  // Loading
  if (store.ownProducts.fetch.isLoading) {
    const skeletons = [];

    // create products skeletons
    for (let i = 0; i < 12; i++) {
      skeletons.push(
        <li key={i}>
          <SkeletonTheme color="#ccc">
            <Skeleton width={200} height={274} />
          </SkeletonTheme>
        </li>,
      );
    }

    return (
      <>
        <div className={s.user_avatar_block}>
          <SkeletonTheme color="#ccc">
            <Skeleton
              width={95}
              height={95}
              circle
              className={s.user_avatar_block}
            />
          </SkeletonTheme>
        </div>
        <div className={s.user_name}>
          <SkeletonTheme color="#ccc">
            <Skeleton
              width={95}
              height={24}
              className={s.user_name}
            />
          </SkeletonTheme>
        </div>
        <div className={s.user_location}>
          <SkeletonTheme color="#ccc">
            <Skeleton
              width={120}
              height={18}
              className={s.user_location}
            />
          </SkeletonTheme>
        </div>
        <div className={s.tabs_skeleton}>
          <SkeletonTheme color="#ccc">
            <Skeleton width={492} height={75} />
          </SkeletonTheme>
        </div>
        <div className={s.products_block_skeleton}>
          <ul className={s.products_list}>{skeletons}</ul>
        </div>
      </>
    );
  }

  // Content
  let initials = user.fullName.match(/\b\w/g) || [];
  initials = (
    (initials.shift() || '') + (initials.pop() || '')
  ).toUpperCase();

  const ownProducts = [];

  if (store.ownProducts.items.length > 0) {
    store.ownProducts.items.map((item, index) =>
      ownProducts.push(
        <li key={item.id}>
          <Product {...{ item }} />
        </li>,
      ),
    );
  } else {
    ownProducts.push(
      <div key={1} className={s.no_products}>
        There are no products yet!
      </div>,
    );
  }

  return (
    <>
      {/* User Avatar */}
      <div className={s.user_avatar_block}>
        {user.avatar != null ? (
          <img
            className={s.user_avatar}
            src={user.avatar}
            alt={user.fullName}
          />
        ) : (
          <div className={s.user_without_avatar}>{initials}</div>
        )}
      </div>

      {/* User Full Name */}
      <div className={s.user_name}>{user.fullName}</div>

      {/* User Location */}
      <div className={s.user_location}>{user.location}</div>

      {/* User Tabs */}
      <Tabs defaultIndex={2}>
        <TabList className={s.tabs_header}>
          <Tab className={s.tab_item} selectedClassName={s.active}>
            <div className={`${s.tab_title} ${s.prime_green}`}>
              88%
            </div>
            <span className={s.tab_subtitle}>Positive feedback</span>
          </Tab>
          <Tab className={s.tab_item} selectedClassName={s.active}>
            <div className={`${s.tab_title} ${s.oceanic_blue}`}>
              123
            </div>
            <span className={s.tab_subtitle}>Sales</span>
          </Tab>
          <Tab
            className={`${s.tab_item}`}
            selectedClassName={s.active}
          >
            <div className={s.tab_title}>
              {store.ownProducts.items.length}
            </div>
            <span className={s.tab_subtitle}>Active listings</span>
          </Tab>
        </TabList>

        <TabPanel>
          <div className={s.tab_panel_content}>
            <h2>List of positive feedback</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.tab_panel_content}>
            <h2>Sales products</h2>
          </div>
        </TabPanel>
        <TabPanel>
          <div className={s.tab_panel_content}>
            {store.ownProducts.items.length > 0 ? (
              <ul className={s.products_list}>{ownProducts}</ul>
            ) : (
              ownProducts
            )}
          </div>
        </TabPanel>
      </Tabs>
    </>
  );
});
