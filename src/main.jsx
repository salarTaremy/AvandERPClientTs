import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; //Add  PersistGate
import { persistStore } from "redux-persist"; // Add persistStore
import store from "./store";
import "./scss/style.scss";
import { BrowserRouter } from "react-router-dom";

const persistor = persistStore(store); // Create persistor For store
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    </PersistGate>
  </Provider>
);
