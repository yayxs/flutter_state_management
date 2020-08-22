/*
 * @Author: yayxs
 * @Date: 2020-08-22 17:29:20
 * @LastEditTime: 2020-08-22 17:39:29
 * @LastEditors: yayxs
 * @Description:
 * @FilePath: \state-management-compare\examples\async\src\store\index.js
 * @
 */
// import React from "react";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";
const middlewares = [thunk];
if (process.env.NODE_ENV !== "production") {
  middlewares.push(createLogger());
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

export default store;
