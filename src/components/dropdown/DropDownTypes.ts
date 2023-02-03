type DropDownTypes = {
  label: string;
  optionsArr: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>> ;
  customClass?: string;
};

export default DropDownTypes;
