import { Action } from "redux";
import {
  FETCH_ALL_ORDERS,
  FETCH_SINGLE_ORDER,
  FETCH_UPDATE_ORDER_STATUS,
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

interface RequestAllOrders {
  type: typeof REQUEST_ALL_ORDERS;
}

interface RequestAllOrdersError {
  type: typeof REQUEST_ALL_ORDERS_ERROR;
}

interface RequestAllOrdersSuccess {
  type: typeof REQUEST_ALL_ORDERS_SUCCESS;
  orders: any;
}

interface RequestSingleOrder {
  type: typeof REQUEST_SINGLE_ORDER;
}

interface RequestSingleOrderError {
  type: typeof REQUEST_SINGLE_ORDER_ERROR;
}

interface RequestSingleOrderSuccess {
  type: typeof REQUEST_SINGLE_ORDER_SUCCESS;
  order: any;
}

interface RequestUpdateOrderStatusOrder {
  type: typeof REQUEST_UPDATE_ORDER_STATUS;
}

interface RequestUpdateOrderStatusOrderError {
  type: typeof REQUEST_UPDATE_ORDER_STATUS_ERROR;
}

interface RequestUpdateOrderStatusOrderStatus {
  type: typeof REQUEST_UPDATE_ORDER_STATUS_SUCCESS;
}

export type OrdersActionType =
  | RequestAllOrders
  | RequestAllOrdersError
  | RequestAllOrdersSuccess
  | RequestSingleOrder
  | RequestSingleOrderError
  | RequestSingleOrderSuccess
  | RequestUpdateOrderStatusOrder
  | RequestUpdateOrderStatusOrderError
  | RequestUpdateOrderStatusOrderStatus;

export interface OrdersState {
  loading: boolean;
  singleOrder: any;
  updateStatusLoading: boolean;
  singleLoading: boolean;
  orders: any;
}

export interface AllOrdersAction extends Action {
  type: typeof FETCH_ALL_ORDERS;
}

export interface SingleOrderAction extends Action, FetchSingleOrder {
  type: typeof FETCH_SINGLE_ORDER;
}

export interface FetchSingleOrder {
  orderId: string;
}

export interface UpdateStatusOrderAction
  extends Action,
    FetchUpdateOrderStatus {
  type: typeof FETCH_UPDATE_ORDER_STATUS;
}

export interface FetchUpdateOrderStatus {
  orderId: string;
  newStatus: string;
}
