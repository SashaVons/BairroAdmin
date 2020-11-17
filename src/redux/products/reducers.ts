import {
  REQUEST_ALL_PRODUCTS,
  REQUEST_ALL_PRODUCTS_ERROR,
  REQUEST_ALL_PRODUCTS_SUCCESS,
  REQUEST_CREATE_PRODUCT,
  REQUEST_CREATE_PRODUCT_ERROR,
  REQUEST_CREATE_PRODUCT_SUCCESS,
  REQUEST_DELETE_PRODUCT,
  REQUEST_DELETE_PRODUCT_ERROR,
  REQUEST_DELETE_PRODUCT_SUCCESS,
  REQUEST_SINGLE_PRODUCT,
  REQUEST_SINGLE_PRODUCT_ERROR,
  REQUEST_SINGLE_PRODUCT_SUCCESS,
  REQUEST_UPDATE_PRODUCT,
  REQUEST_UPDATE_PRODUCT_ERROR,
  REQUEST_UPDATE_PRODUCT_SUCCESS,
} from "./constants";
import { ProductsState, ProductsActionType } from "./types";

const initialState: ProductsState = {
  loading: false,
  updateLoading: false,
  deleteLoading: false,
  singleLoading: false,
  products: undefined,
  singleProduct: undefined,
  createLoading: false,
};

export const productReducer = (
  state = initialState,
  action: ProductsActionType
) => {
  switch (action.type) {
    case REQUEST_ALL_PRODUCTS:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.products,
      };
    case REQUEST_CREATE_PRODUCT:
      return {
        ...state,
        createLoading: true,
      };
    case REQUEST_CREATE_PRODUCT_ERROR:
      return {
        ...state,
        createLoading: false,
      };
    case REQUEST_CREATE_PRODUCT_SUCCESS:
      return {
        ...state,
        createLoading: false,
      };
    case REQUEST_DELETE_PRODUCT:
      return {
        ...state,
        deleteLoading: true,
      };
    case REQUEST_DELETE_PRODUCT_ERROR:
      return {
        ...state,
        deleteLoading: false,
      };
    case REQUEST_DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
      };
    case REQUEST_SINGLE_PRODUCT:
      return {
        ...state,
        singleLoading: true,
      };
    case REQUEST_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        singleLoading: false,
      };
    case REQUEST_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleLoading: false,
        singleProduct: action.singleProduct,
      };
    case REQUEST_UPDATE_PRODUCT:
      return {
        ...state,
        updateLoading: true,
      };
    case REQUEST_UPDATE_PRODUCT_ERROR:
      return {
        ...state,
        updateLoading: false,
      };
    case REQUEST_UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        updateLoading: false,
      };
    default:
      return state;
  }
};
