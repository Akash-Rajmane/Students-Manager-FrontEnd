import React from 'react';
import ButtonTypes from './ButtonTypes';
import classes from './Button.module.scss';

const Button: React.FC<ButtonTypes> = ({
  label,
  size,
  color,
  onClick,
  disabled,
  type,
}) => {
  const btnClass = `${classes.customBtn} 
  ${size==="small"? classes["small"] : size==="large"? classes["large"] : size==="medium"? classes["medium"] : size==="xs"? classes["xs"] : classes["xlarge"]}
  ${color==="blue"? classes["blue"] : color==="red"?  classes["red"]: color==="green"? classes["green"]: disabled ? classes["disabledBtn"]:classes["greenyellow"] } 
 `;

  return (
    <div>
      <button onClick={onClick} className={btnClass} type={type} >
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
