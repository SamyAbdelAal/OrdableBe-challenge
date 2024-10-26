import * as actionTypes from "../actions/actionTypes";

const initialState = {
  products: [],
  product: {},
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_PRODUCTS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case actionTypes.FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.FETCH_PRODUCT_DETAIL:
      return {
        ...state,
        product: action.payload,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_PRODUCT_DETAIL_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.FETCH_PRODUCT_DETAIL_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.CREATE_PRODUCT:
      return {
        ...state,
        products: state.products.concat(action.payload),
        loading: false,
        error: null,
      };
    case actionTypes.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        loading: false,
        error: null,
      };
    case actionTypes.CREATE_PRODUCT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case actionTypes.UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
};

export default productReducer;
