import { Promocode } from "../../common/types/Types";
import { FETCH_SINGLE_CATEGORY } from "../categories/constants";
import {
  FETCH_ALL_PROMOCODES,
  REQUEST_ALL_PROMOCODES,
  REQUEST_ALL_PROMOCODES_SUCCESS,
  REQUEST_ALL_PROMOCODES_ERROR,
  FETCH_DELETE_PROMOCODE,
  REQUEST_DELETE_PROMOCODE,
  REQUEST_DELETE_PROMOCODE_ERROR,
  REQUEST_DELETE_PROMOCODE_SUCCESS,
  FETCH_CREATE_PROMOCODE,
  REQUEST_CREATE_PROMOCODE,
  REQUEST_CREATE_PROMOCODE_SUCCESS,
  REQUEST_CREATE_PROMOCODE_ERROR,
  REQUEST_SINGLE_PROMOCODE,
  REQUEST_SINGLE_PROMOCODE_ERROR,
  FETCH_SINGLE_PROMOCODE,
  REQUEST_SINGLE_PROMOCODE_SUCCESS,
  FETCH_UPDATE_PROMOCODE,
  REQUEST_UPDATE_PROMOCODE,
  REQUEST_UPDATE_PROMOCODE_ERROR,
  REQUEST_UPDATE_PROMOCODE_SUCCESS,
} from "./constants";

export const fetchAllPromocodes = () => ({
  type: FETCH_ALL_PROMOCODES,
});

export const requestAllPromocodes = () => ({
  type: REQUEST_ALL_PROMOCODES,
});

export const requestAllPromocodesError = () => ({
  type: REQUEST_ALL_PROMOCODES_ERROR,
});

export const requestAllPromocodesSuccess = (promocodes: any) => ({
  type: REQUEST_ALL_PROMOCODES_SUCCESS,
  promocodes,
});

export const fetchDeletePromocode = (promocodeId: string) => ({
  type: FETCH_DELETE_PROMOCODE,
  promocodeId,
});

export const requestDeletePromocode = () => ({
  type: REQUEST_DELETE_PROMOCODE,
});

export const requestDeletePromocodeError = () => ({
  type: REQUEST_DELETE_PROMOCODE_ERROR,
});

export const requestDeletePromocodeSuccess = () => ({
  type: REQUEST_DELETE_PROMOCODE_SUCCESS,
});

export const fetchCreatePromocode = (
  created_promocode: Promocode,
  history: any
) => ({
  type: FETCH_CREATE_PROMOCODE,
  created_promocode,
  history,
});

export const requestCreatePromocode = () => ({
  type: REQUEST_CREATE_PROMOCODE,
});

export const requestCreatePromocodeError = () => ({
  type: REQUEST_CREATE_PROMOCODE_ERROR,
});

export const requestCreatePromocodeSuccess = () => ({
  type: REQUEST_CREATE_PROMOCODE_SUCCESS,
});

export const fetchSinglePromocode = (promocodeId: string) => ({
  type: FETCH_SINGLE_PROMOCODE,
  promocodeId,
});

export const requestSinglePromocode = () => ({
  type: REQUEST_SINGLE_PROMOCODE,
});

export const requestSinglePromocodeError = () => ({
  type: REQUEST_SINGLE_PROMOCODE_ERROR,
});

export const requestSinglePromocodeSuccess = (promocode: any) => ({
  type: REQUEST_SINGLE_PROMOCODE_SUCCESS,
  promocode,
});

export const fetchUpdatePromocode = (
  updated_promocode: Promocode,
  promocodeId: string,
  history: any
) => ({
  type: FETCH_UPDATE_PROMOCODE,
  updated_promocode,
  promocodeId,
  history,
});

export const requestUpdatePromocode = () => ({
  type: REQUEST_UPDATE_PROMOCODE,
});

export const requestUpdatePromocodeError = () => ({
  type: REQUEST_UPDATE_PROMOCODE_ERROR,
});

export const requestUpdatePromocodeSuccess = () => ({
  type: REQUEST_UPDATE_PROMOCODE_SUCCESS,
});
