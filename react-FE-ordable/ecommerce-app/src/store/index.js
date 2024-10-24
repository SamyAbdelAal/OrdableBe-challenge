import { createStore, combineReducers, applyMiddleware } from "redux";
import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productsReducer";
import authReducer from "./reducers/authReducer";
import orderReducer from "./reducers/orderReducer";
import paymentReducer from "./reducers/paymentReducer";
import { thunk } from "redux-thunk";

const middleware = [thunk];

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  auth: authReducer,
  payment: paymentReducer,
  order: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
