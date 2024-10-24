import BaseUrl from "./api";
import * as actionTypes from "./actionTypes";

export const fetchPaymentMethods = () => {
  return async (dispatch, getState) => {
    dispatch({ type: actionTypes.FETCH_PAYMENT_METHODS_LOADING });
    BaseUrl.post("/payment-methods/", {
      InvoiceAmount: getState().cart.totalPrice,
      CurrencyIso: "KWD",
    })
      .then((response) => {
        console.log(`🚀 ~ response.data:`, response.data);

        dispatch({
          type: actionTypes.FETCH_PAYMENT_METHODS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(`🚀 ~ error`, error);

        dispatch({
          type: actionTypes.FETCH_PAYMENT_METHODS_ERROR,
          payload: error,
        });
      });
  };
};

export const createPayment = (paymentData) => {
  return async (dispatch) => {
    dispatch({ type: actionTypes.CREATE_PAYMENT_LOADING });
    BaseUrl.post("/initiate-payment/", paymentData)
      .then((response) => {
        console.log(`🚀 ~ response.data:`, response.data);
        window.location.href = response.data.payment_url;
        dispatch({
          type: actionTypes.CREATE_PAYMENT,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(`🚀 ~ error`, error);

        dispatch({
          type: actionTypes.CREATE_PAYMENT_ERROR,
          payload: error,
        });
      });
  };
};
