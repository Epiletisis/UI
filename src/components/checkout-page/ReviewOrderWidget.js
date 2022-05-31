import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCart } from './CartContext';
import OrderItem from './OrderItem';
import { getSubtotal } from './ReviewOrderWidgetService';
import styles from './ReviewOrderWidget.module.css';

/**
 * @name ReviewOrderWidget
 * @description Displays order items and subtotal
 * @return component
 */
const ReviewOrderWidget = () => {
  const {
    state: { products }
  } = useCart();
  const history = useHistory();
  const redirect = () => {
    history.push('/');
  };

  return (
    <>
      {products.map(({
        price, title, description, quantity
      }) => (
        <OrderItem
          key={title}
          price={price}
          title={title}
          description={description}
          quantity={quantity}
        />
      ))}
      <hr />
      <div className={styles.subtotal}>
        <div>
          <p>Subtotal</p>
        </div>
        <div className={styles.price}>
          <p>{getSubtotal(products)}</p>
        </div>
        <div className={styles.keepShopping}>
          {products.length === 0 ? (
            <p>Your cart is empty. Add things here:</p>
          ) : (
            <></>
          )}
          <button onClick={redirect} type="button" className={styles.keepShoppingButton}>
            Keep Shopping
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewOrderWidget;
