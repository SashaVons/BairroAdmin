import React, { FC, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import {
  fetchSingleOrder,
  fetchUpdateOrderStatus,
} from "../../redux/orders/actions";
import { useForm } from "react-hook-form";
import { RootState } from "../../redux/RootReducer";
import moment from "moment";
import "./order-item.scss";
import { FormSelect } from "../../components/FormSelect/FormSelect";

type EditOrder = {
  status: string;
};

interface OrderItemProps {
  singleOrder: any;
  fetchSingleOrder: (orderId: string) => void;
  fetchUpdateOrderStatus: (orderId: string, newStatus: string) => void;
}

const OrderItemContainer: FC<OrderItemProps> = ({
  fetchSingleOrder,
  fetchUpdateOrderStatus,
  singleOrder,
}) => {
  const match = useRouteMatch<any>();
  const { register, handleSubmit, errors, setValue, control } = useForm();
  const { orderId } = match.params;

  useEffect(() => {
    fetchSingleOrder(orderId);
  }, []);

  useEffect(() => {
    if (singleOrder)
      setValue("status", {
        value: singleOrder.status,
        label: singleOrder.status,
      });
  }, [singleOrder]);

  const onSubmit = (data: EditOrder) => {
    console.log(data);
  };

  console.log(singleOrder);

  return (
    <div className="Order-Item">
      <div className="Order-Item-Header">
        <p className="Order-Item-Header-Title">Order Item</p>
        <div className="Order-Item-Header-Button"></div>
      </div>
      {singleOrder ? (
        <form className="Order-Item-Form" onSubmit={handleSubmit(onSubmit)}>
          <p className="Order-Item-Form-Title">Date</p>
          <p className="Order-Item-Form-Text">
            {moment(singleOrder.date).format("DD/MM/YY HH:mm")}
          </p>
          <p className="Order-Item-Form-Title">Status</p>
          <FormSelect
            placeholder={"Status"}
            name={"status"}
            options={[
              { _id: "DELIVERING", name: "DELIVERING" },
              { _id: "ACCEPTED", name: "ACCEPTED" },
              { _id: "SENT", name: "SENT" },
              { _id: "CLOSE", name: "CLOSE" },
            ].map((el: any) => {
              return { value: el._id, label: el.name };
            })}
            errors={errors}
            control={control}
            onChangeAction={(value: string) =>
              fetchUpdateOrderStatus(singleOrder._id, value)
            }
            required={{ required: true }}
          />
          <p className="Order-Item-Form-Title">Payment Type</p>
          <p className="Order-Item-Form-Text">{singleOrder.paymentType}</p>
          <p className="Order-Item-Form-Title">Price</p>
          <p className="Order-Item-Form-Text">{`${singleOrder.price.toFixed(
            2
          )} €`}</p>
          {singleOrder.nif ? (
            <>
              <p className="Order-Item-Form-Title">NIF</p>
              <p className="Order-Item-Form-Text">{`${singleOrder.nif}`}</p>
            </>
          ) : null}
          {singleOrder.userName ? (
            <>
              <p className="Order-Item-Form-Title">User Name</p>
              <p className="Order-Item-Form-Text">{`${singleOrder.userName}`}</p>
            </>
          ) : null}
          {singleOrder.phoneNumber ? (
            <>
              <p className="Order-Item-Form-Title">Phone Number</p>
              <p className="Order-Item-Form-Text">{`${singleOrder.phoneNumber}`}</p>
            </>
          ) : null}
          <p className="Order-Item-Form-Main">Address</p>
          <div className="Order-Item-Form-Row">
            <div className="Order-Item-Form-Row-Container">
              <p className="Order-Item-Form-Title">Street Name</p>
              <p className="Order-Item-Form-Text">
                {singleOrder.address.streetName
                  ? singleOrder.address.streetName
                  : "Not added"}
              </p>
            </div>
            <div className="Order-Item-Form-Row-Container">
              <p className="Order-Item-Form-Title">Street Number</p>
              <p className="Order-Item-Form-Text">
                {singleOrder.address.streetNumber
                  ? singleOrder.address.streetNumber
                  : "Not added"}
              </p>
            </div>
            <div className="Order-Item-Form-Row-Container">
              <p className="Order-Item-Form-Title">Floor</p>
              <p className="Order-Item-Form-Text">
                {singleOrder.address.floor
                  ? singleOrder.address.floor
                  : "Not added"}
              </p>
            </div>
            <div className="Order-Item-Form-Row-Container">
              <p className="Order-Item-Form-Title">Entrance</p>
              <p className="Order-Item-Form-Text">
                {singleOrder.address.entrance
                  ? singleOrder.address.entrance
                  : "Not added"}
              </p>
            </div>
            <div className="Order-Item-Form-Row-Container">
              <p className="Order-Item-Form-Title">Comment</p>
              <p className="Order-Item-Form-Text">
                {singleOrder.address.comment
                  ? singleOrder.address.comment
                  : "Not added"}
              </p>
            </div>
          </div>
          <p className="Order-Item-Form-Main">Products</p>
          <table className="Orders-Table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Storage Info</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {singleOrder.products
                ? singleOrder.products.map((item: any, index: number) => (
                    <>
                      <tr>
                        <td align="left">
                          <img
                            src={item.images[0]}
                            className="Orders-Table-Image"
                          />
                        </td>
                        <td className="Orders-Table-Title" align="left">
                          {item.title}
                        </td>
                        <td className="Orders-Table-Title" align="left">
                          {item.storage_info}
                        </td>
                        <td className="Orders-Table-Title" align="left">
                          {item.count}
                        </td>
                      </tr>
                    </>
                  ))
                : null}
            </tbody>
          </table>
        </form>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    singleOrder: state.orders.singleOrder,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSingleOrder: (orderId: string) => dispatch(fetchSingleOrder(orderId)),
  fetchUpdateOrderStatus: (orderId: string, newStatus: string) =>
    dispatch(fetchUpdateOrderStatus(orderId, newStatus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderItemContainer);
