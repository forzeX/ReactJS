import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import store from "./Store/store";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
