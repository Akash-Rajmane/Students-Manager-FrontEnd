import React from 'react';
<<<<<<< HEAD
import './Input.scss';

type InputTypes = {
  label?: string;
  type: string;
  value?: string;
  size?: 'sm' | 'lg' | 'x-lg';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
=======
import InputTypes from './InputTypes';
import classes from './Input.module.scss';
>>>>>>> 407d76694c76e078ed630ee02fcb2fa6344c2c8d

const Input: React.FC<InputTypes> = ({
  label,
  type,
  value,
  size,
  ...props
}) => {
 

  const inputClass = `${size==="sm"? "sm": size==="x-lg"? "x-lg": "lg"}`;
  
  
  return (
    <div className={"inputComponent"}>
      <input
        className={inputClass}
        placeholder={label && label}
        type={type}
        value={value}
        {...props}
      />
    </div>
  );
};

export default React.memo(Input);
