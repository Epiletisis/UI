import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import FilterMenu from '../filter-menu/FilterMenu';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [filters, setFilters] = useState([]);
  const [allowTooSpecificError, setAllowTooSpecificError] = useState(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <FilterMenu
          setFilters={setFilters}
          filters={filters}
          setProducts={setProducts}
          setApiError={setApiError}
          setAllowTooSpecificError={setAllowTooSpecificError}
        />

      </div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}

      <div className={allowTooSpecificError && products.length === 0
        ? styles.noProducts : styles.app}
      >
        {allowTooSpecificError && products.length === 0 ? (
          <div className={styles.noProducts}>
            No products like that exist. Please reset your filters and try again.
          </div>
        ) : (products.map((product) => (
          <div key={product.id}>
            <ProductCard
              product={product}
            />
          </div>
        )))}
      </div>
    </div>
  );
};

export default ProductPage;
