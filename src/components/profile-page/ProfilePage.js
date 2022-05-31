import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import getUserByEmail from './ProfilePageService';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [user, setUser] = useState('');
  const history = useHistory();
  const userEmail = localStorage.getItem('userEmail');

  const isUserLoggedIn = () => {
    if (userEmail == null) {
      history.push('/');
    }
  };

  useEffect(() => {
    getUserByEmail(userEmail, setUser);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isUserLoggedIn();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.ProfilePageContainer}>
      <h3 className={styles.title}>Profile</h3>
      <label htmlFor="firstName" className={styles.firstName}>
        <font size="+2">First Name</font>
        <div className={styles.firstNameText}>
          {user.firstName}
        </div>
      </label>
      <label htmlFor="lastName" className={styles.lastName}>
        <font size="+2">Last Name</font>
        <div className={styles.lastNameText}>
          {user.lastName}
        </div>
      </label>
      <label htmlFor="street" className={styles.street}>
        <font size="+2">Street</font>
        <div className={styles.streetText}>
          {user.street}
        </div>
      </label>
      <label htmlFor="street2" className={styles.street2}>
        <font size="+2">Street 2</font>
        <div className={styles.street2Text}>
          {user.street2}
        </div>
      </label>
      <label htmlFor="city" className={styles.city}>
        <font size="+2">City</font>
        <div className={styles.cityText}>
          {user.city}
        </div>
      </label>
      <label htmlFor="state" className={styles.state}>
        <font size="+2">State</font>
        <div className={styles.stateText}>
          {user.state}
        </div>
      </label>
      <label htmlFor="zip" className={styles.zip}>
        <font size="+2">Zip</font>
        <div className={styles.zipText}>
          {user.zip}
        </div>
      </label>

    </div>
  );
};

export default ProfilePage;
