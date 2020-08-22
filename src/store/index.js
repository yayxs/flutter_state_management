/*
 * @Author: yayxs
 * @Date: 2020-08-22 11:48:40
 * @LastEditTime: 2020-08-22 12:04:43
 * @LastEditors: yayxs
 * @Description:
 * @FilePath: \state-management-compare\src\store\index.js
 * @
 */
import { createStore } from "redux";
import { counterReducer } from "../pages/Home";

const store = createStore(
  counterReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
