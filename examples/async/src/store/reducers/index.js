/*
 * @Author: yayxs
 * @Date: 2020-08-22 17:33:32
 * @LastEditTime: 2020-08-22 18:30:23
 * @LastEditors: yayxs
 * @Description:
 * @FilePath: \state-management-compare\examples\async\src\store\reducers\index.js
 * @
 */
import { combineReducers } from "redux";
import { SELECT_SUBREDDIT } from "../actionsTypes";

// 选择框
const selected = (state = `react.js`, { type, payload }) => {
  switch (type) {
    case SELECT_SUBREDDIT:
      return payload;

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  selected,
});
export default rootReducer;
