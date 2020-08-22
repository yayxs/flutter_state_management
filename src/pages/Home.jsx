import React, { useEffect } from "react";
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
