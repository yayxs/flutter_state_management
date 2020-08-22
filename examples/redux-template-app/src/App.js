/*
 * @Author: yayxs
 * @Date: 2020-08-22 10:25:21
 * @LastEditTime: 2020-08-22 10:28:21
 * @LastEditors: yayxs
 * @Description:
 * @FilePath: \state-management-compare\examples\redux-template-app\src\App.js
 * @
 */
import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
      </header>
    </div>
  );
}

export default App;
