import React,{useState,useEffect} from 'react';
import InputTypes from './InputTypes';
import classes from './Input.module.scss';

const Input: React.FC<InputTypes> = ({
  label,
  type,
  value,
  size,
  ...props
}) => {
 

  const inputClass = `${size==="sm"? classes["sm"]: size==="x-lg"? classes["x-lg"]: classes["lg"]}`;
  
 
  
  return (
    <div className={`${classes.inputComponent} `}>
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
