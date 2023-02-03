import React, { useState } from 'react';
import DropDownTypes from './DropDownTypes';
import classes from './DropDown.module.css';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbMinusVertical } from 'react-icons/tb';

const DropDown: React.FC<DropDownTypes> = ({
  label,
  optionsArr,
  customClass,
  selected,
  setSelected,
}) => {
  const [isActive, setIsAcive] = useState<boolean>(false);
  const dropDownContentClass = isActive
    ? classes.dropDownContentOverlay
    : classes.dropDownContentHidden;

  return (
    <div className={customClass && customClass}>
      <div className={classes.dropDownContainer}>
        <div className={classes.dropDownBox}  onClick={(e) => {
              !selected && setIsAcive(!isActive);
            }}>
          {selected ? selected : label}
          {selected && (
            <div className={classes.icons} >
              <span
                className={classes.closeIcon}
                onClick={() => {
                  setSelected('');
                  setIsAcive(false);
                }}
              >
                <AiFillCloseCircle />
              </span>
              <span className={classes.lineIcon}>
                <TbMinusVertical />
              </span>
            </div>
          )}
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
      <div className={dropDownContentClass}>
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
  );
};

export default DropDown;
