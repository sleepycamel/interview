import PropTypes from 'prop-types';
import styles from "../styles/SimpleCalculator.module.sass";
import cn from 'classnames';

export default function Button({ id, value, type, onClick, isActive }) {
  const className = styles[id] || styles[type];
  return (
    <button id={id} className={cn(className, {[styles.isActive]: isActive})} onClick={() => onClick(type, id, value)}>
      {value}
    </button>
  );
};

Button.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.oneOf(['function', 'number', 'operator']),
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}

Button.defaultProps = {
  type: 'number',
  isActive: false
}
