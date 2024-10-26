import * as actionTypes from "../actions/actionTypes";

const initialState = {
  cart: [],
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      let item = {
        id: action.payload.product.id,
        name: action.payload.product.name,
        price: action.payload.product.price,
        quantity: action.payload.product.quantity,
        options: action.payload.selectedOptions,
        image: action.payload.product.image,
      };
      return {
        ...state,
        cart: [...state.cart, item],
        totalPrice: state.totalPrice + action.payload.price,
      };
    case actionTypes.REMOVE_ITEM:
      const updatedProducts = state.cart.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cart: updatedProducts,
        totalPrice:
          state.totalPrice -
          state.cart.find((item) => item.id === action.payload).price,
      };
    default:
      return state;
  }
};

export default cartReducer;
