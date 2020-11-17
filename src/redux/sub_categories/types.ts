import { Action } from "redux";
import {
  FETCH_ALL_SUB_CATEGORY,
  FETCH_CREATE_SUB_CATEGORY,
  FETCH_DELETE_SUB_CATEGORY,
  FETCH_EDIT_SUB_CATEGORY,
  FETCH_SINGLE_SUB_CATEGORY,
  REQUEST_ALL_SUB_CATEGORY,
  REQUEST_ALL_SUB_CATEGORY_ERROR,
  REQUEST_ALL_SUB_CATEGORY_SUCCESS,
  REQUEST_CREATE_SUB_CATEGORY,
  REQUEST_CREATE_SUB_CATEGORY_ERROR,
  REQUEST_CREATE_SUB_CATEGORY_SUCCESS,
  REQUEST_DELETE_SUB_CATEGORY,
  REQUEST_DELETE_SUB_CATEGORY_ERROR,
  REQUEST_DELETE_SUB_CATEGORY_SUCCESS,
  REQUEST_EDIT_SUB_CATEGORY,
  REQUEST_EDIT_SUB_CATEGORY_ERROR,
  REQUEST_EDIT_SUB_CATEGORY_SUCCESS,
  REQUEST_SINGLE_SUB_CATEGORY,
  REQUEST_SINGLE_SUB_CATEGORY_ERROR,
  REQUEST_SINGLE_SUB_CATEGORY_SUCCESS,
} from "./constants";

interface RequestAllSubCategory {
  type: typeof REQUEST_ALL_SUB_CATEGORY;
}

interface RequestAllSubCategoryError {
  type: typeof REQUEST_ALL_SUB_CATEGORY_ERROR;
}

interface RequestAllSubCategorySuccess {
  type: typeof REQUEST_ALL_SUB_CATEGORY_SUCCESS;
  subCategories: any;
}

interface RequestDeleteSubCategory {
  type: typeof REQUEST_DELETE_SUB_CATEGORY;
}

interface RequestDeleteSubCategoryError {
  type: typeof REQUEST_DELETE_SUB_CATEGORY_ERROR;
}

interface RequestDeleteSubCategorySuccess {
  type: typeof REQUEST_DELETE_SUB_CATEGORY_SUCCESS;
}

interface RequestCreateSubCategory {
  type: typeof REQUEST_CREATE_SUB_CATEGORY;
}

interface RequestCreateSubCategoryError {
  type: typeof REQUEST_CREATE_SUB_CATEGORY_ERROR;
}

interface RequestCreateSubCategorySuccess {
  type: typeof REQUEST_CREATE_SUB_CATEGORY_SUCCESS;
}

interface RequestEditSubCategory {
  type: typeof REQUEST_EDIT_SUB_CATEGORY;
}

interface RequestEditSubCategoryError {
  type: typeof REQUEST_EDIT_SUB_CATEGORY_ERROR;
}

interface RequestEditSubCategorySuccess {
  type: typeof REQUEST_EDIT_SUB_CATEGORY_SUCCESS;
}

interface RequestSingleSubCategory {
  type: typeof REQUEST_SINGLE_SUB_CATEGORY;
}

interface RequestSingleSubCategoryError {
  type: typeof REQUEST_SINGLE_SUB_CATEGORY_ERROR;
}

interface RequestSingleSubCategorySuccess {
  type: typeof REQUEST_SINGLE_SUB_CATEGORY_SUCCESS;
  singleSubCategory: any;
}

export type SubCategoriesActionType =
  | RequestAllSubCategory
  | RequestAllSubCategoryError
  | RequestAllSubCategorySuccess
  | RequestDeleteSubCategory
  | RequestDeleteSubCategoryError
  | RequestDeleteSubCategorySuccess
  | RequestCreateSubCategory
  | RequestCreateSubCategoryError
  | RequestCreateSubCategorySuccess
  | RequestEditSubCategory
  | RequestEditSubCategoryError
  | RequestEditSubCategorySuccess
  | RequestSingleSubCategory
  | RequestSingleSubCategoryError
  | RequestSingleSubCategorySuccess;

export interface SubCategoryState {
  loading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  editLoading: boolean;
  singleLoading: boolean;
  singleSubCategory: any;
  subCategories: any;
}

export interface AllSubCategories extends Action {
  type: typeof FETCH_ALL_SUB_CATEGORY;
}

export interface CreateSubCategory extends Action, FetchCreateSubCategory {
  type: typeof FETCH_CREATE_SUB_CATEGORY;
}

export interface FetchCreateSubCategory {
  name: string;
  category: string;
  history: any;
}

export interface DeleteSubCategory extends Action, FetchDeleteSubCategory {
  type: typeof FETCH_DELETE_SUB_CATEGORY;
}

export interface FetchDeleteSubCategory {
  subCategoryId: string;
}

export interface EditSubCategory extends Action, FetchEditSubCategory {
  type: typeof FETCH_EDIT_SUB_CATEGORY;
}

export interface FetchEditSubCategory {
  subCategoryId: string;
  updated_sub_category: {
    name: string;
    category: string;
  };
  history: any;
}

export interface SingleSubCategory extends Action, FetchSingleSubCategory {
  type: typeof FETCH_SINGLE_SUB_CATEGORY;
}

export interface FetchSingleSubCategory {
  subCategoryId: string;
}
