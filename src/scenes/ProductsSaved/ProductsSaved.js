import React, { useEffect } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { observer } from 'mobx-react';
import s from './ProductsSaved.module.scss';
import { useStore } from 'src/stores/createStore';
import { Product } from 'src/components/Product/Product';

export const ProductsSaved = observer(() => {
  const store = useStore();
  useEffect(() => {
    store.productsSaved.fetch.run();
  }, []);

  // Loading
  if (store.productsSaved.fetch.isLoading) {
    const skeletons = [];

    // create products skeletons
    for (let i = 0; i < 12; i++) {
      skeletons.push(
        <li key={i}>
          <SkeletonTheme color="#ccc">
            <Skeleton width={280} height={274} />
          </SkeletonTheme>
        </li>,
      );
    }

    return (
      <>
        <main className={s.products_saved_scene}>
          <div className="container">
            <SkeletonTheme color="#ccc">
              <Skeleton
                width={170}
                height={24}
                className={s.filter_bar_skeleton}
              />
            </SkeletonTheme>
            <div className={s.products_section}>
              <ul className={s.products_list}>{skeletons}</ul>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Content

  const productsSaved = [];

  if (store.productsSaved.items.length > 0) {
    store.productsSaved.items.map((item, index) =>
      productsSaved.push(
        <li key={item.id}>
          <Product {...{ item }} />
        </li>,
      ),
    );
  } else {
    productsSaved.push(
      <div key={1} className={s.no_products}>
        There are no products yet!
      </div>,
    );
  }

  return (
    <main className={s.products_saved_scene}>
      <div className="container">
        <div className={s.products_count_title}>
          SAVED ITEMS{' '}
          <span>({store.productsSaved.items.length})</span>
        </div>
        <div className={s.products_section}>
          {store.productsSaved.items.length > 0 ? (
            <ul className={s.products_list}>{productsSaved}</ul>
          ) : (
            productsSaved
          )}
        </div>
      </div>
    </main>
  );
});
