import { CSSProperties } from "react";

type CardTypes = {
    name: string;
    attendance: string | number;
    rollNumber: string | number;
    marks: string | number;
    onEdit: ()=>void;//(e: React.MouseEvent<HTMLButtonElement>) => void;
    onDelete: ()=>void; // (e: React.MouseEvent<HTMLButtonElement>) => void;
    styleOverride?: {
        cardClass?: CSSProperties;
        bookMarkIcon?: CSSProperties;
        cardBody?: CSSProperties;
        name?: CSSProperties;
        cardData?: CSSProperties;
        cardFooter?: CSSProperties;
    }
};
  
export default CardTypes;