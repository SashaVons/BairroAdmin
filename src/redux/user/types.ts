import { Action } from "redux";
import {
  FETCH_AUTH_USER,
  REQUEST_AUTH_USER,
  REQUEST_AUTH_USER_ERROR,
  REQUEST_AUTH_USER_SUCCESS,
  USER_LOGOUT,
} from "./constants";

interface RequestAuthUser {
  type: typeof REQUEST_AUTH_USER;
}

interface RequestAuthUserError {
  type: typeof REQUEST_AUTH_USER_ERROR;
}

interface RequestAuthUserSuccess {
  type: typeof REQUEST_AUTH_USER_SUCCESS;
  user: any;
}

interface UserLogout {
  type: typeof USER_LOGOUT;
}

export type UserActionType =
  | RequestAuthUser
  | RequestAuthUserError
  | RequestAuthUserSuccess
  | UserLogout;

export interface UserState {
  loading: boolean;
  user: any;
}

export interface AuthUserAction extends Action, FetchAuthUser {
  type: typeof FETCH_AUTH_USER;
}

export interface FetchAuthUser {
  email: string;
  password: string;
  history: any;
}
