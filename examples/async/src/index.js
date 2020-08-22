/*
 * @Author: yayxs
 * @Date: 2020-08-22 17:26:32
 * @LastEditTime: 2020-08-22 17:37:48
 * @LastEditors: yayxs
 * @Description:
 * @FilePath: \state-management-compare\examples\async\src\index.js
 * @
 */
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
