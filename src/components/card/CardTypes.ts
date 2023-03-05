

type CardTypes = {
    name: string;
    attendance: string | number;
    rollNumber: string | number;
    marks: string | number;
    onEdit: ()=>void;//(e: React.MouseEvent<HTMLButtonElement>) => void;
    onDelete: ()=>void; // (e: React.MouseEvent<HTMLButtonElement>) => void;
};
  
export default CardTypes;