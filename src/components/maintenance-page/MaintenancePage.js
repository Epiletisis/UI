import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { NavLink } from 'react-router-dom';
import MaintenanceTable from '../maintenance-table/MaintenanceTable';
import styles from './MaintenancePage.module.css';
import Constants from '../../utils/constants';
import fetchProducts from './MaintenancePageService';
// import CreateProductPage from '../create-product-page/CreateProductPage';

/**
 * @name MaintenancePage
 * @description fetches products from API and displays products in a table sorted by ID
 * @return MaintenancePage
 */
const MaintenancePage = () => {
  const [products, setProducts] = useState([]);
  const [apiError, setApiError] = useState(false);
  useEffect(() => {
    fetchProducts(setProducts, setApiError);
  }, []);

  return (
    <div>
      {apiError && <p className={styles.errMsg} data-testid="errMsg">{Constants.API_ERROR}</p>}
      <div className="buttonContainer">
        <NavLink to="/create-product">
          <button className={styles.createNewProductButton} type="submit">
            <text>+  Create New Product</text>
          </button>
        </NavLink>
        <NavLink to="/create-promo">
          <button className={styles.createPromoButton} type="submit">
            <text>+  Create New Promo</text>
          </button>
        </NavLink>
      </div>

      <div>

        <div>
          <TableContainer
            style={{
              height: '700px', width: '95%', margin: 'auto', marginTop: '10px'
            }}
            component={Paper}
          >
            <Table className={styles.MaintenanceTable}>
              <TableHead className={styles.MaintenanceTableHeader}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Sku</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Demographic</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Brand</TableCell>
                  <TableCell>Material</TableCell>
                  <TableCell>ImageSrc</TableCell>
                  <TableCell>Primary Color</TableCell>
                  <TableCell>Secondary Color</TableCell>
                  <TableCell>Style Number</TableCell>
                  <TableCell>Global Product Code</TableCell>
                  <TableCell>Date Created</TableCell>
                  <TableCell>Date Modified</TableCell>
                  <TableCell>Release Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <MaintenanceTable product={product} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
