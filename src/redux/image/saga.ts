import { call, put, takeLatest } from "redux-saga/effects";
import {
  requestCreatePhoto,
  requestCreatePhotoError,
  requestCreatePhotoSuccess,
} from "./actions";
import { storage } from "../../common/firebase";
import { CreatePhoto, FetchCreatePhoto } from "./types";
import { FETCH_CREATE_PHOTO } from "./constants";

function* fetchCreatePhoto(data: FetchCreatePhoto) {
  try {
    yield put(requestCreatePhoto());

    const imageName = `${new Date().getTime()}-${data.image.name}`;

    const addPhoto = yield call(() =>
      storage.ref(`/images/${imageName}`).put(data.image)
    );

    const resPhoto = yield call(() =>
      storage.ref("images").child(imageName).getDownloadURL()
    );

    console.log(resPhoto);

    yield put(requestCreatePhotoSuccess(resPhoto));
  } catch (error) {
    yield put(requestCreatePhotoError());
  }
}

export function* watchFetchCreatePhoto() {
  yield takeLatest<CreatePhoto>(FETCH_CREATE_PHOTO, fetchCreatePhoto);
}
