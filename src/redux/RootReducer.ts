import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { rootSaga } from "./RootSaga";
import createSagaMiddleware from "redux-saga";

import { userReducer } from "./user/reducers";
import { categoriesReducer } from "./categories/reducers";
import { imageReducer } from "./image/reducers";
import { subCategoriesReducer } from "./sub_categories/reducers";
import { productReducer } from "./products/reducers";
import { promocodeReducer } from "./promocode/reducers";
import { ordersReducer } from "./orders/reducers";

const rootReducers = combineReducers({
  image: imageReducer,
  user: userReducer,
  category: categoriesReducer,
  sub_category: subCategoriesReducer,
  product: productReducer,
  promocode: promocodeReducer,
  orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducers>;

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;
