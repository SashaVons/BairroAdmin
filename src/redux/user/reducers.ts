import { getLocalStorage } from "../../common/auth/getStorage";
import {
  REQUEST_AUTH_USER,
  REQUEST_AUTH_USER_SUCCESS,
  REQUEST_AUTH_USER_ERROR,
  USER_LOGOUT,
} from "./constants";
import { UserState, UserActionType } from "./types";

const initialState: UserState = {
  loading: false,
  user: getLocalStorage("user"),
};

export const userReducer = (state = initialState, action: UserActionType) => {
  switch (action.type) {
    case REQUEST_AUTH_USER:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_AUTH_USER_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_AUTH_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    case USER_LOGOUT:
      localStorage.clear();
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
