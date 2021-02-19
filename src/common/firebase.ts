import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const config = {
  apiKey: "AIzaSyAWAhT6IkDSQLrQQjgK57aZoZDnRlrWV4c",
  authDomain: "delivery-app-41f3b.firebaseapp.com",
  databaseURL: "https://delivery-app-41f3b.firebaseio.com",
  projectId: "delivery-app-41f3b",
  storageBucket: "delivery-app-41f3b.appspot.com",
  messagingSenderId: "485923720963",
  appId: "1:485923720963:web:dad814e7a0970d5b666336",
  measurementId: "G-B8QJDS7HSN",
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

export const storage = firebase.storage();

export const database = firebase.database();

export default firebase;
