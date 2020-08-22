import React, { memo } from "react";
import PropTypes from "prop-types";
const Picker = memo(({ val, onChange, options }) => {
  return (
    <div>
      <h1>{val}</h1>
      <select onChange={(e) => onChange(e.target.value)} value={val}>
        {options.map((ops) => {
          return (
            <option value={ops} key={ops}>
              {ops}
            </option>
          );
        })}
      </select>
    </div>
  );
});

Picker.propTypes = {
  val: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
export default Picker;
