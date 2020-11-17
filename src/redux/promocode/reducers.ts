import {
  REQUEST_ALL_PROMOCODES,
  REQUEST_ALL_PROMOCODES_SUCCESS,
  REQUEST_ALL_PROMOCODES_ERROR,
  REQUEST_DELETE_PROMOCODE,
  REQUEST_DELETE_PROMOCODE_ERROR,
  REQUEST_DELETE_PROMOCODE_SUCCESS,
  REQUEST_CREATE_PROMOCODE,
  REQUEST_SINGLE_PROMOCODE,
  REQUEST_SINGLE_PROMOCODE_ERROR,
  REQUEST_SINGLE_PROMOCODE_SUCCESS,
  REQUEST_UPDATE_PROMOCODE,
  REQUEST_UPDATE_PROMOCODE_ERROR,
  REQUEST_UPDATE_PROMOCODE_SUCCESS,
} from "./constants";
import { PromocodesState, PromocodeActionType } from "./types";

const initialState: PromocodesState = {
  loading: false,
  promocodes: undefined,
  deleteLoading: false,
  createLoading: false,
  singleLoading: false,
  singlePromocode: undefined,
  updateLoading: false,
};

export const promocodeReducer = (
  state = initialState,
  action: PromocodeActionType
) => {
  switch (action.type) {
    case REQUEST_ALL_PROMOCODES:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_ALL_PROMOCODES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_ALL_PROMOCODES_SUCCESS:
      return {
        ...state,
        loading: false,
        promocodes: action.promocodes,
      };
    case REQUEST_DELETE_PROMOCODE:
      return {
        ...state,
        deleteLoading: true,
      };
    case REQUEST_DELETE_PROMOCODE_ERROR:
      return {
        ...state,
        deleteLoading: false,
      };
    case REQUEST_DELETE_PROMOCODE_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
      };
    case REQUEST_CREATE_PROMOCODE:
      return {
        ...state,
        createLoading: true,
      };
    case REQUEST_CREATE_PROMOCODE:
      return {
        ...state,
        createLoading: false,
      };
    case REQUEST_CREATE_PROMOCODE:
      return {
        ...state,
        createLoading: false,
      };
    case REQUEST_SINGLE_PROMOCODE:
      return {
        ...state,
        singleLoading: true,
      };
    case REQUEST_SINGLE_PROMOCODE_ERROR:
      return {
        ...state,
        singleLoading: false,
      };
    case REQUEST_SINGLE_PROMOCODE_SUCCESS:
      return {
        ...state,
        singleLoading: false,
        singlePromocode: action.promocode,
      };
    case REQUEST_UPDATE_PROMOCODE:
      return {
        ...state,
        updatePromocode: true,
      };
    case REQUEST_UPDATE_PROMOCODE_ERROR:
      return {
        ...state,
        updatePromocode: false,
      };
    case REQUEST_UPDATE_PROMOCODE_SUCCESS:
      return {
        ...state,
        updatePromocode: false,
      };
    default:
      return state;
  }
};
