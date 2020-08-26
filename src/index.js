/*
 * @Author: yayxs
 * @Date: 2020-06-17 21:14:10
 * @LastEditTime: 2020-08-22 12:06:52
 * @LastEditors: yayxs
 * @Description:
 * @FilePath: \state-management-compare\src\index.js
 * @
 */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import store from "./store/index";
import store from './app/store';
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
