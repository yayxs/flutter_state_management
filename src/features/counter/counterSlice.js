import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 1,
  },
  reducers: {
    incrementAction: (state) => {
      state.value = state.value + 1;
    },
    incrementWithPayloadAction: (state, { payload }) => {
      console.log(state.value);
      console.log(payload);
      state.value = state.value + payload;
    },
  },
});

// 异步操作
export const incrementAsyncAction = (num) => (dispatch) => {
  console.log(num);
  setTimeout(() => {
    dispatch(incrementWithPayloadAction(num));
  }, 2000);
};

export const selectCount = (state) => state.counter.value;

export const {
  incrementAction,
  incrementWithPayloadAction,
} = counterSlice.actions;
export default counterSlice.reducer;
