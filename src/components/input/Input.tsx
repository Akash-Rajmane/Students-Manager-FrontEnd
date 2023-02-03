import React,{useState,useEffect} from 'react';
import InputTypes from './InputTypes';
import classes from './Input.module.css';

const Input: React.FC<InputTypes> = ({
  label,
  customClass,
  type,
  errorFlag,
  errorText,
  value,
  ...props
}) => {
  const [showError,setShowError] = useState(false);

  const inputClass = `${errorFlag && classes.error} ${
    customClass && customClass
  }`;
  
  useEffect(()=>{
    if(errorFlag && value){
      setShowError(true);
    }else{
      setShowError(false);
    }
  },[errorFlag,value])
  
  return (
    <div className={classes.inputComponent}>
      <input
        className={inputClass}
        placeholder={label && label}
        type={type}
        value={value}
        {...props}
      />
      {showError && (
        <p className={classes.errorText}>
          {errorText?errorText:"Please enter valid data"}
        </p>
      )}
    </div>
  );
};

export default Input;
