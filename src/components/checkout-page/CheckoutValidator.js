/**
 * Validates the billing/delivery address and credit card information while also returning
 * errorMessages to be displayed
 * @param {*} billingData Data that was inputed in the billing input boxes
 * @param {*} deliveryData Data that was inputed in the delivery input boxes
 * @param {*} sameBillingAddressChecked Says whether the checkbox is checked if billing
 * information is the same as the delivery
 * @returns errorMessages — returns errors, if any
 */
const getCheckoutErrorMessages = (billingData, deliveryData, sameBillingAddressChecked) => {
  const errorMessages = {};
  const checkNumbers = /^[0-9]*$/;
  const validZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
  const validPhoneNumber = /^[1-9]\d{2}-\d{3}-\d{4}$/;
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validStreet = /^\s*\S+(?:\s+\S+){2}/;
  const validCity = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

  if (sameBillingAddressChecked === false) {
    if (billingData.billingStreet === '') {
      errorMessages.billingStreet = 'This field is required.';
    } else if (!validStreet.exec(billingData.billingStreet)) {
      errorMessages.billingStreet = 'Enter valid street address.';
    }
    if (billingData.billingCity === '') {
      errorMessages.billingCity = 'This field is required.';
    } else if (!validCity.exec(billingData.billingCity)) {
      errorMessages.billingCity = 'Enter valid city.';
    }
    if (billingData.billingZip === '') {
      errorMessages.billingZip = 'This field is required.';
    } else if (!validZip.test(billingData.billingZip)) {
      errorMessages.billingZip = 'Enter valid zip code.';
    }
    if (billingData.billingState === 'Select state' || billingData.billingState === null) {
      errorMessages.billingState = 'This field is required.';
    }
  }

  if (billingData.email === '') {
    errorMessages.email = 'This field is required';
  } else if (!validEmail.exec(billingData.email)) {
    errorMessages.email = 'Enter valid email address';
  }

  if (billingData.phone === '') {
    errorMessages.phone = 'This field is required';
  } else if (!validPhoneNumber.exec(billingData.phone)) {
    errorMessages.phone = 'Enter valid phone number';
  }

  if (deliveryData.firstName.trim() === '' && deliveryData.firstName.trim().length === 0) {
    errorMessages.firstName = 'This field is required.';
  } else if (checkNumbers.exec(deliveryData.firstName)) {
    errorMessages.firstName = 'Enter valid first name.';
  }
  if (deliveryData.lastName === '' && deliveryData.lastName.trim().length === 0) {
    errorMessages.lastName = 'This field is required.';
  } else if (checkNumbers.exec(deliveryData.lastName)) {
    errorMessages.lastName = 'Enter valid last name.';
  }
  if (deliveryData.street === '') {
    errorMessages.street = 'This field is required.';
  } else if (!validStreet.exec(deliveryData.street)) {
    errorMessages.street = 'Enter valid street address';
  }
  if (deliveryData.city === '') {
    errorMessages.city = 'This field is required.';
  } else if (!validCity.exec(deliveryData.city)) {
    errorMessages.city = 'Enter valid city.';
  }
  if (deliveryData.zip === '') {
    errorMessages.zip = 'This field is required.';
  } else if (!validZip.test(deliveryData.zip)) {
    errorMessages.zip = 'Enter valid zip code.';
  }
  if (deliveryData.state === 'Select state' || deliveryData.state === null) {
    errorMessages.state = 'This field is required';
  }

  const validCardNumber = /^(51|52|53|54|55)[0-9]{14}$|^(4)[0-9]{15}$/;

  if (billingData.creditCard === null || billingData.creditCard === '') {
    errorMessages.cardNumber = 'This field is required';
  } else if (billingData.creditCard.length !== 16
             || !validCardNumber.exec(billingData.creditCard)) {
    errorMessages.cardNumber = 'Enter a valid Visa or MasterCard card number';
  }

  const validCVV = /^[0-9]{3}$/;

  if (billingData.cvv === null || billingData.cvv === '') {
    errorMessages.cvv = 'This field is required';
  } else if (!validCVV.exec(billingData.cvv)) {
    errorMessages.cvv = 'Enter a valid CVV';
  }

  /**
   * Validates the expiration date making sure the date matches the correct format
   * as well as making sure expiration date entered is not past the current date.
   * @param {*} expirationInputed Date that was inputed as the expiration for the credit card
   * @returns Boolean of whether the expiration is valid or not
   */
  const checkExpiration = (expirationInputed) => {
    const today = new Date();
    const currentMonth = Number(String(today.getMonth() + 1).padStart(2, '0'));
    const currentYear = Number(today.getFullYear().toString().slice(-2));
    const expirationArr = expirationInputed.toString().split('/');
    const expMonth = parseInt(expirationArr[0], 10);
    const expYear = parseInt(expirationArr[1], 10);
    const validExpDate = /^0[1-9]|1[0-2]\/[0-9]{2}$/;

    return (validExpDate.exec(expirationInputed)
        && (expMonth[0] === 0) !== (expMonth[1] === 0)
        && expYear < currentYear)
        || (expYear === currentYear && expMonth < currentMonth);
  };

  if (billingData.expiration === null || billingData.expiration === '') {
    errorMessages.expiration = 'This field is required';
  } else if (checkExpiration(billingData.expiration)) {
    errorMessages.expiration = 'Enter a valid expiration date';
  }

  if (billingData.cardholder === null || billingData.cardholder === '') {
    errorMessages.cardholder = 'This field is required';
  }
  return errorMessages;
};

export default getCheckoutErrorMessages;
