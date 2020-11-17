import { all, fork } from "redux-saga/effects";
import { watchFetchAuthUser } from "./user/saga";
import {
  watchFetchAllCategories,
  watchFetchDeleteCategory,
  watchFetchCreateCategory,
  watchFetchSingleCategory,
  watchFetchUpdateCategory,
} from "./categories/saga";
import { watchFetchCreatePhoto } from "./image/saga";
import {
  watchFetchAllSubCategories,
  watchFetchCreateSubCategory,
  watchFetchDeleteSubCategory,
  watchFetchSingleSubCategory,
  watchFetchEditSubCategory,
} from "./sub_categories/saga";
import {
  watchFetchAllProducts,
  watchFetchCreateProduct,
  watchFetchDeleteProduct,
  watchFetchSingleProduct,
  watchFetchUpdateProduct,
} from "./products/saga";
import {
  watchFetchAllPromocodes,
  watchFetchCreatePromocode,
  watchFetchDeletePromocode,
  watchFetchSinglePromocode,
  watchFetchUpdatePromocode,
} from "./promocode/saga";
import {
  watchFetchAllOrders,
  watchFetchSingleOrder,
  watchFetchUpdateOrderStatus,
} from "./orders/saga";

export function* rootSaga() {
  yield all([
    fork(watchFetchAuthUser),
    fork(watchFetchAllCategories),
    fork(watchFetchDeleteCategory),
    fork(watchFetchCreatePhoto),
    fork(watchFetchCreateCategory),
    fork(watchFetchSingleCategory),
    fork(watchFetchUpdateCategory),
    fork(watchFetchAllSubCategories),
    fork(watchFetchCreateSubCategory),
    fork(watchFetchDeleteSubCategory),
    fork(watchFetchSingleSubCategory),
    fork(watchFetchEditSubCategory),
    fork(watchFetchAllProducts),
    fork(watchFetchAllPromocodes),
    fork(watchFetchCreateProduct),
    fork(watchFetchDeleteProduct),
    fork(watchFetchSingleProduct),
    fork(watchFetchUpdateProduct),
    fork(watchFetchDeletePromocode),
    fork(watchFetchCreatePromocode),
    fork(watchFetchSinglePromocode),
    fork(watchFetchUpdatePromocode),
    fork(watchFetchAllOrders),
    fork(watchFetchSingleOrder),
    fork(watchFetchUpdateOrderStatus),
  ]);
}
