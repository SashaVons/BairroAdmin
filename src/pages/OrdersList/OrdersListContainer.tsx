import React, { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  fetchAllCategories,
  fetchDeleteCategory,
} from "../../redux/categories/actions";
import { Link, useRouteMatch, useHistory } from "react-router-dom";
import { RootState } from "../../redux/RootReducer";
import Icon from "@material-ui/core/Icon";

import "./orders-list.scss";
import { AcceptDialog } from "../../components/AcceptDialog/AcceptDialog";
import { fetchAllOrders } from "../../redux/orders/actions";
import moment from "moment";

interface OrdersListProps {
  orders: any;
  fetchAllOrders: () => void;
  fetchDeleteCategory: (categoryId: string) => void;
}

const OrdersListContainer: FC<OrdersListProps> = ({
  orders,
  fetchAllOrders,
  fetchDeleteCategory,
}) => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState(0);

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <>
      <AcceptDialog
        title="Do you want delete this category?"
        show={open}
        actionOnSuccess={() => fetchDeleteCategory(orders[categoryIndex]._id)}
        setShow={setOpen}
      />
      <div className="Orders">
        <div className="Orders-Header">
          <div className="Orders-Header-Button"></div>
          <p className="Orders-Header-Title">Orders</p>
          <div className="Orders-Header-Button"></div>
        </div>
        <table className="Orders-Table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
              <th>Products Count</th>
              <th>Price</th>
              <th>Promocode</th>
              <th>Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {orders
              ? orders
                  .sort(
                    (a: any, b: any) =>
                      Number(moment(b.date).format("x")) -
                      Number(moment(a.date).format("x"))
                  )
                  .map((item: any, index: number) => (
                    <>
                      <tr
                        onClick={() =>
                          history.push(`/cabinet/orders/${item._id}`)
                        }
                      >
                        <td className="Orders-Table-Title" align="left">
                          {moment(item.date).format("DD/MM/YY HH:mm")}
                        </td>
                        <td className="Orders-Table-Title" align="left">
                          {item.status}
                        </td>
                        <td className="Orders-Table-Title" align="left">
                          {item.products.length}
                        </td>
                        <td className="Orders-Table-Title" align="left">
                          {item.price.toFixed(2)}
                        </td>
                        <td className="Orders-Table-Title" align="left">
                          {item.promocode ? "Used" : "None"}
                        </td>
                        <td className="Orders-Table-Title" align="left">
                          {item.paymentType}
                        </td>
                      </tr>
                    </>
                  ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    orders: state.orders.orders,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllOrders: () => dispatch(fetchAllOrders()),
  fetchDeleteCategory: (categoryId: string) =>
    dispatch(fetchDeleteCategory(categoryId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersListContainer);
