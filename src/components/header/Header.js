import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import { ShoppingCartOutlined } from '@material-ui/icons';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import fellowShipLogo from '../../utils/Images/Fellowshiplogo.png';
import styles from './Header.module.css';
/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const [user, setUser] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);
  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };
  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError('There was a problem logging in with Google. Please wait and try again later.');
  };
  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
  };
  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError('There was a problem logging out with Google. Please wait and try again later.');
  };
  return (
    <div className={styles.Header}>
      <NavLink to="/home">
        <img src={fellowShipLogo} alt="Home" id={styles.Headerlogo} className={styles.Header} />
      </NavLink>
      <NavLink to="/checkout">
        <ShoppingCartOutlined alt="cart" id={styles.Carticon} className={styles.Header} />
      </NavLink>
      {user && <span className={styles.Buttontext}>{user.firstName}</span>}
      {user && <span className={styles.Buttontext}>{user.lastName}</span>}
      {googleError && <span>{googleError}</span>}
      {apiError && <span>Api Error</span>}
      {!user ? (
        <GoogleLogin
          className={styles.Loginbutton}
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      ) : (
        <GoogleLogout
          className={styles.Logoutbutton}
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleGoogleLogoutSuccess}
          onFailure={handleGoogleLogoutFailure}
        />
      )}
    </div>
  );
};
export default Header;
