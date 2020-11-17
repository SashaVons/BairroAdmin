import { call, put, takeLatest } from "redux-saga/effects";
import { firestore } from "../../common/firebase";
import { requestDeleteProductError } from "../products/actions";
import {
  requestAllPromocodes,
  requestAllPromocodesError,
  requestAllPromocodesSuccess,
  requestDeletePromocode,
  requestDeletePromocodeSuccess,
  fetchAllPromocodes as fetchAllPromocodesAction,
  requestCreatePromocodeError,
  requestCreatePromocode,
  requestCreatePromocodeSuccess,
  requestSinglePromocodeError,
  requestSinglePromocode,
  requestSinglePromocodeSuccess,
  requestUpdatePromocode,
  requestUpdatePromocodeSuccess,
  requestUpdatePromocodeError,
} from "./actions";
import {
  FETCH_ALL_PROMOCODES,
  FETCH_CREATE_PROMOCODE,
  FETCH_DELETE_PROMOCODE,
  FETCH_SINGLE_PROMOCODE,
  FETCH_UPDATE_PROMOCODE,
} from "./constants";
import {
  AllPromocodes,
  CreatePromocodeAction,
  DeletePromocodeAction,
  FetchCreatePromocode,
  FetchDeletePromocode,
  FetchSinglePromocode,
  FetchUpdatePromocode,
  SinglePromocodeAction,
  UpdatePromocodeAction,
} from "./types";

function* fetchAllPromocodes() {
  try {
    yield put(requestAllPromocodes());

    const resData = yield call(() =>
      firestore
        .collection("promocode")
        .get()
        .then((querySnapshot) => {
          const resData: any = [];

          querySnapshot.forEach((documentSnapshot) => {
            resData.push({
              _id: documentSnapshot.id,
              ...documentSnapshot.data(),
            });
          });

          return resData;
        })
    );

    yield put(requestAllPromocodesSuccess(resData));
  } catch (error) {
    console.log(error);
    yield put(requestAllPromocodesError());
  }
}

export function* watchFetchAllPromocodes() {
  yield takeLatest<AllPromocodes>(FETCH_ALL_PROMOCODES, fetchAllPromocodes);
}

function* fetchDeletePromocode(data: FetchDeletePromocode) {
  try {
    yield put(requestDeletePromocode());

    yield call(() =>
      firestore
        .collection("promocode")
        .doc(data.promocodeId)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        })
    );

    yield put(requestDeletePromocodeSuccess());
    yield put(fetchAllPromocodesAction());
  } catch (error) {
    console.log(error);
    yield put(requestDeleteProductError());
  }
}

export function* watchFetchDeletePromocode() {
  yield takeLatest<DeletePromocodeAction>(
    FETCH_DELETE_PROMOCODE,
    fetchDeletePromocode
  );
}

function* fetchCreatePromocode(data: FetchCreatePromocode) {
  try {
    yield put(requestCreatePromocode());

    yield call(() =>
      firestore.collection("promocode").add(data.created_promocode)
    );

    yield put(requestCreatePromocodeSuccess());
    yield put(fetchAllPromocodesAction());
    data.history.goBack();
  } catch (error) {
    console.log(error);
    yield put(requestCreatePromocodeError());
  }
}

export function* watchFetchCreatePromocode() {
  yield takeLatest<CreatePromocodeAction>(
    FETCH_CREATE_PROMOCODE,
    fetchCreatePromocode
  );
}

function* fetchSinglePromocode(data: FetchSinglePromocode) {
  try {
    yield put(requestSinglePromocode());

    const resData = yield call(() =>
      firestore
        .collection("promocode")
        .doc(data.promocodeId)
        .get()
        .then((docRef) => {
          return {
            _id: docRef.id,
            ...docRef.data(),
          };
        })
    );

    yield put(requestSinglePromocodeSuccess(resData));
  } catch (error) {
    console.log(error);
    yield put(requestSinglePromocodeError());
  }
}

export function* watchFetchSinglePromocode() {
  yield takeLatest<SinglePromocodeAction>(
    FETCH_SINGLE_PROMOCODE,
    fetchSinglePromocode
  );
}

function* fetchUpdatePromocode(data: FetchUpdatePromocode) {
  try {
    yield put(requestUpdatePromocode());

    yield call(() =>
      firestore
        .collection("promocode")
        .doc(data.promocodeId)
        .update(data.updated_promocode)
    );

    yield put(requestUpdatePromocodeSuccess());
    yield put(fetchAllPromocodesAction());
    data.history.goBack();
  } catch (error) {
    console.log(error);
    yield put(requestUpdatePromocodeError());
  }
}

export function* watchFetchUpdatePromocode() {
  yield takeLatest<UpdatePromocodeAction>(
    FETCH_UPDATE_PROMOCODE,
    fetchUpdatePromocode
  );
}
