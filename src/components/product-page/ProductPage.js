import React, { useEffect, useState } from 'react';
import ProductCard from '../product-card/ProductCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './ProductPageService';
import FilterMenu from '../filter-menu/FilterMenu';
import ProductModal from '../product-modal/ProductModal';
import ReviewModal from '../review-modal/ReviewModal';
import getUserByEmail from '../profile-page/ProfilePageService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [user, setUser] = useState({});
  const [open, setOpen] = React.useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [clickedProduct, setClickedProduct] = useState({});
  const [filters, setFilters] = useState([]);
  const [allowTooSpecificError, setAllowTooSpecificError] = useState(false);
  const userEmail = localStorage.getItem('userEmail');

  const handleOpenModal = (product) => {
    setOpen(true);
    setClickedProduct(product);
  };

  const handleCloseModal = () => setOpen(false);

  const handleReviewOpen = (product) => {
    setOpen(false);
    setReviewOpen(true);
    setClickedProduct(product);
  };

  const handleReviewClose = () => setReviewOpen(false);

  useEffect(() => {
    fetchProducts(setProducts, setApiError, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getUserByEmail(userEmail, setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(user);
  console.log(userEmail);

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
      <ProductModal
        open={open}
        clickedProduct={clickedProduct}
        handleCloseModal={handleCloseModal}
        handleReviewOpen={handleReviewOpen}
      />
      <ReviewModal
        reviewOpen={reviewOpen}
        handleReviewClose={handleReviewClose}
        clickedProduct={clickedProduct}
      />

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
              user={user}
              handleOpenModal={handleOpenModal}
              handleReviewOpen={handleReviewOpen}
            />
          </div>
        )))}
      </div>
    </div>
  );
};

export default ProductPage;
