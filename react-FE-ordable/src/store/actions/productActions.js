import baseUrl from "./api";
import * as actionTypes from "./actionTypes";
import { setAuthToken } from "./authActions";
import { toast } from "react-toastify";
export const fetchProducts = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_PRODUCTS_LOADING, payload: true });
    baseUrl
      .get(`/products/`)
      .then((response) => {
        dispatch({ type: actionTypes.FETCH_PRODUCTS, payload: response.data });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          dispatch(setAuthToken());
        }
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
        toast.success("Product Created Successfully");
        dispatch({ type: actionTypes.CREATE_PRODUCT, payload: response.data });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          dispatch(setAuthToken());
        }
        toast.error("Product Creation Failed");
        dispatch({ type: actionTypes.CREATE_PRODUCT_ERROR, payload: error });
      });
  };
};

export const updateProduct = (id, product) => {
  return (dispatch) => {
    baseUrl
      .put(`/products/${id}/`, product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        toast.success("Product Updated Successfully");
        dispatch({ type: actionTypes.UPDATE_PRODUCT, payload: response.data });
      })
      .catch((error) => {
        if (error?.response?.status === 401) {
          dispatch(setAuthToken());
        }
        toast.error("Product Update Failed");
        dispatch({ type: actionTypes.UPDATE_PRODUCT_ERROR, payload: error });
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
