import React from 'react';
import "./Modal.module.scss";
import { AiFillCloseCircle } from 'react-icons/ai';
import BackDrop from '../../layouts/backdrop/BackDrop';
import ReactDOM from "react-dom";

type ModalTypes = {
  show: boolean;
  setShow:  React.Dispatch<React.SetStateAction<boolean>>;
  footer:boolean;
  modalTitle?: string | JSX.Element | JSX.Element[];
  onClose: (e:React.MouseEvent<SVGElement>)=>void;
  footerContent?: string | JSX.Element | JSX.Element[];
  modalContent: string | JSX.Element | JSX.Element[];
  }

const Modal:React.FC<ModalTypes> = ({modalTitle,onClose,footer,footerContent,modalContent,show,setShow}) => {
  const child = (<>
    {show && <BackDrop onClick={()=>{setShow(false)}}/>}
    <div className={"modal"}>
    <div className={"modalHeader"}> <span className={"modalTitle"}>{modalTitle && modalTitle} </span>
    <span> <AiFillCloseCircle onClick={onClose} className={"closeIcon"}/></span>
     </div>
    <div className={"modalBody"}>
    {modalContent}
    </div>
    {footer && <div className={"modalFooter"}>
      <hr className={"footerLine"}></hr>
      {footerContent && footerContent}    
    </div>}
    </div>
    </>);

  const parent = document.getElementById("modal")! as HTMLElement;
  
  return ReactDOM.createPortal(child,parent);
  }

export default Modal;
