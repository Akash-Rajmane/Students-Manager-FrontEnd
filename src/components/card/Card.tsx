import { RiBookmark3Fill } from "react-icons/ri";
import CardTypes from './CardTypes';
import classes from "./Card.module.scss";
import Button from '../../components/button/Button';


const Card:React.FC<CardTypes> = ({name,rollNumber,attendance,marks,onEdit,onDelete}) => {
  return (
    <div className={classes.cardClass} >
        <div className={classes.bookMarkIcon} >
            <RiBookmark3Fill />
        </div>
        <div className={classes.cardBody} > 
            <h2 className={classes.name} >{name}</h2>
            <div className={classes.cardData} >
                <span>Roll Number :</span>
                <span>{rollNumber}</span>
                
                <span>Attendance :</span>
                <span>{attendance}</span>
                
                <span>Marks :</span>
                <span>{marks}</span>
            </div>
        </div>
        <div className={classes.cardFooter}>
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
        <div className={classes.shapeBottom}></div>
    </div>
  )
}

export default Card;