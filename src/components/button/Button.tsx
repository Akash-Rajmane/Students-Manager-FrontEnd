import React from 'react';
import ButtonTypes from './ButtonTypes';
import './Button.css';

const Button: React.FC<ButtonTypes> = ({
  label,
  size,
  color,
  onClick,
  disabled,
  customClass,
  type,
  ...props
}) => {
  const btnClass = `customBtn ${size} ${color} ${disabled && `disabledBtn`} ${
    customClass && customClass
  }`;

  return (
    <div>
      <button onClick={onClick} className={btnClass} type={type} {...props}>
        {label}
      </button>
    </div>
  );
};

export default Button;

Button.defaultProps = {
  color: 'greenyellow',
  disabled: false,
  size: 'large',
  type: 'button',
};
