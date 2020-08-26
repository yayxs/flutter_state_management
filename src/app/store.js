import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
// 之前的使用方式
// import { createStore } from "redux";
// const counterReducer = (state, action) => {};
// const store = createStore(counterReducer);

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
