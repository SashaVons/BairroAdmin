import {
  REQUEST_CREATE_PHOTO,
  REQUEST_CREATE_PHOTO_ERROR,
  REQUEST_CREATE_PHOTO_SUCCESS,
} from "./constants";
import { ImageActionType, ImageState } from "./types";

const initialState: ImageState = {
  loading: false,
  last_photo: undefined,
};

export const imageReducer = (state = initialState, action: ImageActionType) => {
  switch (action.type) {
    case REQUEST_CREATE_PHOTO:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_CREATE_PHOTO_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_CREATE_PHOTO_SUCCESS:
      return {
        ...state,
        loading: false,
        last_photo: action.photoUrl,
      };
    default:
      return state;
  }
};
