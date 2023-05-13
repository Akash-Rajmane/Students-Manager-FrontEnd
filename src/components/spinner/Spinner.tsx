import React from 'react';
import { SpinnerTypes } from './SpinnerTypes';
import classes from './Spinner.module.scss';

const Spinner: React.FC<SpinnerTypes> = ({ size, type, customClass }) => {
  return (
    <div className={customClass && customClass}>
      {type === 'hourGlass' ? (
        <div className={classes.spin}>
          <div
            className={
              size === 'small'
                ? classes.hourGlassSmall
                : size === 'medium'
                ? classes.hourGlassMed
                : classes.hourGlassLarge
            }
          >
            ⌛
          </div>
        </div>
      ) : (
         <div className={classes.wrapper}>
          <img fetchpriority='high' src="https://ik.imagekit.io/Akash/people-16x16.png?updatedAt=1683998397233" className={classes.logo}/>
          <div className={classes.spin}>
            <div
              className={
                size === 'small'
                  ? classes.circleSmall
                  : size === 'medium'
                  ? classes.circleMed
                  : classes.circleLarge
              }
            >
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Spinner;
