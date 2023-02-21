import React from 'react';
import ReactDOM from "react-dom";
import classes from "./BackDrop.module.scss";

type BackDropTypes ={
    onClick: (e:React.MouseEvent) => void;
}

const BackDrop:React.FC<BackDropTypes> = ({onClick}) => {
  const child =  <div className={classes.overlay} onClick={onClick}></div>;
  const parent = document.getElementById("backDrop")! as HTMLElement;
 
  return ReactDOM.createPortal(child,parent);
  
}

export default BackDrop;
