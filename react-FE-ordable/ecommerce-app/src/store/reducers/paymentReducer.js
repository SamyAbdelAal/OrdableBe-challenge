import * as actionTypes from "../actions/actionTypes";

const initialState = {
  paymentMethods: [],
  paymentUrl: "",
  loading: false,
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PAYMENT_METHODS:
      return {
        ...state,
        paymentMethods: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_PAYMENT_METHODS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.FETCH_PAYMENT_METHODS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.CREATE_PAYMENT:
      return {
        ...state,
        paymentUrl: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_PAYMENT_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default paymentReducer;
