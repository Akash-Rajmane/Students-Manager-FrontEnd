import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { RiBookmark3Fill } from "react-icons/ri";
import CardTypes from './CardTypes';
import classes from "./Card.module.scss";
import Button from '../../components/button/Button';



const Card:React.FC<CardTypes> = ({name,rollNumber,attendance,marks,onEdit,onDelete,styleOverride }) => {
  return (
    <div className={classes.cardClass} style={styleOverride && styleOverride.cardClass}>
        <div className={classes.bookMarkIcon} style={styleOverride && styleOverride.bookMarkIcon}>
            <RiBookmark3Fill />
        </div>
        <div className={classes.cardBody} style={styleOverride && styleOverride.cardBody}> 
            <h2 className={classes.name} style={styleOverride && styleOverride.name}>{name}</h2>
            <div className={classes.cardData} style={styleOverride && styleOverride.cardData}>
                <span>Roll Number :</span>
                <span>{rollNumber}</span>
                
                <span>Attendance :</span>
                <span>{attendance}</span>
                
                <span>Marks :</span>
                <span>{marks}</span>
            </div>
        </div>
        <div className={classes.cardFooter} style={styleOverride && styleOverride.cardFooter}>
            <Button
                type={'button'}
                label={<AiFillEdit />}
                color={'blue'}
                size={'small'}
                onClick={onEdit}
                aria-label={"edit button"}
            />
            <Button
                type={'button'}
                label={<AiFillDelete />}
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