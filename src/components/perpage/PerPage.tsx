import React,{useState} from 'react';
import "./PerPage.scss";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

type PerPageTypes = {
  label: string;
  optionsArr: number[];
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>> ;
  customClass?: string;
};


const PerPage:React.FC<PerPageTypes> = ({ 
    label,
    optionsArr,
    customClass,
    selected,
    setSelected,}) => {

const [isActive, setIsAcive] = useState<boolean>(false);
const perPageContentClass = isActive
    ? "perPageContentOverlay"
    : "perPageContentHidden";

  return (
    <div className={customClass && customClass}>
    <div className={"perPageContainer"}  onClick={(e) => setIsAcive(!isActive)}>
      <span className={"label"}>{label}</span>
      <div className={"perPageBox"}>
        <span className={"selectedPerPage"}>{selected}</span>
        <span
          className={"dropIcon"}
          onClick={(e) => {
            setIsAcive(!isActive);
          }}
        >
          {!isActive ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
        </span>
      </div>
    </div>
    <div className={perPageContentClass}>
      {isActive &&
        optionsArr.map((option: any, idx: any) => {
          return (
            <div
              key={idx}
              onClick={() => {
                setSelected(option);
                setIsAcive(false);
              }}
              className={"dropDownItem"}
            >
              {option}
            </div>
          );
        })}
    </div>
  </div>
  )
}

export default PerPage;