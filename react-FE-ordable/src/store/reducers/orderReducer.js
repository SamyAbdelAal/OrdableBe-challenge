import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.FETCH_ORDERS_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.CREATE_ORDER:
      return {
        ...state,
        orders: state.orders.concat(action.payload),
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_ORDER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        ),
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default orderReducer;
