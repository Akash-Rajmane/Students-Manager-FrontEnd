type InputTypes = {
  label?: string;
  type: string;
  title?: string;
  pattern?: string;
  id?: string;
  name?: string;
  customClass?: string;
  value?: string;
  minLength?: number;
  maxLength?: number;
  autoComplete?: string;
  required?: boolean;
  disabled?: boolean;
  errorFlag?: boolean;
  errorText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default InputTypes;
