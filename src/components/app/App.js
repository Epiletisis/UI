import React from 'react';
import '../toast/Toast.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast, Slide } from 'react-toastify';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import ToastPage from '../toast-page/ToastPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import Header from '../header/Header';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <ToastContainer
      position={toast.POSITION.TOP_CENTER}
      autoClose={8000}
      transition={Slide}
      progressStyle={{ backgroundColor: 'white' }}
      pauseOnHover={false}
      closeOnClick={false}
    />
    <Header />
    <Switch>
      <Route exact path="/" render={() => <ProductPage />} />
      <Route exact path="/checkout" render={() => <CheckoutPage />} />
      <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
      <Route exact path="/toast" render={() => <ToastPage />} />
      <Route exact path="/maintenance" render={() => <MaintenancePage />} />
    </Switch>
  </BrowserRouter>
);

export default App;
