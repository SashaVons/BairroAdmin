import {
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
import { SubCategoryState, SubCategoriesActionType } from "./types";

const initialState: SubCategoryState = {
  loading: false,
  createLoading: false,
  deleteLoading: false,
  editLoading: false,
  singleLoading: false,
  singleSubCategory: undefined,
  subCategories: undefined,
};

export const subCategoriesReducer = (
  state = initialState,
  action: SubCategoriesActionType
) => {
  switch (action.type) {
    case REQUEST_ALL_SUB_CATEGORY:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_ALL_SUB_CATEGORY_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_ALL_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategories: action.subCategories,
      };
    case REQUEST_CREATE_SUB_CATEGORY:
      return {
        ...state,
        createLoading: true,
      };
    case REQUEST_CREATE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        createLoading: false,
      };
    case REQUEST_CREATE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        createLoading: false,
      };
    case REQUEST_DELETE_SUB_CATEGORY:
      return {
        ...state,
        deleteLoading: true,
      };
    case REQUEST_DELETE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        deleteLoading: false,
      };
    case REQUEST_DELETE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
      };
    case REQUEST_EDIT_SUB_CATEGORY:
      return {
        ...state,
        editLoading: true,
      };
    case REQUEST_EDIT_SUB_CATEGORY_ERROR:
      return {
        ...state,
        editLoading: false,
      };
    case REQUEST_EDIT_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        editLoading: false,
      };
    case REQUEST_SINGLE_SUB_CATEGORY:
      return {
        ...state,
        singleLoading: true,
      };
    case REQUEST_SINGLE_SUB_CATEGORY_ERROR:
      return {
        ...state,
        singleLoading: false,
      };
    case REQUEST_SINGLE_SUB_CATEGORY_SUCCESS:
      return {
        ...state,
        singleSubCategory: action.singleSubCategory,
      };
    default:
      return state;
  }
};
