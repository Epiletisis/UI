import React, { useEffect, useState } from 'react';
import styles from './MaintenancePage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './MaintenancePageService';

/**
 * @name ProductPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const MaintenancePage = () => {
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchProducts(setApiError);
  }, []);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
    </div>
  );
};

export default MaintenancePage;
