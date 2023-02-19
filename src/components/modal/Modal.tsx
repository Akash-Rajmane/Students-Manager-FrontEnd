import React from 'react';
import ModalTypes from "./ModalTypes";
import classes from "./Modal.module.scss";
import { AiFillCloseCircle } from 'react-icons/ai';
import BackDrop from '../../layouts/backdrop/BackDrop';
import ReactDOM from "react-dom";

const Modal:React.FC<ModalTypes> = ({modalTitle,onClose,footer,footerContent,modalContent,show,setShow}) => {
  const child = (<>
    {show && <BackDrop onClick={()=>{setShow(false)}}/>}
    <div className={classes.modal}>
    <div className={classes.modalHeader}> <span className={classes.modalTitle}>{modalTitle && modalTitle} </span>
    <span> <AiFillCloseCircle onClick={onClose} className={classes.closeIcon}/></span>
     </div>
    <div className={classes.modalBody}>
    {modalContent}
    </div>
    {footer && <div className={classes.modalFooter}>
      <hr className={classes.footerLine}></hr>
      {footerContent && footerContent}    
    </div>}
    </div>
    </>);

  const parent = document.getElementById("modal")! as HTMLElement;
  
  return ReactDOM.createPortal(child,parent);
  }

export default Modal;
