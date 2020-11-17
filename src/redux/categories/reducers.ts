import {
  REQUEST_ALL_CATEGORIES,
  REQUEST_ALL_CATEGORIES_SUCCESS,
  REQUEST_ALL_CATEGORIES_ERROR,
  REQUEST_DELETE_CATEGORY,
  REQUEST_DELETE_CATEGORY_ERROR,
  REQUEST_DELETE_CATEGORY_SUCCESS,
  REQUEST_CREATE_CATEGORY,
  REQUEST_CREATE_CATEGORY_ERROR,
  REQUEST_CREATE_CATEGORY_SUCCESS,
  REQUEST_SINGLE_CATEGORY,
  REQUEST_SINGLE_CATEGORY_ERROR,
  REQUEST_SINGLE_CATEGORY_SUCCESS,
  REQUEST_UPDATE_CATEGORY,
  REQUEST_UPDATE_CATEGORY_ERROR,
  REQUEST_UPDATE_CATEGORY_SUCCESS,
} from "./constants";
import { CategoryState, CategoriesActionType } from "./types";

const initialState: CategoryState = {
  loading: false,
  deleteLoading: false,
  createLoading: false,
  categoryLoading: false,
  updateLoading: false,
  singleCategory: undefined,
  categories: [],
};

export const categoriesReducer = (
  state = initialState,
  action: CategoriesActionType
) => {
  switch (action.type) {
    case REQUEST_ALL_CATEGORIES:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_ALL_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.categories,
      };
    case REQUEST_DELETE_CATEGORY:
      return {
        ...state,
        deleteLoading: true,
      };
    case REQUEST_DELETE_CATEGORY_ERROR:
      return {
        ...state,
        deleteLoading: false,
      };
    case REQUEST_DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        deleteLoading: false,
      };
    case REQUEST_CREATE_CATEGORY:
      return {
        ...state,
        createLoading: true,
      };
    case REQUEST_CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        createLoading: false,
      };
    case REQUEST_CREATE_CATEGORY_ERROR:
      return {
        ...state,
        createLoading: false,
      };
    case REQUEST_SINGLE_CATEGORY:
      return {
        ...state,
        categoryLoading: true,
      };
    case REQUEST_SINGLE_CATEGORY_ERROR:
      return {
        ...state,
        categoryLoading: false,
      };
    case REQUEST_SINGLE_CATEGORY_SUCCESS:
      return {
        ...state,
        categoryLoading: false,
        singleCategory: action.category,
      };
    case REQUEST_UPDATE_CATEGORY:
      return {
        ...state,
        updateLoading: true,
      };
    case REQUEST_UPDATE_CATEGORY_ERROR:
      return {
        ...state,
        updateLoading: false,
      };
    case REQUEST_UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        updateLoading: false,
      };
    default:
      return state;
  }
};
