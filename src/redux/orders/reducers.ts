import {
  REQUEST_ALL_ORDERS,
  REQUEST_ALL_ORDERS_ERROR,
  REQUEST_ALL_ORDERS_SUCCESS,
  REQUEST_SINGLE_ORDER,
  REQUEST_SINGLE_ORDER_ERROR,
  REQUEST_SINGLE_ORDER_SUCCESS,
  REQUEST_UPDATE_ORDER_STATUS,
  REQUEST_UPDATE_ORDER_STATUS_ERROR,
  REQUEST_UPDATE_ORDER_STATUS_SUCCESS,
} from "./constants";
import { OrdersActionType, OrdersState } from "./types";

const initialState: OrdersState = {
  loading: false,
  orders: undefined,
  singleOrder: undefined,
  updateStatusLoading: false,
  singleLoading: false,
};

export const ordersReducer = (
  state = initialState,
  action: OrdersActionType
) => {
  switch (action.type) {
    case REQUEST_ALL_ORDERS:
      return {
        ...state,
        loading: true,
      };
    case REQUEST_ALL_ORDERS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case REQUEST_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders,
      };
    case REQUEST_SINGLE_ORDER:
      return {
        ...state,
        singleLoading: true,
      };
    case REQUEST_SINGLE_ORDER_ERROR:
      return {
        ...state,
        singleLoading: false,
      };
    case REQUEST_SINGLE_ORDER_SUCCESS:
      return {
        ...state,
        singleLoading: false,
        singleOrder: action.order,
      };
    case REQUEST_UPDATE_ORDER_STATUS:
      return {
        ...state,
        updateStatusLoading: true,
      };
    case REQUEST_UPDATE_ORDER_STATUS_ERROR:
      return {
        ...state,
        updateStatusLoading: false,
      };
    case REQUEST_UPDATE_ORDER_STATUS_SUCCESS:
      return {
        ...state,
        updateStatusLoading: false,
      };
    default:
      return state;
  }
};
