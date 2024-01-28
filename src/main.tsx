import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; //Add  PersistGate
import { persistStore } from "redux-persist"; // Add persistStore
import store from "./store";
import { ConfigProvider, theme } from "antd";
import faIR from "antd/locale/fa_IR";
import "./scss/style.scss";
import App from "./App";
import { useSelector } from 'react-redux'




const persistor = persistStore(store) // Create persistor For store

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App/>
      <React.StrictMode></React.StrictMode>
    </PersistGate>
  </Provider>
);
