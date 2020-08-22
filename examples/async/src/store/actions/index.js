/*
 * @Author: yayxs
 * @Date: 2020-08-22 18:15:25
 * @LastEditTime: 2020-08-22 18:31:24
 * @LastEditors: yayxs
 * @Description:
 * @FilePath: \state-management-compare\examples\async\src\store\actions\index.js
 * @
 */

import { SELECT_SUBREDDIT } from "../actionsTypes/index";

export const selectAction = (payload) => ({
  type: SELECT_SUBREDDIT,
  payload,
});
