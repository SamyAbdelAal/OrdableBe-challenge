import * as actionTypes from "./actionTypes";

export const addItem = (product, selectedOptions) => ({
  type: actionTypes.ADD_ITEM,
  payload: { product, selectedOptions },
});

export const removeItem = (productId) => ({
  type: actionTypes.REMOVE_ITEM,
  payload: productId,
});
