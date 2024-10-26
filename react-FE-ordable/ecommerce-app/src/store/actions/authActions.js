import { jwtDecode } from "jwt-decode";

import * as actionTypes from "./actionTypes";
import baseUrl from "./api";
import { toast } from "react-toastify";
export const login = ({ username, password, navigate }) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_LOGIN_REQUEST,
    });
    return baseUrl
      .post("/login/", { username, password })
      .then((response) => {
        const token = response?.data;
        localStorage.setItem("accessToken", token.access);
        localStorage.setItem("refreshToken", token.refresh);
        localStorage.setItem("is_admin", token.is_admin);
        if (token.is_admin) navigate("/admin");
        else navigate("/");
        dispatch({
          type: actionTypes.AUTH_LOGIN_SUCCESS,
          payload: token,
        });
      })
      .catch((error) => {
        toast.error(error?.response?.data?.detail);
        dispatch({
          type: actionTypes.AUTH_LOGIN_FAILURE,
          payload: error?.response?.data,
        });
      });
  };
};

export const register = ({ username, password, navigate }) => {
  return (dispatch) => {
    return baseUrl
      .post("/user/register/", { username, password })
      .then((response) => {
        toast.success("Registration successful.");
        dispatch(login({ username, password, navigate }));
      })
      .catch((error) => {
        console.log(`🚀 ~ return ~ error:`, error);
        toast.error(error?.response?.data?.username[0]);
      });
  };
};

export const logoutUser = (navigate) => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.AUTH_LOGOUT,
    });
    // Optionally remove the token from local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("is_admin");
    navigate("/login");
  };
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  baseUrl
    .post("token/refresh/", { refresh: refreshToken })
    .then((response) => {
      localStorage.setItem("accessToken", response?.data?.access);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const setAuthToken = (navigate) => {
  const token = localStorage.getItem("accessToken");
  return (dispatch) => {
    if (!token) {
      dispatch({
        type: actionTypes.AUTH_LOGIN_FAILURE,
        payload: "No token",
      });
      toast.error("Please login to continue");
      navigate && navigate("/login");
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
        payload: { token, is_admin: localStorage.getItem("is_admin") },
      });
    }
  };
};
