/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import postPromo from './CreatePromoService';
import CreatePromoForm from './CreatePromoForm';
import styles from './CreatePromoPage.module.css';

const CreatePromoPage = () => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [promoData, setPromoData] = useState({
    title: '',
    description: '',
    type: '$',
    rate: ''
  });

  const isPromoValid = () => {
    const errorMessages = {};
    if (promoData.title.trim() === '') {
      errorMessages.title = 'This field is required.';
    } else if (promoData.title.length > 20) {
      errorMessages.title = 'Max character limit of 20.';
    }

    if (promoData.description.trim() === '') {
      errorMessages.description = 'This field is required.';
    } else if (promoData.description.length > 100) {
      errorMessages.description = 'Max character limit of 100.';
    }

    if (promoData.type.trim() === '') {
      errorMessages.type = 'This field is required.';
    }

    if (promoData.rate.trim() === '') {
      errorMessages.rate = 'This field is required.';
    } else if
    (promoData.type === '%' && promoData.rate < 0.01) {
      errorMessages.rate = 'Rate must be greater that 0.01 for percent type promos.';
    } else if (promoData.type === '%' && promoData.rate > 100) {
      errorMessages.rate = 'Rate must be less than 100 for percent type  promos.';
    } else if (promoData.type === '$' && promoData.rate <= 0) {
      errorMessages.rate = 'Rate must be greater than zero for flat type promos.';
    }

    return errorMessages;
  };

  const onPromoChange = (e) => {
    if (e.target.id === 'rate') {
      if (e.target.value.match(/^([0-9]{0,15}(\.[0-9]{0,2}){0,1})$|^$/)) {
        setPromoData({ ...promoData, [e.target.id]: e.target.value });
      }
    } else {
      setPromoData({ ...promoData, [e.target.id]: e.target.value });
    }
  };

  const checkErrors = (newPromo) => {
    const errorMessages = isPromoValid(newPromo);
    setErrors(errorMessages);
    return Object.keys(errorMessages).length === 0;
  };

  const handleCreatePromo = () => {
    const newPromo = {
      title: promoData.title,
      description: promoData.description,
      type: promoData.type,
      rate: promoData.rate
    };
    if (checkErrors(newPromo)) {
      postPromo(newPromo, history);
    }
  };

  return (
    <div>
      <div className={styles.createPromoContainer}>
        <h3 className={styles.createPromoTitle}>Create Promotional Discount</h3>

        <CreatePromoForm
          errors={errors}
          onChange={onPromoChange}
          promoData={promoData}
        />

        <button className={styles.createPromoButton} onClick={handleCreatePromo} type="button">
          Create Promo
        </button>
      </div>
    </div>
  );
};

export default CreatePromoPage;
