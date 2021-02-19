import React, { FC, useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { PrivateRoute } from "../../common/routes/PrivateRoute";
import { RootState } from "../../redux/RootReducer";
import { fetchAllOrders } from "../../redux/orders/actions";
import { Dispatch } from "redux";
import { firestore } from "../../common/firebase";
import notify from "../../assets/music/alert.wav";
// const notify = require("../../assets/music/notification.mp3");
// import Cabinet from "../../pages/Cabinet/CabinetContainer";

const Cabinet = React.lazy(
  () => import("../../pages/Cabinet/CabinetContainer")
);

const LoginContainer = React.lazy(
  () => import("../../pages/Login/LoginContainer")
);

interface CabinetAppMainProps {
  user: any;
  fetchAllOrders: () => void;
  orders: any;
}

const CabinetAppMain: FC<CabinetAppMainProps> = ({
  user,
  fetchAllOrders,
  orders,
}) => {
  const [ordersReady, setOrdersReady] = useState(false);

  useEffect(() => {
    if (orders) {
      setOrdersReady(true);
    } else {
      fetchAllOrders();
      setOrdersReady(false);
    }
  }, [orders]);

  useEffect(() => {
    if (ordersReady) {
      const notifyAudio = new Audio(notify);
      let initState = true;
      let oldOrdersLength = 0;
      oldOrdersLength = orders.length;
      firestore.collection("orders").onSnapshot((snapshot) => {
        if (initState) {
          fetchAllOrders();
          initState = false;
        } else {
          const newOrders = [];
          snapshot.forEach((doc) => {
            newOrders.push(doc.data());
          });
          if (newOrders.length > oldOrdersLength) {
            if (notifyAudio.duration > 0 && !notifyAudio.paused) {
              notifyAudio.pause();
              notifyAudio.currentTime = 0;
              notifyAudio.play();
            } else {
              notifyAudio.play();
            }
            notifyAudio.currentTime = 0;
            notifyAudio.play();
            oldOrdersLength = newOrders.length;
          }
          fetchAllOrders();
        }
      });
    }
  }, [ordersReady]);
  return (
    <div className="App">
      <Switch>
        <PrivateRoute
          path="/cabinet"
          component={Cabinet}
          authed={user && user.type}
        />
        <Route exact path="/login" render={() => <LoginContainer />} />
        <Route path="*" render={() => <LoginContainer />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
    orders: state.orders.orders,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAllOrders: () => dispatch(fetchAllOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CabinetAppMain);
