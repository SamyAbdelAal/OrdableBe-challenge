import baseUrl from "./api";
import { createPayment } from "./";
import * as actionTypes from "./actionTypes";
export const createOrder = (order) => {
  return (dispatch) => {
    baseUrl
      .post("/orders/", order)
      .then((response) => {
        console.log(`🚀 ~ .then ~ response.data:`, response.data);
        dispatch(
          createPayment({
            order_id: response.data.id,
          })
        );
        dispatch({ type: "CREATE_ORDER", payload: response.data });
      })
      .catch((error) => {
        console.log(`🚀 ~ .catch ~ error`, JSON.stringify(error, null, 2));
        dispatch({ type: "CREATE_ORDER_ERROR", payload: error });
      });
  };
};

export const fetchOrders = () => {
  return (dispatch) => {
    baseUrl
      .get("/orders/")
      .then((response) => {
        console.log(`🚀 ~ .then ~ response:`, response);
        dispatch({ type: actionTypes.FETCH_ORDERS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.FETCH_ORDERS_ERROR, payload: error });
      });
  };
};

export const updateOrder = (order) => {
  return (dispatch) => {
    baseUrl
      .put(`/orders/${order.id}/`, order)
      .then((response) => {
        dispatch({ type: actionTypes.UPDATE_ORDER, payload: response.data });
      })
      .catch((error) => {
        // dispatch({ type: "UPDATE_ORDER_ERROR", payload: error });
      });
  };
};
