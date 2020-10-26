import React from 'react';
import styles from './checkbox.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';


const Checkbox = ({
  label = 'label',
  disabled = false,
  classes = { checkbox: '', label: '', container: '' },
  children,
  style,
  ...props
}) => {
  return (
    <label className={clsx(styles.container, classes.container, disabled && styles.disabled)} style={style && {...style}}>
      <p className={clsx(styles.label, classes.label)}>{label}</p>
      <input type={'checkbox'} {...props} disabled={disabled}/>
      <span className={clsx(styles.checkmark, classes.checkbox)}/>
      {children}
    </label>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  disabled: PropTypes.bool,
  classes: PropTypes.exact({ checkbox: PropTypes.string, label: PropTypes.string, container: PropTypes.string }),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default Checkbox;