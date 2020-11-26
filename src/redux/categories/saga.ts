import { put, call, takeLatest } from "redux-saga/effects";
import {
  requestAllCategories,
  requestAllCategoriesError,
  requestAllCategoriesSuccess,
  requestCreateCategory,
  requestCreateCategoryError,
  requestCreateCategorySuccess,
  requestDeleteCategory,
  requestDeleteCategoryError,
  requestDeleteCategorySuccess,
  requestSingleCategory,
  requestSingleCategoryError,
  requestSingleCategorySuccess,
  requestUpdateCategory,
  requestUpdateCategoryError,
  requestUpdateCategorySuccess,
} from "./actions";
import {
  FETCH_ALL_CATEGORIES,
  FETCH_CREATE_CATEGORY,
  FETCH_DELETE_CATEGORY,
  FETCH_SINGLE_CATEGORY,
  FETCH_UPDATE_CATEGORY,
} from "./constants";
import {
  AllCategories,
  CreateCategory,
  DeleteCategory,
  FetchCreateCategory,
  FetchDeleteCategory,
  FetchSingleCategory,
  FetchUpdateCategory,
  SingleCategory,
  UpdateCategory,
} from "./types";
import { firestore } from "../../common/firebase";
import { fetchAllCategories as fetchAllCategoriesAction } from "./actions";

function* fetchAllCategories() {
  try {
    yield put(requestAllCategories());

    const categories = yield call(() =>
      firestore
        .collection("category")
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

    yield put(requestAllCategoriesSuccess(categories));
  } catch (error) {
    console.log(error);
    yield put(requestAllCategoriesError());
  }
}

export function* watchFetchAllCategories() {
  yield takeLatest<AllCategories>(FETCH_ALL_CATEGORIES, fetchAllCategories);
}

function* fetchDeleteCategory(data: FetchDeleteCategory) {
  try {
    yield put(requestDeleteCategory());

    yield call(() =>
      firestore
        .collection("category")
        .doc(data.categoryId)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        })
    );

    yield put(requestDeleteCategorySuccess());
    yield put(fetchAllCategoriesAction());
  } catch (error) {
    console.log(error);
    yield put(requestDeleteCategoryError());
  }
}

export function* watchFetchDeleteCategory() {
  yield takeLatest<DeleteCategory>(FETCH_DELETE_CATEGORY, fetchDeleteCategory);
}

function* fetchCreateCategory(data: FetchCreateCategory) {
  try {
    yield put(requestCreateCategory());

    yield call(() =>
      firestore.collection("category").add({
        name: data.name,
        name_pt: data.name_pt,
        image: data.image,
      })
    );

    yield put(requestCreateCategorySuccess());
    yield put(fetchAllCategoriesAction());
    data.history.goBack();
  } catch (error) {
    console.log(error);
    yield put(requestCreateCategoryError());
  }
}

export function* watchFetchCreateCategory() {
  yield takeLatest<CreateCategory>(FETCH_CREATE_CATEGORY, fetchCreateCategory);
}

function* fetchSingleCategory(data: FetchSingleCategory) {
  try {
    yield put(requestSingleCategory());

    const resData = yield call(() =>
      firestore
        .collection("category")
        .doc(data.categoryId)
        .get()
        .then((docRef) => {
          return {
            _id: docRef.id,
            ...docRef.data(),
          };
        })
    );

    yield put(requestSingleCategorySuccess(resData));
  } catch (error) {
    console.log(error);
    yield put(requestSingleCategoryError());
  }
}

export function* watchFetchSingleCategory() {
  yield takeLatest<SingleCategory>(FETCH_SINGLE_CATEGORY, fetchSingleCategory);
}

function* fetchUpdateCategory(data: FetchUpdateCategory) {
  try {
    yield put(requestUpdateCategory());

    const updateCategory = yield call(() =>
      firestore
        .collection("category")
        .doc(data.categoryId)
        .update(data.updated_category)
    );

    yield put(requestUpdateCategorySuccess());
    yield put(fetchAllCategoriesAction());
    data.history.goBack();
  } catch (error) {
    console.log(error);
    yield put(requestUpdateCategoryError());
  }
}

export function* watchFetchUpdateCategory() {
  yield takeLatest<UpdateCategory>(FETCH_UPDATE_CATEGORY, fetchUpdateCategory);
}
