import { Action } from "redux";
import { Promocode } from "../../common/types/Types";
import {
  FETCH_ALL_PROMOCODES,
  FETCH_CREATE_PROMOCODE,
  FETCH_DELETE_PROMOCODE,
  FETCH_SINGLE_PROMOCODE,
  FETCH_UPDATE_PROMOCODE,
  REQUEST_ALL_PROMOCODES,
  REQUEST_ALL_PROMOCODES_ERROR,
  REQUEST_ALL_PROMOCODES_SUCCESS,
  REQUEST_CREATE_PROMOCODE,
  REQUEST_CREATE_PROMOCODE_ERROR,
  REQUEST_CREATE_PROMOCODE_SUCCESS,
  REQUEST_DELETE_PROMOCODE,
  REQUEST_DELETE_PROMOCODE_ERROR,
  REQUEST_DELETE_PROMOCODE_SUCCESS,
  REQUEST_SINGLE_PROMOCODE,
  REQUEST_SINGLE_PROMOCODE_ERROR,
  REQUEST_SINGLE_PROMOCODE_SUCCESS,
  REQUEST_UPDATE_PROMOCODE,
  REQUEST_UPDATE_PROMOCODE_ERROR,
  REQUEST_UPDATE_PROMOCODE_SUCCESS,
} from "./constants";

interface RequestAllPromocode {
  type: typeof REQUEST_ALL_PROMOCODES;
}

interface RequestAllPromocodeError {
  type: typeof REQUEST_ALL_PROMOCODES_ERROR;
}

interface RequestAllPromocodeSuccess {
  type: typeof REQUEST_ALL_PROMOCODES_SUCCESS;
  promocodes: any;
}

interface RequestDeletePromocode {
  type: typeof REQUEST_DELETE_PROMOCODE;
}

interface RequestDeletePromocodeError {
  type: typeof REQUEST_DELETE_PROMOCODE_ERROR;
}

interface RequestDeletePromocodeSuccess {
  type: typeof REQUEST_DELETE_PROMOCODE_SUCCESS;
}

interface RequestCreatePromocode {
  type: typeof REQUEST_CREATE_PROMOCODE;
}

interface RequestCreatePromocodeError {
  type: typeof REQUEST_CREATE_PROMOCODE_ERROR;
}

interface RequestCreatePromocodeSuccess {
  type: typeof REQUEST_CREATE_PROMOCODE_SUCCESS;
}

interface RequestSinglePromocode {
  type: typeof REQUEST_SINGLE_PROMOCODE;
}

interface RequestSinglePromocodeError {
  type: typeof REQUEST_SINGLE_PROMOCODE_ERROR;
}

interface RequestSinglePromocodeSuccess {
  type: typeof REQUEST_SINGLE_PROMOCODE_SUCCESS;
  promocode: any;
}

interface RequestUpdatePromocode {
  type: typeof REQUEST_UPDATE_PROMOCODE;
}

interface RequestUpdatePromocodeError {
  type: typeof REQUEST_UPDATE_PROMOCODE_ERROR;
}

interface RequestUpdatePromocodeSuccess {
  type: typeof REQUEST_UPDATE_PROMOCODE_SUCCESS;
}

export type PromocodeActionType =
  | RequestAllPromocode
  | RequestAllPromocodeError
  | RequestAllPromocodeSuccess
  | RequestDeletePromocode
  | RequestDeletePromocodeError
  | RequestDeletePromocodeSuccess
  | RequestCreatePromocode
  | RequestCreatePromocodeError
  | RequestCreatePromocodeSuccess
  | RequestSinglePromocode
  | RequestSinglePromocodeError
  | RequestSinglePromocodeSuccess
  | RequestUpdatePromocode
  | RequestUpdatePromocodeError
  | RequestUpdatePromocodeSuccess;

export interface PromocodesState {
  loading: boolean;
  promocodes: any;
  deleteLoading: boolean;
  createLoading: boolean;
  singleLoading: boolean;
  singlePromocode: any;
  updateLoading: boolean;
}

export interface AllPromocodes extends Action {
  type: typeof FETCH_ALL_PROMOCODES;
}

export interface DeletePromocodeAction extends Action, FetchDeletePromocode {
  type: typeof FETCH_DELETE_PROMOCODE;
}

export interface FetchDeletePromocode {
  promocodeId: string;
}

export interface CreatePromocodeAction extends Action, FetchCreatePromocode {
  type: typeof FETCH_CREATE_PROMOCODE;
}

export interface FetchCreatePromocode {
  created_promocode: Promocode;
  history: any;
}

export interface SinglePromocodeAction extends Action, FetchSinglePromocode {
  type: typeof FETCH_SINGLE_PROMOCODE;
}

export interface FetchSinglePromocode {
  promocodeId: string;
}

export interface UpdatePromocodeAction extends Action, FetchUpdatePromocode {
  type: typeof FETCH_UPDATE_PROMOCODE;
}

export interface FetchUpdatePromocode {
  updated_promocode: Promocode;
  promocodeId: string;
  history: any;
}
