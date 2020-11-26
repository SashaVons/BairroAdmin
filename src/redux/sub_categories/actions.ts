import {
  REQUEST_ALL_CATEGORIES,
  REQUEST_ALL_CATEGORIES_ERROR,
} from "../categories/constants";
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

export const fetchAllSubCategories = () => ({
  type: FETCH_ALL_SUB_CATEGORY,
});

export const requestAllSubCategories = () => ({
  type: REQUEST_ALL_CATEGORIES,
});

export const requestAllSubCategoriesError = () => ({
  type: REQUEST_ALL_CATEGORIES_ERROR,
});

export const requestAllSubCategoriesSuccess = (subCategories: any) => ({
  type: REQUEST_ALL_SUB_CATEGORY_SUCCESS,
  subCategories,
});

export const fetchDeleteSubCategory = (subCategoryId: string) => ({
  type: FETCH_DELETE_SUB_CATEGORY,
  subCategoryId,
});

export const requestDeleteSubCategory = () => ({
  type: REQUEST_DELETE_SUB_CATEGORY,
});

export const requestDeleteSubCategoryError = () => ({
  type: REQUEST_DELETE_SUB_CATEGORY_ERROR,
});

export const requestDeleteSubCategorySuccess = () => ({
  type: REQUEST_DELETE_SUB_CATEGORY_SUCCESS,
});

export const fetchCreateSubCategory = (
  name: string,
  name_pt: string,
  category: string,
  history: any
) => ({
  type: FETCH_CREATE_SUB_CATEGORY,
  name,
  name_pt,
  category,
  history,
});

export const requestCreateSubCategory = () => ({
  type: REQUEST_CREATE_SUB_CATEGORY,
});

export const requestCreateSubCategoryError = () => ({
  type: REQUEST_CREATE_SUB_CATEGORY_ERROR,
});

export const requestCreateSubCategorySuccess = () => ({
  type: REQUEST_CREATE_SUB_CATEGORY_SUCCESS,
});

export const fetchEditSubCategory = (
  subCategoryId: string,
  updated_sub_category: {
    name: string;
    name_pt: string;
    category: string;
  },
  history: any
) => ({
  type: FETCH_EDIT_SUB_CATEGORY,
  subCategoryId,
  updated_sub_category,
  history,
});

export const requestEditSubCategory = () => ({
  type: REQUEST_EDIT_SUB_CATEGORY,
});

export const requestEditSubCategoryError = () => ({
  type: REQUEST_EDIT_SUB_CATEGORY_ERROR,
});

export const requestEditSubCategorySuccess = () => ({
  type: REQUEST_EDIT_SUB_CATEGORY_SUCCESS,
});

export const fetchSingleSubCategory = (subCategoryId: string) => ({
  type: FETCH_SINGLE_SUB_CATEGORY,
  subCategoryId,
});

export const requestSingleSubCategory = () => ({
  type: REQUEST_SINGLE_SUB_CATEGORY,
});

export const requestSingleSubCategoryError = () => ({
  type: REQUEST_SINGLE_SUB_CATEGORY_ERROR,
});

export const requestSingleSubCategorySuccess = (singleSubCategory: any) => ({
  type: REQUEST_SINGLE_SUB_CATEGORY_SUCCESS,
  singleSubCategory,
});
