import React,{useState} from 'react';
import PerPageTypes from "./PerPageTypes";
import classes from "./PerPage.module.scss";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';


const PerPage:React.FC<PerPageTypes> = ({ 
    label,
    optionsArr,
    customClass,
    selected,
    setSelected,}) => {

const [isActive, setIsAcive] = useState<boolean>(false);
const perPageContentClass = isActive
    ? classes.perPageContentOverlay
    : classes.perPageContentHidden;

  return (
    <div className={customClass && customClass}>
    <div className={classes.perPageContainer}  onClick={(e) => setIsAcive(!isActive)}>
      <span className={classes.label}>{label}</span>
      <div className={classes.perPageBox}>
        <span className={classes.selectedPerPage}>{selected}</span>
        <span
          className={classes.dropIcon}
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
              className={classes.dropDownItem}
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