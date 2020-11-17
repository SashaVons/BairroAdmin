import React, { FC } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { PrivateRoute } from "../../common/routes/PrivateRoute";
import { RootState } from "../../redux/RootReducer";
// import Cabinet from "../../pages/Cabinet/CabinetContainer";

const Cabinet = React.lazy(
  () => import("../../pages/Cabinet/CabinetContainer")
);

const LoginContainer = React.lazy(
  () => import("../../pages/Login/LoginContainer")
);

interface CabinetAppMainProps {
  user: any;
}

const CabinetAppMain: FC<CabinetAppMainProps> = ({ user }) => {
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/cabinet" component={Cabinet} authed={user} />
        <Route exact path="/login" render={() => <LoginContainer />} />
        <Route path="*" render={() => <LoginContainer />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps, {})(CabinetAppMain);
