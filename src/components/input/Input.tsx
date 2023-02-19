import React,{useState,useEffect} from 'react';
import InputTypes from './InputTypes';
import classes from './Input.module.scss';

const Input: React.FC<InputTypes> = ({
  label,
  customClass,
  type,
  errorFlag,
  errorText,
  value,
  size,
  ...props
}) => {
  const [showError,setShowError] = useState(false);

  const inputClass = `${errorFlag && classes.error} ${customClass && customClass}
    ${size==="sm"? classes["sm"]: size==="x-lg"? classes["x-lg"]: classes["lg"]}`;
  
  useEffect(()=>{
    if(errorFlag && value){
      setShowError(true);
    }else{
      setShowError(false);
    }
  },[errorFlag,value])
  
  return (
    <div className={`${classes.inputComponent} `}>
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

export default React.memo(Input);
