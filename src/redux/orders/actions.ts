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

export const fetchAllOrders = () => ({
  type: FETCH_ALL_ORDERS,
});

export const requestAllOrders = () => ({
  type: REQUEST_ALL_ORDERS,
});

export const requestAllOrdersError = () => ({
  type: REQUEST_ALL_ORDERS_ERROR,
});

export const requestAllOrdersSuccess = (orders: any) => ({
  type: REQUEST_ALL_ORDERS_SUCCESS,
  orders,
});

export const fetchSingleOrder = (orderId: string) => ({
  type: FETCH_SINGLE_ORDER,
  orderId,
});

export const requestSingleOrder = () => ({
  type: REQUEST_SINGLE_ORDER,
});

export const requestSingleOrderError = () => ({
  type: REQUEST_SINGLE_ORDER_ERROR,
});

export const requestSingleOrderSuccess = (order: any) => ({
  type: REQUEST_SINGLE_ORDER_SUCCESS,
  order,
});

export const fetchUpdateOrderStatus = (orderId: string, newStatus: string) => ({
  type: FETCH_UPDATE_ORDER_STATUS,
  orderId,
  newStatus,
});

export const requestUpdateOrderStatus = () => ({
  type: REQUEST_UPDATE_ORDER_STATUS,
});

export const requestUpdateOrderStatusError = () => ({
  type: REQUEST_UPDATE_ORDER_STATUS_ERROR,
});

export const requestUpdateOrderStatusSuccess = () => ({
  type: REQUEST_UPDATE_ORDER_STATUS_SUCCESS,
});
