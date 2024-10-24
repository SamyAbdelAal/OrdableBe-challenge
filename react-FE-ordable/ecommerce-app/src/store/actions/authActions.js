import { jwtDecode } from "jwt-decode";

import * as actionTypes from "./actionTypes";
import baseUrl from "./api";
import { toast } from "react-toastify";
export const login = ({ username, password, navigate }) => {
  console.log(
    `🚀 ~ file: authActions.js ~ line 13 ~ login ~ username`,
    username
  );

  return (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_LOGIN_REQUEST,
    });
    return baseUrl
      .post("/login/", { username, password })
      .then((response) => {
        const token = response.data;
        localStorage.setItem("accessToken", token.access);
        localStorage.setItem("refreshToken", token.refresh);
        navigate("/admin");
        console.log(`🚀 ~ .then ~ token:`, token);
      })
      .catch((error) => {
        console.log(`🚀 ~ .catch ~ error`, error.response.data);
        toast.error(error.response.data.detail);
        dispatch({
          type: actionTypes.AUTH_LOGIN_FAILURE,
          payload: error.response.data,
        });
      });
  };
};

// Thunk for logout
export const logoutUser = (navigate) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_LOGOUT,
    });
    // Optionally remove the token from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  baseUrl
    .post("token/refresh/", { refresh: refreshToken })
    .then((response) => {
      localStorage.setItem("accessToken", response.data.access);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setAuthToken = () => {
  const token = localStorage.getItem("accessToken");
  return (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_LOGIN_REQUEST,
    });
    if (!token) {
      dispatch({
        type: actionTypes.AUTH_LOGIN_FAILURE,
        payload: "No token",
      });
      toast.error("Please login to continue");
      return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;
    if (tokenExpiration < now) {
      refreshToken();
    } else {
      dispatch({
        type: actionTypes.AUTH_LOGIN_SUCCESS,
        payload: token,
      });
    }
  };
};
