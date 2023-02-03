import { JsxAttribute } from "typescript";



type ModalTypes = {
show: boolean;
setShow:  React.Dispatch<React.SetStateAction<boolean>>;
footer:boolean;
modalTitle?: string | JSX.Element | JSX.Element[];
onClose: (e:React.MouseEvent<SVGElement>)=>void;
footerContent?: string | JSX.Element | JSX.Element[];
modalContent: string | JSX.Element | JSX.Element[];
}

export default ModalTypes;