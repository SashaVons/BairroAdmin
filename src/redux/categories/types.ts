import { Action } from "redux";
import {
  FETCH_ALL_CATEGORIES,
  REQUEST_ALL_CATEGORIES,
  REQUEST_ALL_CATEGORIES_ERROR,
  REQUEST_ALL_CATEGORIES_SUCCESS,
  FETCH_DELETE_CATEGORY,
  REQUEST_DELETE_CATEGORY,
  REQUEST_DELETE_CATEGORY_ERROR,
  REQUEST_DELETE_CATEGORY_SUCCESS,
  REQUEST_CREATE_CATEGORY,
  REQUEST_CREATE_CATEGORY_ERROR,
  FETCH_CREATE_CATEGORY,
  REQUEST_CREATE_CATEGORY_SUCCESS,
  REQUEST_SINGLE_CATEGORY,
  REQUEST_SINGLE_CATEGORY_ERROR,
  REQUEST_SINGLE_CATEGORY_SUCCESS,
  FETCH_SINGLE_CATEGORY,
  REQUEST_UPDATE_CATEGORY,
  REQUEST_UPDATE_CATEGORY_ERROR,
  REQUEST_UPDATE_CATEGORY_SUCCESS,
  FETCH_UPDATE_CATEGORY,
} from "./constants";

interface RequestAllCategories {
  type: typeof REQUEST_ALL_CATEGORIES;
}

interface RequestAllCategoriesError {
  type: typeof REQUEST_ALL_CATEGORIES_ERROR;
}

interface RequestAllCategoriesSuccess {
  type: typeof REQUEST_ALL_CATEGORIES_SUCCESS;
  categories: any;
}

interface RequestDeleteCategory {
  type: typeof REQUEST_DELETE_CATEGORY;
}

interface RequestDeleteCategoryError {
  type: typeof REQUEST_DELETE_CATEGORY_ERROR;
}

interface RequestDeleteCategorySuccess {
  type: typeof REQUEST_DELETE_CATEGORY_SUCCESS;
}

interface RequestCreateCategory {
  type: typeof REQUEST_CREATE_CATEGORY;
}

interface RequestCreateCategoryError {
  type: typeof REQUEST_CREATE_CATEGORY_ERROR;
}

interface RequestCreateCategorySuccess {
  type: typeof REQUEST_CREATE_CATEGORY_SUCCESS;
}

interface RequestSingleCategory {
  type: typeof REQUEST_SINGLE_CATEGORY;
}

interface RequestSingleCategoryError {
  type: typeof REQUEST_SINGLE_CATEGORY_ERROR;
}

interface RequestSingleCategorySuccess {
  type: typeof REQUEST_SINGLE_CATEGORY_SUCCESS;
  category: any;
}

interface RequestUpdateCategory {
  type: typeof REQUEST_UPDATE_CATEGORY;
}

interface RequestUpdateCategoryError {
  type: typeof REQUEST_UPDATE_CATEGORY_ERROR;
}

interface RequestUpdateCategorySuccess {
  type: typeof REQUEST_UPDATE_CATEGORY_SUCCESS;
}

export type CategoriesActionType =
  | RequestAllCategories
  | RequestAllCategoriesError
  | RequestAllCategoriesSuccess
  | RequestDeleteCategory
  | RequestDeleteCategoryError
  | RequestDeleteCategorySuccess
  | RequestCreateCategory
  | RequestCreateCategoryError
  | RequestCreateCategorySuccess
  | RequestSingleCategory
  | RequestSingleCategoryError
  | RequestSingleCategorySuccess
  | RequestUpdateCategory
  | RequestUpdateCategoryError
  | RequestUpdateCategorySuccess;

export interface CategoryState {
  loading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  categoryLoading: boolean;
  singleCategory: any;
  categories: any;
}

export interface AllCategories extends Action {
  type: typeof FETCH_ALL_CATEGORIES;
}

export interface DeleteCategory extends Action, FetchDeleteCategory {
  type: typeof FETCH_DELETE_CATEGORY;
}

export interface FetchDeleteCategory {
  categoryId: string;
}

export interface CreateCategory extends Action, FetchCreateCategory {
  type: typeof FETCH_CREATE_CATEGORY;
}

export interface FetchCreateCategory {
  image: string;
  name: string;
  history: any;
}

export interface SingleCategory extends Action, FetchSingleCategory {
  type: typeof FETCH_SINGLE_CATEGORY;
}

export interface FetchSingleCategory {
  categoryId: string;
}

export interface UpdateCategory extends Action, FetchUpdateCategory {
  type: typeof FETCH_UPDATE_CATEGORY;
}

export interface FetchUpdateCategory {
  categoryId: string;
  updated_category: {
    name: string;
    image: string;
  };
  history: any;
}
