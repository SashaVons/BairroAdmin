import { all, call, put, takeLatest } from "redux-saga/effects";
import { firestore } from "../../common/firebase";
import {
  requestAllOrders,
  requestAllOrdersError,
  requestAllOrdersSuccess,
  requestSingleOrder,
  requestSingleOrderError,
  requestSingleOrderSuccess,
  requestUpdateOrderStatus,
  requestUpdateOrderStatusError,
  requestUpdateOrderStatusSuccess,
  fetchAllOrders as fetchAllOrdersAction,
} from "./actions";
import {
  FETCH_ALL_ORDERS,
  FETCH_SINGLE_ORDER,
  FETCH_UPDATE_ORDER_STATUS,
} from "./constants";
import {
  AllOrdersAction,
  FetchSingleOrder,
  FetchUpdateOrderStatus,
  SingleOrderAction,
  UpdateStatusOrderAction,
} from "./types";

function* fetchAllOrders() {
  try {
    yield put(requestAllOrders());

    const resData = yield call(() =>
      firestore
        .collection("orders")
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

    yield put(requestAllOrdersSuccess(resData));
  } catch (error) {
    console.log(error);
    yield put(requestAllOrdersError());
  }
}

export function* watchFetchAllOrders() {
  yield takeLatest<AllOrdersAction>(FETCH_ALL_ORDERS, fetchAllOrders);
}

function* fetchSingleOrder(data: FetchSingleOrder) {
  try {
    yield put(requestSingleOrder());

    const resData = yield call(() =>
      firestore
        .collection("orders")
        .doc(data.orderId)
        .get()
        .then((docRef) => {
          return {
            _id: docRef.id,
            ...docRef.data(),
          };
        })
    );

    yield all(
      resData.products.map(function* (item: any, index: number) {
        yield call(() =>
          firestore
            .collection("products")
            .doc(item.product)
            .get()
            .then((res: any) => {
              resData.products[index] = {
                _id: res.id,
                count: resData.products[index].count,
                ...res.data(),
              };
            })
        );
      })
    );

    yield put(requestSingleOrderSuccess(resData));
  } catch (error) {
    console.log(error);
    yield put(requestSingleOrderError());
  }
}

export function* watchFetchSingleOrder() {
  yield takeLatest<SingleOrderAction>(FETCH_SINGLE_ORDER, fetchSingleOrder);
}

function* fetchUpdateOrderStatus(data: FetchUpdateOrderStatus) {
  try {
    yield put(requestUpdateOrderStatus());

    yield call(() =>
      firestore.collection("orders").doc(data.orderId).update({
        status: data.newStatus,
      })
    );

    yield put(requestUpdateOrderStatusSuccess());
    yield put(fetchAllOrdersAction());
  } catch (error) {
    console.log(error);
    yield put(requestUpdateOrderStatusError());
  }
}

export function* watchFetchUpdateOrderStatus() {
  yield takeLatest<UpdateStatusOrderAction>(
    FETCH_UPDATE_ORDER_STATUS,
    fetchUpdateOrderStatus
  );
}
