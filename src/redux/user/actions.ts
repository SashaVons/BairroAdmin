import {
  FETCH_AUTH_USER,
  REQUEST_AUTH_USER,
  REQUEST_AUTH_USER_ERROR,
  REQUEST_AUTH_USER_SUCCESS,
  USER_LOGOUT,
} from "./constants";

export const fetchAuthUser = (
  email: string,
  password: string,
  history: any
) => ({
  type: FETCH_AUTH_USER,
  email,
  password,
  history,
});

export const requestAuthUser = () => ({
  type: REQUEST_AUTH_USER,
});

export const requestAuthUserError = () => ({
  type: REQUEST_AUTH_USER_ERROR,
});

export const requestAuthUserSuccess = (user: any) => ({
  type: REQUEST_AUTH_USER_SUCCESS,
  user,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});
