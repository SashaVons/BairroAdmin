import { Action } from "redux";
import {
  FETCH_CREATE_PHOTO,
  REQUEST_CREATE_PHOTO,
  REQUEST_CREATE_PHOTO_ERROR,
  REQUEST_CREATE_PHOTO_SUCCESS,
} from "./constants";

interface RequestCreatePhoto {
  type: typeof REQUEST_CREATE_PHOTO;
}

interface RequestCreatePhotoError {
  type: typeof REQUEST_CREATE_PHOTO_ERROR;
}

interface RequestCreatePhotoSuccess {
  type: typeof REQUEST_CREATE_PHOTO_SUCCESS;
  photoUrl: string;
}

export type ImageActionType =
  | RequestCreatePhoto
  | RequestCreatePhotoError
  | RequestCreatePhotoSuccess;

export interface ImageState {
  loading: boolean;
  last_photo: string | undefined;
}

export interface CreatePhoto extends Action, FetchCreatePhoto {
  type: typeof FETCH_CREATE_PHOTO;
}

export interface FetchCreatePhoto {
  image: any;
}
