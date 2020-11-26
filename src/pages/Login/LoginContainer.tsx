import React, { FC, useEffect } from "react";
import { Login } from "./Login";
import { useForm } from "react-hook-form";
import "./login.scss";
import { connect } from "react-redux";
import { RootState } from "../../redux/RootReducer";
import { fetchAuthUser } from "../../redux/user/actions";
import { Dispatch } from "redux";
import { useHistory } from "react-router-dom";

interface LoginProps {
  fetchAuthUser: (email: string, password: string, history: any) => void;
  user: any;
}

const LoginContainer: FC<LoginProps> = ({ fetchAuthUser, user }) => {
  let history = useHistory();
  useEffect(() => {
    if (user && user.type) history.push("/cabinet");
  }, []);
  return (
    <div className="Login">
      <Login
        fetchAuthUser={(email, password, history) =>
          fetchAuthUser(email, password, history)
        }
      />
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchAuthUser: (email: string, password: string, history: any) =>
    dispatch(fetchAuthUser(email, password, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
