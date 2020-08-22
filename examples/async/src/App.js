import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Picker from "./components/Picker.jsx";
import { selectAction } from "./store/actions";
class App extends PureComponent {
  static propTypes = {
    selected: PropTypes.string.isRequired,
  };

  componentDidMount() {}
  handleChange = (next) => {
    this.props.changeSelect(next);
  };
  render() {
    const { selected } = this.props;
    return (
      <div>
        <Picker
          val={selected}
          onChange={this.handleChange}
          options={["react.js", "frontend"]}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { selected } = state;
  return {
    selected,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeSelect: (val) => {
      dispatch(selectAction(val));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
