import { Action } from "redux";
import { Product } from "../../common/types/Types";
import {
  FETCH_ALL_PRODUCTS,
  REQUEST_ALL_PRODUCTS,
  REQUEST_ALL_PRODUCTS_ERROR,
  REQUEST_ALL_PRODUCTS_SUCCESS,
  REQUEST_CREATE_PRODUCT,
  REQUEST_CREATE_PRODUCT_ERROR,
  REQUEST_CREATE_PRODUCT_SUCCESS,
  FETCH_CREATE_PRODUCT,
  REQUEST_DELETE_PRODUCT,
  REQUEST_DELETE_PRODUCT_ERROR,
  REQUEST_DELETE_PRODUCT_SUCCESS,
  FETCH_DELETE_PRODUCT,
  REQUEST_SINGLE_PRODUCT,
  REQUEST_SINGLE_PRODUCT_ERROR,
  REQUEST_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT,
  REQUEST_UPDATE_PRODUCT,
  REQUEST_UPDATE_PRODUCT_SUCCESS,
  REQUEST_UPDATE_PRODUCT_ERROR,
  FETCH_UPDATE_PRODUCT,
} from "./constants";

interface RequestAllProducts {
  type: typeof REQUEST_ALL_PRODUCTS;
}

interface RequestAllProductsError {
  type: typeof REQUEST_ALL_PRODUCTS_ERROR;
}

interface RequestAllProductsSuccess {
  type: typeof REQUEST_ALL_PRODUCTS_SUCCESS;
  products: any;
}

interface RequestCreateProduct {
  type: typeof REQUEST_CREATE_PRODUCT;
}

interface RequestCreateProductError {
  type: typeof REQUEST_CREATE_PRODUCT_ERROR;
}

interface RequestCreateProductSuccess {
  type: typeof REQUEST_CREATE_PRODUCT_SUCCESS;
}

interface RequestDeleteProduct {
  type: typeof REQUEST_DELETE_PRODUCT;
}

interface RequestDeleteProductError {
  type: typeof REQUEST_DELETE_PRODUCT_ERROR;
}

interface RequestDeleteProductSuccess {
  type: typeof REQUEST_DELETE_PRODUCT_SUCCESS;
}

interface RequestSingleProduct {
  type: typeof REQUEST_SINGLE_PRODUCT;
}

interface RequestSingleProductError {
  type: typeof REQUEST_SINGLE_PRODUCT_ERROR;
}

interface RequestSingleProductSuccess {
  type: typeof REQUEST_SINGLE_PRODUCT_SUCCESS;
  singleProduct: any;
}

interface RequestUpdateProduct {
  type: typeof REQUEST_UPDATE_PRODUCT;
}

interface RequestUpdateProductSuccess {
  type: typeof REQUEST_UPDATE_PRODUCT_SUCCESS;
}

interface RequestUpdateProductError {
  type: typeof REQUEST_UPDATE_PRODUCT_ERROR;
}

export type ProductsActionType =
  | RequestAllProducts
  | RequestAllProductsError
  | RequestAllProductsSuccess
  | RequestCreateProduct
  | RequestCreateProductError
  | RequestCreateProductSuccess
  | RequestDeleteProduct
  | RequestDeleteProductError
  | RequestDeleteProductSuccess
  | RequestSingleProduct
  | RequestSingleProductError
  | RequestSingleProductSuccess
  | RequestUpdateProduct
  | RequestUpdateProductSuccess
  | RequestUpdateProductError;

export interface ProductsState {
  loading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  singleLoading: boolean;
  updateLoading: boolean;
  singleProduct: any;
  products: any;
}

export interface AllProductsAction extends Action {
  type: typeof FETCH_ALL_PRODUCTS;
}

export interface CreateProductAction extends Action, FetchCreateProduct {
  type: typeof FETCH_CREATE_PRODUCT;
}

export interface FetchCreateProduct {
  created_product: Product;
  history: any;
}

export interface DeleteProductAction extends Action, FetchDeleteProduct {
  type: typeof FETCH_DELETE_PRODUCT;
}

export interface FetchDeleteProduct {
  productId: string;
}

export interface SingleProductAction extends Action, FetchSingleProduct {
  type: typeof FETCH_SINGLE_PRODUCT;
}

export interface FetchSingleProduct {
  productId: string;
}

export interface UpdateProductAction extends Action, FetchUpdateProduct {
  type: typeof FETCH_UPDATE_PRODUCT;
}

export interface FetchUpdateProduct {
  updated_product: Product;
  productId: string;
  history: any;
}
