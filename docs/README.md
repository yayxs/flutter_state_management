> - **源码在 github 仓库 （[state-management-compare](https://github.com/yayxs/state-management-compare)）**    master主分支  横向对比前端开发中不同状态管理方案
> - 原文收录在  [readux  202008月版](https://github.com/yayxs/state-management-compare/tree/master/docs)

[TOC]



## 目录

1. #### 介绍

2. #### 计数器

## 介绍

### 概述

**Redux 是 JavaScript 应用程序的可预测状态容器** （大小 2KB）

### 安装工具

```bash
yarn add @reduxjs/toolkit
yarn add redux
npm install --save-dev redux-devtools
```

### 简单案例

```jsx
// action type
const ADD = "ADD";
// action creator
const counterActionCreator = () => ({
  type: ADD,
  payload: {},
});
// init State
const initState = {
  number: 0,
  list: [
    {
      id: "1",
    },
  ],
  info: {
    userName: "yayxs",
  },
};
// A reducer
const counterReducer = (initState, counterActionCreator()) => {};
// create store
let store = createStore(counterReducer);
// subscribe
store.subscribe(() => console.log(store.getState()));
//change state
store.dispatch(counterActionCreator());
```

#### Action

`action`顾名思义`动作`，`行动` `行为`，一言以蔽之，它是把数据从应用传到`仓库`的一个动作，也就是这个数据仓库

- JS 对象

- 格式

  ```js
  {
      type:ADD, // type 字段是约定，大家的约定，表示动作的名字,
      index:1,
      content:'这是一点内容'
  }
  ```

  - 对象的`type`字段表示执行的动作;字符串常量
  - index 唯一的 ID,主要是一个标识
  - content（或者其他）JS 对象什么字段都可以啊，一个字段而已

**在实际的开发中我们习惯上是 action 创建函数**

```js
const addAction = (params) => {
  return {
    type: ADD,
    ...params,
  };
};
```

#### Reducer

现在我们依旧不说`store` 这个概念，现在`动作`有了，但是`action`它只是描述了一下这个动作，但并不知道咋更新数据，提到数据，我们假使

```js
{
  num: 0;
}
```

这个简单的`js对象`就是数据

**ACTION 是个普通的对象；REDUCER 是个普通的函数**

- 说普通也不普通，js 的函数而已

  - ```js
    function(a,b){
        console.log(a+b)
    }
    ```

  - 但是没那么简单

- 干净简单，

- ```js
  // 默认的数据
  const initData = {
    num: 123,
  };
  // reducer
  const counterReducer = (state = initData, action) => {
    // 啥也不干，返回传进来的state(此时默认的initData)
    return state;
  };
  ```

- 怎么可能啥也不干呢

```js
import { addAction } from "./actions";
// 默认的数据
const initData = {
  num: 123
};
// reducer
const counterReducer = (state = initData, action) => {
  // 判断传入的动作是什么类型
  switch (action.type) {
    case addAction:
      return Object.assign({}, state, {
        ...
      });
    default:
      return state;
  }

  // 啥也不干，返回传进来的state(此时默认的initData)
  //   return state;
};


```

**注意**

- 不能修改传进来的数据
- 在默认情况下，一定得返回旧的`state`

#### Store

- 这就是那个状态仓库，维持状态
- getState() 方法获取 state
- 提供 dispatch ()方法发送 action
- 通过 subscribe()来注册监听

#### 获取状态

```js
getState();
```

#### 更新状态

```js
dispatch(action);
```

也就是我们说的派发一个动作

#### 注册监听（订阅）

```js
subscribe(listener);
```

### 三大原则

- 单一数据源，唯一的状态仓库(** Single source of truth**)

  - ```json
    {
      "number": 123,
      "obj": {},
      "list": []
    }
    ```

- state 是只读 (** State is read-only**)

- 纯函数执行修改数据的修改 (** Changes are made with pure functions**)

### 组成部分

- state
  - 服务端的数据
  - UI 数据
  - app state
- Action
- Reducer
- Store

## 计数器

在这个时候，有个问题，前边说的这一切，那我们该怎么来创建这个仓库呢

```sh
yarn add redux
```

这个库里就有方法，也就是我们常说的`redux`

### 构建 action

```js
import { ADD_TYPE } from "./actionTypes";
const actionCreator = (params) => ({
  type: ADD_TYPE,
  payload: {
    ...params,
  },
});

export { addAction };
```

### 构建 reducer

```js
import { actionCreator } from "./actions";
// 默认的数据
const InitialState = {
  info: {
    counter: 0,
  },
};
// reducer
const counterReducer = (state = { num: 123 }, action) => {
  // 判断传入的动作是什么类型
  switch (action.type) {
    case addAction:
      return Object.assign({}, state, action);
    default:
      return state;
  }

  // 啥也不干，返回传进来的state(此时默认的initData)
  //   return state;
};

export { counterReducer };
```

### 创建 store

#### 引入文件

```js
import { createStore } from "redux";
import { counterReducer } from "./reducers";
```

#### createStore

```js
const store = createStore(
  counterReducer /* preloadedState, */,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
```

### 派发 action

```js
const handleClick = () => {
  console.log(`点击了按钮`);
  const action = addAction({ num: "456" });
  store.dispatch(action);
};
```

### 监听

```js
useEffect(() => {
  store.subscribe(() => {
    console.log("-----", store.getState());
  });
}, []);
```

### 订阅状态的变更

```js
const render = () => {
  ReactDom.render(<App />, document.querySelector("#root"));
};
// 上来的时候先渲染一次
render();
// 订阅变更，每当数据发生的变化的时候，就重新渲染
store.subscribe(render);
```

### 小结

通过一个简单的案例，我们知道一个简易的流程：

1. 首先构建一个`action` 返回一个对象**必须有 type 属性**
2. 构建`reducer` 响应 action t 通过 return 把数据传回 store
3. 利用`redux`这个库来创建一个 store 传递写好的`reducer`
4. 利用的`$store.subscribe()` 注册监听
5. 可以通过`store.getState()` 取值

## React-Redux

那在如上我们使用的`redux` 这个库看起来是没有问题，**但是**

- 首先要导入 store
- 然后注册监听
- 然后组件销毁的时候，我们取消监听

这一波流的操作在每个组件都要走一遍，显然是十分繁琐和重复的，这就需要看谁能不能帮帮我，这就是`react-redux` 如果需要把`redux`整合到`react` 中来使用就需要`react-redux`

### 什么是`react-redux`

- redux 官方出品

- 能够更好的结合`react` 来管理数据

### Provider 组件

- 包裹在最外层的组件之外，这样可以使所有的子组件都可以拿到`state`
- 接收`store` 作为`props` 通过`context` 传递

```jsx
<Provider store={store}>
  <App />
</Provider>
```

### mapStateToProps(state,ownProps)

```js
const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return state;
  // return {
  //     prop: state.prop
  // }
};
```

### mapDispathToProps(dispath,ownProps)

```js
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendAction: () => {
      dispatch({
        type: "ADD_TYPE",
      });
    },
  };
};
```

### connect 方法

- 组件内部获取`store` 中的`state`
- 通过`connect` 加强

```jsx
export default connect(
  (state, { history, location, match, staticContext }) => ({
    ...state,
  }),
  (dispatch, { history, location, match, staticContext }) => ({
    add() {
      dispatch(
        actionCreator({
          num: 10,
        })
      );
    },
  })
)(Home);
```

### 完整代码

```jsx
import React, { memo, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";

const ADD_TYPE = "ADD_TYPE";
const actionCreator = (params) => ({
  type: ADD_TYPE,
  payload: {
    ...params,
  },
});
const InitialState = {
  counter: 0,
};
export const counterReducer = (state = InitialState, { type, payload }) => {
  switch (type) {
    case ADD_TYPE:
      console.log(state);
      return {
        ...state,
        counter: state.counter + payload.num,
      };
    default:
      return state;
  }
};

const Home = ({ history, location, match, staticContext, counter, add }) => {
  useEffect(() => {
    return () => {};
  }, []);

  const handleClick = (e) => {
    add();
  };
  return (
    <>
      <p>这是组件</p>
      <h3>{counter}</h3>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        点击爱
      </button>
    </>
  );
};

export default connect(
  (state, { history, location, match, staticContext }) => ({
    ...state,
  }),
  (dispatch, { history, location, match, staticContext }) => ({
    add() {
      dispatch(
        actionCreator({
          num: 10,
        })
      );
    },
  })
)(Home);

```



### 使用

- 安装相关的依赖

- 构建 store 和 readucer

- Provider 组件实现

```jsx
<>
  <Provider store={store}>
    <List></List>
    <Detail></Detail>
  </Provider>
</>
```

- connect

### combineReducers

- 函数，接收一个参数
- 拆分 reducer

```js
import { createStore, combineReducers } from "redux";
// import { counterReducer } from "./reducers";
// import rootReducer from './reducers/index'

import { infoReducer } from "./reducers/infoReducer";
import { listReducer } from "./reducers/listReducer";

const reducer = combineReducers({
  infoReducer,
  listReducer,
});

// 构建store
const store = createStore(reducer);
export default store;
```

### 创建组件

- ComA A 组件

  ```react
  import React, { Component } from "react";
  import { connect } from "react-redux";
  class ComA extends Component {
    handleClick = () => {
      this.props.getInfo();
    };

    render() {
      return (
        <div>
          {/* <h3>{this.props.}</h3> */}
          <button onClick={this.handleClick}>获取信息</button>
        </div>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    console.log(state.infoReducer);
    // return {
    //   prop: state.prop,
    // };
    // return state
    return {
      ...state.infoReducer,
    };
  };
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getInfo: () => {
        const actionCreator = {
          type: "GET_INFO",
        };

        dispatch(actionCreator);
      },
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ComA);

  ```

* ComB

  ```react
  import React, { Component } from "react";
  import { connect } from "react-redux";

  class ComB extends Component {
    handleClick = () => {
      this.props.getList();
    };
    render() {
      return (
        <div>
          <button onClick={this.handleClick}>获取列表</button>
        </div>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    console.log(state.listReducer)
    // return state
    return {
      ...state.listReducer
    }
  };

  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      getList: () => {
        const actionCreator = {
          type: "GET_LIST",
        };
        dispatch(actionCreator);
      },
    };
  };
  ```

export default connect(mapStateToProps, mapDispatchToProps)(ComB);

````

![](https://user-gold-cdn.xitu.io/2020/4/16/17180a5f0b412611?w=940&h=230&f=png&s=17592)

- infoReducer.js

​```js
const info = {
  name: "yayxs",
};

const infoReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_INFO":
      return {
        ...info,
      };

    default:
      return state;
  }
};

export { infoReducer };
````

- listReducer

  ```js
  const listArr = [
    {
      id: 1,
      con: "耳机",
    },
  ];

  const listReducer = (state = {}, action) => {
    switch (action.type) {
      case "GET_LIST":
        return {
          listArr: [...listArr],
        };

      default:
        return state;
    }
  };

  export { listReducer };
  ```

# 三、Redux-Saga

不管怎么说，如上提及数据流操作只支持**同步的操作**，实现异步的话就需要`中间件`

## 1. 中间件

- 本身就是一个函数
- 应用在 action 发布出去之后

## 2 . 概述

- 用来管理副作用，其中包括像`异步操作` ，让副作用的执行更加简单
- es6 的语法，参考阮老师

## 3. createSagaMiddleware

其中源码是这样的

```typescript
export default function createSagaMiddleware<C extends object>(
  options?: SagaMiddlewareOptions<C>
): SagaMiddleware<C>;

export interface SagaMiddlewareOptions<C extends object = {}> {
  /**
   * Initial value of the saga's context.
   */
  context?: C;
  /**
   * If a Saga Monitor is provided, the middleware will deliver monitoring
   * events to the monitor.
   */
  sagaMonitor?: SagaMonitor;
  /**
   * If provided, the middleware will call it with uncaught errors from Sagas.
   * useful for sending uncaught exceptions to error tracking services.
   */
  onError?(error: Error, errorInfo: ErrorInfo): void;
  /**
   * Allows you to intercept any effect, resolve it on your own and pass to the
   * next middleware.
   */
  effectMiddlewares?: EffectMiddleware[];
}
```

#### 导入

```js
import createSagaMiddleware from "redux-saga";
```

#### 构建 store

```js
const store = createStore(sagaReducer, {}, applyMiddleware(sagaMiddleware));
```

- 第一个参数是 reducer
- 第二个 initState
- 第三个参数：中间件

#### 执行

```js
sagaMiddleware.run(defSage);
```

## 4. 案例

### saga 的辅助函数

- takeEvery
- takeLatest
- throttle

- SagaCom

```js
handleClick = (type) => {
  switch (type) {
    case "takeEvery":
      this.props.dispatch({
        type: "takeEvery",
      });
      break;
    case "takeLatest":
      this.props.dispatch({
        type: "takeLatest",
      });
      break;

    case "throttle":
      this.props.dispatch({
        type: "throttle",
      });
      break;

    default:
      break;
  }
};
```

- sages/index.js

```js
import {
  takeEvery,
  takeLatest,
  throttle,
  select,
  call,
} from "redux-saga/effects";

import axios from "axios";
export function* defSage() {
  yield takeEvery("takeEvery", function* () {
    const state = yield select((state) => state.payload);

    const res = yield call(
      axios.post,
      `http://rap2.taobao.org:38080/app/mock/249413/mock-api/v1/users/login`,
      {
        ...state,
      }
    );

    console.log(res);
  });
  // 最后的一次，取消正在运行中
  yield takeLatest("takeLatest", function* () {
    const state = yield select((state) => state.payload);

    const res = yield call(
      axios.post,
      `http://rap2.taobao.org:38080/app/mock/249413/mock-api/v1/users/login`,
      {
        ...state,
      }
    );

    console.log(res);
  });
  /**
   * 毫秒值
   */
  yield throttle(0, "throttle", function* () {
    const state = yield select((state) => state.payload);

    const res = yield call(
      axios.post,
      `http://rap2.taobao.org:38080/app/mock/249413/mock-api/v1/users/login`,
      {
        ...state,
      }
    );

    console.log(res);
  });
}
```

### effect 创建器

详细的 api 用法可以参考官方文档

- select
- call
- take
- put

### 业务流程

#### 获取数据

- 当页面一加载，然后发送一个获取数据的`action`
- 在`reducer` 匹配对应的 action 如果是一部的 action 直接把数据返回
- 在 saga 里使用 `takeEvery` 来进行监听
- call 方法调用异步请求，传入请求的参数
- put 副作用发送 action 成功或者是失败
- 在 reducer 里处理 action

#### 生命周期

- componentDidMount 获取数据
- componentWillUpdate 处理数据

# 四、思考

1. Hooks API ，也就是函数式的组件怎么监听页面数据的变化 ，然后执行刷新？
2. redux-saga 中的辅助函数 `takeEvery` `takeLatest` `throttle` 在底层有什么区别？

---

感谢你看到这，不妨给个星星，感谢
