type ButtonTypes = {
  label: string;
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xlarge';
  color?: 'greenyellow' |'green' | 'red' | 'blue';
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};

export default ButtonTypes;
