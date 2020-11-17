import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/RootReducer";
import { Preloader } from "./components/Preloader/Preloader";
import "./App.css";
import CabinetAppMain from "./components/CabinetApp/CabinetApp";

function App() {
  return (
    <Suspense fallback={<Preloader />}>
      <Router>
        {/* Store */}
        <Provider store={store}>
          <CabinetAppMain />
        </Provider>
      </Router>
    </Suspense>
  );
}

export default App;
