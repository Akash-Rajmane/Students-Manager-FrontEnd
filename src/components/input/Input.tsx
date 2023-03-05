import React from 'react';
import './Input.scss';

type InputTypes = {
  label?: string;
  type: string;
  value?: string;
  size?: 'sm' | 'lg' | 'x-lg';
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

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
