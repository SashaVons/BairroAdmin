import { put, call, takeLatest } from "redux-saga/effects";
import {
  requestAuthUser,
  requestAuthUserError,
  requestAuthUserSuccess,
} from "./actions";
import { FETCH_AUTH_USER } from "./constants";
import { AuthUserAction, FetchAuthUser } from "./types";
import { auth, firestore } from "../../common/firebase";

function* fetchAuthUser(data: FetchAuthUser) {
  try {
    yield put(requestAuthUser());

    const user = yield call(() =>
      auth.signInWithEmailAndPassword(data.email, data.password)
    );

    const additional_user = yield call(() =>
      firestore
        .collection("additional_users")
        .where("userId", "==", user.user.uid)
        .get()
        .then((querySnapshot) => {
          const resData: any = [];

          querySnapshot.forEach((documentSnapshot) => {
            resData.push({
              _id: documentSnapshot.id,
              ...documentSnapshot.data(),
            });
          });

          return resData;
        })
    );

    localStorage.setItem("user", JSON.stringify(additional_user[0]));

    yield put(requestAuthUserSuccess(additional_user[0]));
    data.history.push("/cabinet");
  } catch (error) {
    console.log(error);
    yield put(requestAuthUserError());
  }
}

export function* watchFetchAuthUser() {
  yield takeLatest<AuthUserAction>(FETCH_AUTH_USER, fetchAuthUser);
}
