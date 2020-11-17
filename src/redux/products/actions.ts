import { Product } from "../../common/types/Types";
import {
  FETCH_ALL_PRODUCTS,
  REQUEST_ALL_PRODUCTS_SUCCESS,
  REQUEST_ALL_PRODUCTS,
  REQUEST_ALL_PRODUCTS_ERROR,
  FETCH_CREATE_PRODUCT,
  FETCH_DELETE_PRODUCT,
  REQUEST_DELETE_PRODUCT,
  REQUEST_DELETE_PRODUCT_SUCCESS,
  REQUEST_DELETE_PRODUCT_ERROR,
  FETCH_SINGLE_PRODUCT,
  REQUEST_SINGLE_PRODUCT,
  REQUEST_SINGLE_PRODUCT_SUCCESS,
  REQUEST_SINGLE_PRODUCT_ERROR,
  FETCH_UPDATE_PRODUCT,
  REQUEST_UPDATE_PRODUCT,
  REQUEST_UPDATE_PRODUCT_ERROR,
  REQUEST_UPDATE_PRODUCT_SUCCESS,
} from "./constants";

export const fetchAllProducts = () => ({
  type: FETCH_ALL_PRODUCTS,
});

export const requestAllProducts = () => ({
  type: REQUEST_ALL_PRODUCTS,
});

export const requestAllProductsError = () => ({
  type: REQUEST_ALL_PRODUCTS_ERROR,
});

export const requestAllProductsSuccess = (products: any) => ({
  type: REQUEST_ALL_PRODUCTS_SUCCESS,
  products,
});

export const fetchCreateProduct = (created_product: Product, history: any) => ({
  type: FETCH_CREATE_PRODUCT,
  created_product,
  history,
});

export const requestCreateProduct = () => ({
  type: REQUEST_ALL_PRODUCTS,
});

export const requestCreateProductError = () => ({
  type: REQUEST_ALL_PRODUCTS_ERROR,
});

export const requestCreateProductSuccess = () => ({
  type: REQUEST_ALL_PRODUCTS_SUCCESS,
});

export const fetchDeleteProduct = (productId: string) => ({
  type: FETCH_DELETE_PRODUCT,
  productId,
});

export const requestDeleteProduct = () => ({
  type: REQUEST_DELETE_PRODUCT,
});

export const requestDeleteProductError = () => ({
  type: REQUEST_DELETE_PRODUCT_ERROR,
});

export const requestDeleteProductSuccess = () => ({
  type: REQUEST_DELETE_PRODUCT_SUCCESS,
});

export const fetchSingleProduct = (productId: string) => ({
  type: FETCH_SINGLE_PRODUCT,
  productId,
});

export const requestSingleProduct = () => ({
  type: REQUEST_SINGLE_PRODUCT,
});

export const requestSingleProductError = () => ({
  type: REQUEST_SINGLE_PRODUCT_ERROR,
});

export const requestSingleProductSuccess = (singleProduct: any) => ({
  type: REQUEST_SINGLE_PRODUCT_SUCCESS,
  singleProduct,
});

export const fetchUpdateProduct = (
  updated_product: Product,
  productId: string,
  history: any
) => ({
  type: FETCH_UPDATE_PRODUCT,
  updated_product,
  productId,
  history,
});

export const requestUpdateProduct = () => ({
  type: REQUEST_UPDATE_PRODUCT,
});

export const requestUpdateProductError = () => ({
  type: REQUEST_UPDATE_PRODUCT_ERROR,
});

export const requestUpdateProductSuccess = () => ({
  type: REQUEST_UPDATE_PRODUCT_SUCCESS,
});
