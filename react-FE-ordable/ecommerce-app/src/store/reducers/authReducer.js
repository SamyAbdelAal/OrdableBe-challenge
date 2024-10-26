import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authorized: false,
  is_admin: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: action.payload,
        is_admin: action.payload.is_admin,
      };
    case actionTypes.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        authorized: false,
        error: action.payload,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        authorized: false,
      };
    default:
      return state;
  }
};

export default authReducer;
