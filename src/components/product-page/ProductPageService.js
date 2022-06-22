import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
const fetchProducts = async (setProducts, setApiError, filters) => {
  const joinedFilters = filters.join('');
  await HttpHelper(`${Constants.PRODUCTS_ACTIVE_ENDPOINT}${joinedFilters}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProducts)
    .catch(() => {
      setApiError(true);
    });
};

/**
 *
 * @name addProductToWishList
 * @description sends a promo request
 * @param {*} promo promo to create
 * @param {*} hitory history
 * @returns promo post response, success or error toast
 */
const addProductToWishList = async (product, user, setAdded) => {
  const wishListItem = {};
  wishListItem.productId = product.id;
  wishListItem.userid = user.id;

  await HttpHelper(Constants.WISHLIST, 'POST', wishListItem)
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

export { addProductToWishList };
export default fetchProducts;
