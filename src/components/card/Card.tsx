import { RiBookmark3Fill } from "react-icons/ri";
import "./Card.scss";
import Button from '../../components/button/Button';

type CardTypes = {
    name: string;
    attendance: string | number;
    rollNumber: string | number;
    marks: string | number;
    onEdit: ()=>void;//(e: React.MouseEvent<HTMLButtonElement>) => void;
    onDelete: ()=>void; // (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Card:React.FC<CardTypes> = ({name,rollNumber,attendance,marks,onEdit,onDelete}) => {
  return (
    <div className={"cardClass"} >
        <div className={"bookMarkIcon"} >
            <RiBookmark3Fill />
        </div>
        <div className={"cardBody"} > 
            <h2 className={"name"} >{name}</h2>
            <div className={"cardData"} >
                <span>Roll Number :</span>
                <span>{rollNumber}</span>
                
                <span>Attendance :</span>
                <span>{attendance}</span>
                
                <span>Marks :</span>
                <span>{marks}</span>
            </div>
        </div>
        <div className={"cardFooter"}>
            <Button
                type={'button'}
                label={"Edit"}
                color={'blue'}
                size={'small'}
                onClick={onEdit}
                aria-label={"edit button"}
            />
            <Button
                type={'button'}
                label={"Delete"}
                color={'red'}
                size={'small'}
                onClick={onDelete}
                aria-label={"delete button"}
            />     
        </div>
        <div className={"shapeBottom"}></div>
    </div>
  )
}

export default Card;