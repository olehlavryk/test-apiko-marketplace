import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { values } from 'mobx';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useParams } from 'react-router';
import { useProductsCollection } from 'src/stores/Products/ProductsCollection';
import s from './ProductView.module.scss';
import {
  getImagePlaceHolderPath,
  setImagePlaceHolder,
} from '../../stores/utils';
import { Icon } from '../../components/Icons/Icon';
import { UserInfo } from '../../components/User/UserInfo/UserInfo';

export const ProductView = observer(() => {
  const { productId } = useParams();

  const collection = useProductsCollection();
  const product = collection.get(productId);

  useEffect(() => {
    if (!product || !product.owner) {
      collection.getProduct.run(productId);
    }
  }, []);

  // Loading or not found.
  if (collection.getProduct.isLoading) {
    return (
      <main className={s.product_scene}>
        <div className={`${s.content} container`}>
          <div className={s.product_content}>
            <SkeletonTheme color="#fff">
              <Skeleton height={430} />
            </SkeletonTheme>
          </div>
          <div className={s.right_sidebar}>
            <SkeletonTheme color="#fff">
              <Skeleton
                height={145}
                className={s.user_info_skeleton}
              />
            </SkeletonTheme>
            <SkeletonTheme color="#fff">
              <Skeleton
                height={56}
                className={s.right_sidebar_btns_skeleton}
              />
            </SkeletonTheme>
            <SkeletonTheme
              color="#fff"
              className={s.right_sidebar_btns_skeleton}
            >
              <Skeleton height={56} />
            </SkeletonTheme>
          </div>
        </div>
      </main>
    );
  } else if (!product) {
    return <div>Product not found!</div>;
  }
  const timestamp = Date.parse(product.createdAt);
  const date = new Date(timestamp);

  let productPreview = null;

  try {
    if (values(product.photos)[0] !== undefined) {
      productPreview = (
        <img
          src={values(product.photos)[0]}
          alt={product.title}
          onError={(e) => setImagePlaceHolder(e, '580x275')}
        />
      );
    } else {
      productPreview = (
        <img
          src={getImagePlaceHolderPath('580x275')}
          alt={product.title}
        />
      );
    }
  } catch (err) {
    productPreview = (
      <img
        src={getImagePlaceHolderPath('580x275')}
        alt={product.title}
      />
    );
  }

  return (
    <main className={s.product_scene}>
      <div className={`${s.content} container`}>
        <article className={s.product_content}>
          {/* Product preview */}
          <div className={s.product_preview}>{productPreview}</div>

          {/* Product details */}
          <div className={s.product_details}>
            <div className={s.product_title}>
              {product.firstLetterToUpper}
              <span>{date.toDateString()}</span>
            </div>
            <div className={s.product_location}>
              <Icon name="map" />
              <span>{product.location}</span>
            </div>
            <div className={s.product_description}>
              {product.description}
            </div>
            <div className={s.product_price}>${product.price}</div>
          </div>
        </article>
        <aside className={s.right_sidebar}>
          {product.owner && <UserInfo {...{ product }} />}
        </aside>
      </div>
    </main>
  );
});
