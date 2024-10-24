import baseUrl from "./api";
import * as actionTypes from "./actionTypes";
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_LOADING, payload: true });
    baseUrl
      .get(`/products/`)
      .then((response) => {
        dispatch({ type: actionTypes.FETCH_PRODUCTS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.FETCH_PRODUCTS_ERROR, payload: error });
      });
  };
};

export const fetchProductDetail = (productID) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PRODUCT_DETAIL_LOADING });

    baseUrl
      .get(`products/${productID}/`)
      .then((response) => {
        dispatch({
          type: actionTypes.FETCH_PRODUCT_DETAIL,
          payload: response.data,
        });
        console.log(`🚀 ~ .then ~ response.data:`, response.data);
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.FETCH_PRODUCT_DETAIL_ERROR,
          payload: error,
        });
      });
  };
};

export const createProduct = (product) => {
  return (dispatch) => {
    baseUrl
      .post("/products/", product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        dispatch({ type: actionTypes.CREATE_PRODUCT, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.CREATE_PRODUCT_ERROR, payload: error });
      });
  };
};

export const deleteProduct = (productID) => {
  return (dispatch) => {
    baseUrl
      .delete(`/products/${productID}/`)
      .then(() => {})
      .catch((error) => {});
  };
};
