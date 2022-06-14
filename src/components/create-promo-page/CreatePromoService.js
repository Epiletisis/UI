import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name postPromo
 * @description sends a promo request
 * @param {*} promo promo to create
 * @param {*} hitory history
 * @returns promo post response, success or error toast
 */
const postPromo = async (promo, history) => {
  await HttpHelper(Constants.PROMOS, 'POST', promo)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(() => {
      toast.success('Your promo was successfully created.');
      history.push('../../maintenance');
    })
    .catch(() => {
      toast.error('Oops, something went wrong.');
    });
};
export default postPromo;
