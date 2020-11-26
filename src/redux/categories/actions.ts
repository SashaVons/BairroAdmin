import {
  FETCH_ALL_CATEGORIES,
  REQUEST_ALL_CATEGORIES_SUCCESS,
  REQUEST_ALL_CATEGORIES_ERROR,
  REQUEST_ALL_CATEGORIES,
  FETCH_DELETE_CATEGORY,
  REQUEST_DELETE_CATEGORY_SUCCESS,
  REQUEST_DELETE_CATEGORY,
  REQUEST_DELETE_CATEGORY_ERROR,
  REQUEST_CREATE_CATEGORY,
  REQUEST_CREATE_CATEGORY_ERROR,
  REQUEST_CREATE_CATEGORY_SUCCESS,
  FETCH_CREATE_CATEGORY,
  FETCH_SINGLE_CATEGORY,
  REQUEST_SINGLE_CATEGORY_ERROR,
  REQUEST_SINGLE_CATEGORY,
  REQUEST_SINGLE_CATEGORY_SUCCESS,
  FETCH_UPDATE_CATEGORY,
  REQUEST_UPDATE_CATEGORY,
  REQUEST_UPDATE_CATEGORY_ERROR,
  REQUEST_UPDATE_CATEGORY_SUCCESS,
} from "./constants";

export const fetchAllCategories = () => ({
  type: FETCH_ALL_CATEGORIES,
});

export const requestAllCategories = () => ({
  type: REQUEST_ALL_CATEGORIES,
});

export const requestAllCategoriesError = () => ({
  type: REQUEST_ALL_CATEGORIES_ERROR,
});

export const requestAllCategoriesSuccess = (categories: any) => ({
  type: REQUEST_ALL_CATEGORIES_SUCCESS,
  categories,
});

export const fetchDeleteCategory = (categoryId: string) => ({
  type: FETCH_DELETE_CATEGORY,
  categoryId,
});

export const requestDeleteCategory = () => ({
  type: REQUEST_DELETE_CATEGORY,
});

export const requestDeleteCategoryError = () => ({
  type: REQUEST_DELETE_CATEGORY_ERROR,
});

export const requestDeleteCategorySuccess = () => ({
  type: REQUEST_DELETE_CATEGORY_SUCCESS,
});

export const requestCreateCategory = () => ({
  type: REQUEST_CREATE_CATEGORY,
});

export const requestCreateCategoryError = () => ({
  type: REQUEST_CREATE_CATEGORY_ERROR,
});

export const requestCreateCategorySuccess = () => ({
  type: REQUEST_CREATE_CATEGORY_SUCCESS,
});

export const fetchCreateCategory = (
  name: string,
  name_pt: string,
  image: string,
  history: any
) => ({
  type: FETCH_CREATE_CATEGORY,
  name,
  name_pt,
  image,
  history,
});

export const fetchSingleCategory = (categoryId: string) => ({
  type: FETCH_SINGLE_CATEGORY,
  categoryId,
});

export const requestSingleCategory = () => ({
  type: REQUEST_SINGLE_CATEGORY,
});

export const requestSingleCategoryError = () => ({
  type: REQUEST_SINGLE_CATEGORY_ERROR,
});

export const requestSingleCategorySuccess = (category: any) => ({
  type: REQUEST_SINGLE_CATEGORY_SUCCESS,
  category,
});

export const fetchUpdateCategory = (
  categoryId: string,
  updated_category: { name: string; image: string },
  history: any
) => ({
  type: FETCH_UPDATE_CATEGORY,
  categoryId,
  updated_category,
  history,
});

export const requestUpdateCategory = () => ({
  type: REQUEST_UPDATE_CATEGORY,
});

export const requestUpdateCategoryError = () => ({
  type: REQUEST_UPDATE_CATEGORY_ERROR,
});

export const requestUpdateCategorySuccess = () => ({
  type: REQUEST_UPDATE_CATEGORY_SUCCESS,
});
