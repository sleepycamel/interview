import React from "react";
import PropTypes from 'prop-types';
import styles from "./Button.module.sass";

export default function Button({ id, value, type, onClick }) {
  const className = styles[id] || styles[type];
  return (
    <button id={id} className={className} onClick={() => onClick(type, id, value)}>
      {value}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(['function', 'number', 'operator']),
  onClick: PropTypes.func.isRequired,
}

Button.defaultProps = {
  type: 'number'
}
