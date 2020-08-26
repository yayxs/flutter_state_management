import React, { memo, useState } from "react";

import { useSelector, useDispatch ,shallowEqual} from "react-redux";
import {
  selectCount,
  incrementAction,
  incrementWithPayloadAction,
  incrementAsyncAction,
} from "./counterSlice";

export default memo(function Counter() {
  // 自身状态
  const [num, setNum] = useState(5);
  const count = useSelector(selectCount,shallowEqual);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <hr />
      <button onClick={() => dispatch(incrementAction())}>值+1</button>
      <button onClick={() => dispatch(incrementWithPayloadAction(num))}>
        值+{num}
      </button>
      <hr />
      <button onClick={() => dispatch(incrementAsyncAction(100))}>+ 100</button>
    </div>
  );
});
