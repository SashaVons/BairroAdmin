import {
  FETCH_ALL_SUB_CATEGORY,
  FETCH_CREATE_SUB_CATEGORY,
  FETCH_DELETE_SUB_CATEGORY,
  FETCH_EDIT_SUB_CATEGORY,
  FETCH_SINGLE_SUB_CATEGORY,
} from "./constants";
import {
  requestAllSubCategories,
  requestAllSubCategoriesError,
  requestAllSubCategoriesSuccess,
  requestCreateSubCategory,
  requestCreateSubCategoryError,
  requestCreateSubCategorySuccess,
  requestDeleteSubCategory,
  requestDeleteSubCategoryError,
  requestDeleteSubCategorySuccess,
  fetchAllSubCategories as fetchAllSubCategoriesAction,
  requestSingleSubCategory,
  requestSingleSubCategoryError,
  requestSingleSubCategorySuccess,
  requestEditSubCategoryError,
  requestEditSubCategory,
  requestEditSubCategorySuccess,
} from "./actions";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { firestore } from "../../common/firebase";
import {
  AllSubCategories,
  CreateSubCategory,
  DeleteSubCategory,
  EditSubCategory,
  FetchCreateSubCategory,
  FetchDeleteSubCategory,
  FetchEditSubCategory,
  FetchSingleSubCategory,
  SingleSubCategory,
} from "./types";

function* fetchAllSubCategories() {
  try {
    yield put(requestAllSubCategories());

    const sub_categories = yield call(() =>
      firestore
        .collection("sub_category")
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

    yield all(
      sub_categories.map(function* (item: any, index: number) {
        yield call(() =>
          item.category.get().then((res: any) => {
            sub_categories[index].category = { _id: res.id, ...res.data() };
          })
        );
      })
    );

    yield put(requestAllSubCategoriesSuccess(sub_categories));
  } catch (error) {
    console.log(error);
    yield put(requestAllSubCategoriesError());
  }
}

export function* watchFetchAllSubCategories() {
  yield takeLatest<AllSubCategories>(
    FETCH_ALL_SUB_CATEGORY,
    fetchAllSubCategories
  );
}

function* fetchDeleteSubCategory(data: FetchDeleteSubCategory) {
  try {
    yield put(requestDeleteSubCategory());

    yield call(() =>
      firestore
        .collection("sub_category")
        .doc(data.subCategoryId)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        })
    );

    yield put(requestDeleteSubCategorySuccess());
    yield put(fetchAllSubCategoriesAction());
  } catch (error) {
    console.log(error);
    yield put(requestDeleteSubCategoryError());
  }
}

export function* watchFetchDeleteSubCategory() {
  yield takeLatest<DeleteSubCategory>(
    FETCH_DELETE_SUB_CATEGORY,
    fetchDeleteSubCategory
  );
}

function* fetchCreateSubCategory(data: FetchCreateSubCategory) {
  try {
    yield put(requestCreateSubCategory());

    yield call(() =>
      firestore.collection("sub_category").add({
        name: data.name,
        name_pt: data.name_pt,
        category: firestore.doc(`category/${data.category}`),
      })
    );

    yield put(requestCreateSubCategorySuccess());
    yield put(fetchAllSubCategoriesAction());
    data.history.goBack();
  } catch (error) {
    console.log(error);
    yield put(requestCreateSubCategoryError());
  }
}

export function* watchFetchCreateSubCategory() {
  yield takeLatest<CreateSubCategory>(
    FETCH_CREATE_SUB_CATEGORY,
    fetchCreateSubCategory
  );
}

function* fetchSingleSubCategory(data: FetchSingleSubCategory) {
  try {
    yield put(requestSingleSubCategory());

    const resData = yield call(() =>
      firestore
        .collection("sub_category")
        .doc(data.subCategoryId)
        .get()
        .then((docRef) => {
          return {
            _id: docRef.id,
            ...docRef.data(),
          };
        })
    );

    yield call(() =>
      resData.category.get().then((res: any) => {
        resData.category = { _id: res.id, ...res.data() };
      })
    );

    yield put(requestSingleSubCategorySuccess(resData));
  } catch (error) {
    console.log(error);
    yield put(requestSingleSubCategoryError());
  }
}

export function* watchFetchSingleSubCategory() {
  yield takeLatest<SingleSubCategory>(
    FETCH_SINGLE_SUB_CATEGORY,
    fetchSingleSubCategory
  );
}

function* fetchEditSubCategory(data: FetchEditSubCategory) {
  try {
    yield put(requestEditSubCategory());

    yield call(() =>
      firestore
        .collection("sub_category")
        .doc(data.subCategoryId)
        .update({
          name: data.updated_sub_category.name,
          name_pt: data.updated_sub_category.name_pt,
          category: firestore.doc(
            `category/${data.updated_sub_category.category}`
          ),
        })
    );

    yield put(requestEditSubCategorySuccess());
    yield put(fetchAllSubCategoriesAction());
    data.history.goBack();
  } catch (error) {
    console.log(error);
    yield put(requestEditSubCategoryError());
  }
}

export function* watchFetchEditSubCategory() {
  yield takeLatest<EditSubCategory>(
    FETCH_EDIT_SUB_CATEGORY,
    fetchEditSubCategory
  );
}
