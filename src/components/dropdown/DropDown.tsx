import React, { useState } from 'react';
import  './DropDown.scss';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbMinusVertical } from 'react-icons/tb';

type DropDownTypes = {
  label: string;
  optionsArr: string[];
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>> ;
  customClass?: string;
};

const DropDown: React.FC<DropDownTypes> = ({
  label,
  optionsArr,
  customClass,
  selected,
  setSelected,
}) => {
  const [isActive, setIsAcive] = useState<boolean>(false);
  const dropDownContentClass = isActive
    ? "dropDownContentOverlay"
    : "dropDownContentHidden";

  return (
    <div className={customClass && customClass}>
      <div className={"dropDownContainer"}>
        <div className={"dropDownBox"}  onClick={(e) => {
              !selected && setIsAcive(!isActive);
            }}>
          {selected ? selected : label}
          {selected && (
            <div className={"icons"} >
              <span
                className={"closeIcon"}
                onClick={() => {
                  setSelected('');
                  setIsAcive(false);
                }}
              >
                <AiFillCloseCircle />
              </span>
              <span className={"lineIcon"}>
                <TbMinusVertical />
              </span>
            </div>
          )}
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
                className={"dropDownItem"}
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
