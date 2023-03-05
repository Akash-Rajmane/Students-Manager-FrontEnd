import React from 'react';
import './Button.scss';

type ButtonTypes = {
  label: string;
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'greenyellow' |'green' | 'red' | 'blue';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

const Button: React.FC<ButtonTypes> = ({
  label,
  size,
  color,
  onClick,
  type,
}) => {
  const btnClass = `${"customBtn"} 
  ${size==="small"? "small" : size==="large"? "large" : size==="medium"? "medium" : size==="xs"? "xs" : "xlarge"}
  ${color==="blue"? "blue" : color==="red"?  "red": color==="green"? "green":"greenyellow"} 
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
