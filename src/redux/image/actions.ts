import {
  REQUEST_CREATE_PHOTO,
  REQUEST_CREATE_PHOTO_ERROR,
  REQUEST_CREATE_PHOTO_SUCCESS,
  FETCH_CREATE_PHOTO,
} from "./constants";

export const requestCreatePhoto = () => ({
  type: REQUEST_CREATE_PHOTO,
});

export const requestCreatePhotoError = () => ({
  type: REQUEST_CREATE_PHOTO_ERROR,
});

export const requestCreatePhotoSuccess = (photoUrl: string) => ({
  type: REQUEST_CREATE_PHOTO_SUCCESS,
  photoUrl,
});

export const fetchCreatePhoto = (image: any) => ({
  type: FETCH_CREATE_PHOTO,
  image,
});
