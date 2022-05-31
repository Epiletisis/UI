import React from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { useCart } from './CartContext';
import styles from './CheckoutPage.module.css';
import ReviewOrderWidget from './ReviewOrderWidget';
import DeliveryAddress from './forms/DeliveryAddress';
import BillingDetails from './forms/BillingDetails';
import makePurchase from './CheckoutService';
import getCheckoutErrorMessages from './CheckoutValidator';

/**
 * @name CheckoutPage
 * @description A view that contains details needed to process a transaction for items
 * @return component
 */
const CheckoutPage = () => {
  const history = useHistory();

  const {
    state: { products }
  } = useCart();

  const [billingData, setBillingData] = React.useState({
    billingStreet: '',
    billingStreet2: '',
    billingCity: '',
    billingZip: '',
    billingState: null,
    email: '',
    phone: '',
    creditCard: '',
    cvv: '',
    expiration: '',
    cardholder: ''
  });
  const [deliveryData, setDeliveryData] = React.useState({
    firstName: '',
    lastName: '',
    street: '',
    street2: '',
    city: '',
    zip: '',
    state: null
  });
  const [errors, setErrors] = React.useState({});
  const [checked, setChecked] = React.useState(false);

  const onBillingChange = (e) => {
    setBillingData({ ...billingData, [e.target.id]: e.target.value });
  };

  const onDeliveryChange = (e) => {
    setDeliveryData({ ...deliveryData, [e.target.id]: e.target.value });
  };

  const isFormValid = () => {
    const errorMessages = getCheckoutErrorMessages(billingData, deliveryData, checked);
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const handleCheck = () => {
    setChecked(!checked);
  };
  const handlePay = () => {
    const productData = products.map(({ id, quantity }) => ({ productId: id, quantity }));
    const deliveryAddress = {
      deliveryFirstName: deliveryData.firstName,
      deliveryLastName: deliveryData.lastName,
      deliveryStreet: deliveryData.street,
      deliveryStreet2: deliveryData.street2,
      deliveryCity: deliveryData.city,
      deliveryState: deliveryData.state,
      deliveryZip: deliveryData.zip
    };
    const billingAddress = {};
    if (checked) {
      billingAddress.billingStreet = deliveryAddress.deliveryStreet;
      billingAddress.billingStreet2 = deliveryAddress.deliveryStreet2;
      billingAddress.billingCity = deliveryAddress.deliveryCity;
      billingAddress.billingState = deliveryAddress.deliveryState;
      billingAddress.billingZip = deliveryAddress.deliveryZip;
    } else {
      billingAddress.billingStreet = billingData.billingStreet;
      billingAddress.billingStreet2 = billingData.billingStreet2;
      billingAddress.billingCity = billingData.billingCity;
      billingAddress.billingState = billingData.billingState;
      billingAddress.billingZip = billingData.billingZip;
    }
    billingAddress.email = billingData.email;
    billingAddress.phone = billingData.phone;

    const creditCard = {
      cardNumber: billingData.creditCard,
      cvv: billingData.cvv,
      expiration: billingData.expiration,
      cardholder: billingData.cardholder
    };

    if (isFormValid()) {
      toast.success('Transaction Successful');
      makePurchase(productData, deliveryAddress, billingAddress, creditCard).then(() => history.push('/confirmation'));
    } else {
      toast.error('Transaction Failed');
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <div className={`${styles.step} ${styles.order}`}>
        <h3 className={styles.title}>1. Review Order</h3>
        <ReviewOrderWidget />
      </div>
      <div className={`${styles.step} ${styles.delivery}`}>
        <h3 className={styles.title}>2. Delivery Address</h3>
        <DeliveryAddress
          onChange={onDeliveryChange}
          deliveryData={deliveryData}
          errors={errors}
        />
        <label htmlFor="useSame" className={styles.sameAddressText}>
          <div className={styles.useSameAddress}>
            <input
              id="useSame"
              onChange={handleCheck}
              type="checkbox"
              value={checked}
            />
          </div>
          Same Billing Address
        </label>
      </div>
      <div className={`${styles.step} ${styles.payment}`}>
        <h3 className={styles.title}>3. Billing Details</h3>
        <BillingDetails
          onChange={onBillingChange}
          billingData={billingData}
          useShippingForBilling={checked}
          errors={errors}
        />
      </div>
      <div className={styles.payNow}>
        <button onClick={handlePay} type="button" className={styles.payButton}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
