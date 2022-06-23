import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name addProductToWishList
 * @description posts a productId and a userId as a wishListItem to the database.
 * @param {*} product product to add,
 * @param {*} userEmail user to add.
 * @param {*} setAdded sets state of favorite button color on product.
 * @returns promo post response, success or error toast
 */
const addProductToWishList = async (product, userEmail, setAdded) => {
  const wishListItem = {};
  wishListItem.productId = product.id;

  await HttpHelper(`${Constants.WISHLIST}/${userEmail}`, 'POST', wishListItem)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(() => {
      toast.success(`${product.name} successfully added to wishlist.`);
      setAdded(true);
    })
    .catch(() => {
      toast.error('Oops, something went wrong.');
    });
};

export default addProductToWishList;
