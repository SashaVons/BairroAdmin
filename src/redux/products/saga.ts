import { all, call, put, takeLatest } from "redux-saga/effects";
import { firestore } from "../../common/firebase";
import {
  fetchAllProducts as fetchAllProductsAction,
  requestAllProducts,
  requestAllProductsError,
  requestAllProductsSuccess,
  requestDeleteProduct,
  requestDeleteProductSuccess,
  requestSingleProduct,
  requestSingleProductError,
  requestSingleProductSuccess,
  requestUpdateProductError,
  requestUpdateProductSuccess,
} from "./actions";
import {
  FETCH_ALL_PRODUCTS,
  FETCH_CREATE_PRODUCT,
  FETCH_DELETE_PRODUCT,
  FETCH_SINGLE_PRODUCT,
  FETCH_UPDATE_PRODUCT,
} from "./constants";
import {
  AllProductsAction,
  CreateProductAction,
  DeleteProductAction,
  FetchCreateProduct,
  FetchDeleteProduct,
  FetchSingleProduct,
  FetchUpdateProduct,
  SingleProductAction,
  UpdateProductAction,
} from "./types";
import {
  requestCreateProductError,
  requestCreateProduct,
  requestCreateProductSuccess,
} from "./actions";

function* fetchAllProducts() {
  try {
    yield put(requestAllProducts());

    const resData = yield call(() =>
      firestore
        .collection("products")
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
      resData.map(function* (item: any, index: number) {
        yield call(() =>
          item.category.get().then((res: any) => {
            resData[index].category = {
              _id: res.id,
              ...res.data(),
            };
          })
        );
      })
    );

    yield all(
      resData.map(function* (item: any, index: number) {
        yield call(() =>
          item.sub_category.get().then((res: any) => {
            resData[index].sub_category = {
              _id: res.id,
              ...res.data(),
            };
          })
        );
      })
    );

    yield put(requestAllProductsSuccess(resData));
  } catch (error) {
    console.log(error);
    yield put(requestAllProductsError());
  }
}

export function* watchFetchAllProducts() {
  yield takeLatest<AllProductsAction>(FETCH_ALL_PRODUCTS, fetchAllProducts);
}

function* fetchCreateProduct(data: FetchCreateProduct) {
  try {
    yield put(requestCreateProduct());

    yield call(() =>
      firestore.collection("products").add(data.created_product)
    );

    yield put(requestCreateProductSuccess());
    yield put(fetchAllProductsAction());
    data.history.goBack();
  } catch (error) {
    console.log(error);
    yield put(requestCreateProductError());
  }
}

export function* watchFetchCreateProduct() {
  yield takeLatest<CreateProductAction>(
    FETCH_CREATE_PRODUCT,
    fetchCreateProduct
  );
}

function* fetchDeleteProduct(data: FetchDeleteProduct) {
  try {
    yield put(requestDeleteProduct());

    yield call(() =>
      firestore
        .collection("products")
        .doc(data.productId)
        .delete()
        .then(function () {
          console.log("Document successfully deleted!");
        })
        .catch(function (error) {
          console.error("Error removing document: ", error);
        })
    );

    yield put(requestDeleteProductSuccess());
    yield put(fetchAllProductsAction());
  } catch (error) {
    console.log(error);
    yield put(requestDeleteProduct());
  }
}

export function* watchFetchDeleteProduct() {
  yield takeLatest<DeleteProductAction>(
    FETCH_DELETE_PRODUCT,
    fetchDeleteProduct
  );
}

function* fetchSingleProduct(data: FetchSingleProduct) {
  try {
    yield put(requestSingleProduct());

    const resData = yield call(() =>
      firestore
        .collection("products")
        .doc(data.productId)
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

    yield call(() =>
      resData.sub_category.get().then((res: any) => {
        resData.sub_category = { _id: res.id, ...res.data() };
      })
    );

    if (resData.sub_category.category)
      yield call(() =>
        resData.sub_category.category.get().then((res: any) => {
          resData.sub_category.category = { _id: res.id, ...res.data() };
        })
      );

    yield put(requestSingleProductSuccess(resData));
  } catch (error) {
    console.log(error);
    yield put(requestSingleProductError());
  }
}

export function* watchFetchSingleProduct() {
  yield takeLatest<SingleProductAction>(
    FETCH_SINGLE_PRODUCT,
    fetchSingleProduct
  );
}

function* fetchUpdateProduct(data: FetchUpdateProduct) {
  try {
    yield put(requestUpdateProductSuccess());

    yield call(() =>
      firestore
        .collection("products")
        .doc(data.productId)
        .update(data.updated_product)
    );

    yield put(requestUpdateProductSuccess());
    yield put(fetchAllProductsAction());
    data.history.goBack();
  } catch (error) {
    console.log(error);
    yield put(requestUpdateProductError());
  }
}

export function* watchFetchUpdateProduct() {
  yield takeLatest<UpdateProductAction>(
    FETCH_UPDATE_PRODUCT,
    fetchUpdateProduct
  );
}
