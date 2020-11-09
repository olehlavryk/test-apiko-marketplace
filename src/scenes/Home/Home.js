import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import s from './Home.module.scss';
import { useStore } from '../../stores/createStore';
import { FilterBar } from '../../components/FilterBar/FilterBar';
import { Product } from '../../components/Product/Product';

export const Home = observer(() => {
  const store = useStore();
  useEffect(() => {
    store.latestProducts.fetchLatest.run();
  }, []);

  // Loading
  if (store.latestProducts.fetchLatest.isLoading) {
    const skeletons = [];

    // create products skeletons
    for (let i = 0; i < 16; i++) {
      skeletons.push(
        <li key={i}>
          <SkeletonTheme color="#fff">
            <Skeleton width={286} height={274} />
          </SkeletonTheme>
        </li>,
      );
    }

    return (
      <main className={s.home_scene}>
        <div className="container">
          <SkeletonTheme color="#fff">
            <Skeleton height={42} className={s.filter_bar_skeleton} />
          </SkeletonTheme>
          <div className={s.products_section}>
            <ul className={s.products_list}>{skeletons}</ul>
          </div>
        </div>
      </main>
    );
  }

  // Content
  return (
    <main className={s.home_scene}>
      <div className="container">
        <FilterBar />
        <div className={s.products_section}>
          <ul className={s.products_list}>
            {store.latestProducts.items.map((item) => (
              <li key={item.id}>
                <Product {...{ item }} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
});
