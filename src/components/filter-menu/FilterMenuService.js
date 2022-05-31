import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchBrands
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setBrands sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for Brands if 200 response, else sets state for apiError
 */
export const fetchBrands = async (setBrands) => {
  await HttpHelper(Constants.PRODUCT_BRANDS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setBrands);
};

/**
 *
 * @name fetchCategories
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setCategories sets state for categories
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for Brands if 200 response, else sets state for apiError
 */
export const fetchCategories = async (setCategories) => {
  await HttpHelper(Constants.PRODUCT_CATEGORIES_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setCategories);
};

/**
 *
 * @name fetchDemographics
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setDemographics sets state for demographics
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for Brands if 200 response, else sets state for apiError
 */
export const fetchDemographics = async (setDemographics) => {
  await HttpHelper(Constants.PRODUCT_DEMOGRAPHICS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setDemographics);
};

/**
 *
 * @name fetchColors
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setColors sets state for colors
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for Brands if 200 response, else sets state for apiError
 */
export const fetchColors = async (setColors) => {
  await HttpHelper(Constants.PRODUCT_COLORS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setColors);
};

/**
 *
 * @name fetchMaterials
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setMaterials sets state for materials
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for Brands if 200 response, else sets state for apiError
 */
export const fetchMaterials = async (setMaterials) => {
  await HttpHelper(Constants.PRODUCT_MATERIALS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setMaterials);
};
