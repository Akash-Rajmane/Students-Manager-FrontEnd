type ButtonTypes = {
  label: string | JSX.Element;
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'greenyellow' |'green' | 'red' | 'blue';
  customClass?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default ButtonTypes;
