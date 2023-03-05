import React from 'react';
import './Spinner.css';

type SpinnerTypes = {
  type?: 'circle' | 'hourGlass';
  size?: 'small' | 'medium' | 'large';
  customClass?: string;
};

const Spinner: React.FC<SpinnerTypes> = ({ size, type, customClass }) => {
  return (
    <div className={customClass && customClass}>
      {type === 'hourGlass' ? (
        <div className={"spin"}>
          <div
            className={
              size === 'small'
                ? "hourGlassSmall"
                : size === 'medium'
                ? "hourGlassMed"
                : "hourGlassLarge"
            }
          >
            ⌛
          </div>
        </div>
      ) : (
        <div className={"spin"}>
          <div
            className={
              size === 'small'
                ? "circleSmall"
                : size === 'medium'
                ? "circleMed"
                : "circleLarge"
            }
          >
          </div>
        </div>
      )}
    </div>
  );
};

export default Spinner;
