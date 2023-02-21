import React,{useState,useEffect} from 'react';
import classes from "./Pagination.module.scss";
import PaginationTypes from './PaginationTypes';
import {MdOutlineArrowLeft,MdOutlineArrowRight} from "react-icons/md";

const Pagination:React.FC<PaginationTypes> = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage
}) => {

  let pages:any[] = [];
  const [prevDisable, setPrevDisable] = useState(false);
  const [nextDisable, setNextDisable] = useState(false);
  
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
  }

  useEffect(()=>{
    if(currentPage === 1){
        setPrevDisable(true);
    }else{
        setPrevDisable(false);
    }
    
    if(currentPage === Math.ceil(totalPosts/postsPerPage)){
        setNextDisable(true);
    }else{
        setNextDisable(false);
    }

    if(totalPosts===postsPerPage){
        setCurrentPage(1);
    }

  },[currentPage,totalPosts,postsPerPage,setCurrentPage])
  
 

  return (
    <div className={classes.pagination}>
        <button  aria-label="previous page" className={classes.btn} disabled={prevDisable} onClick={() => setCurrentPage(currentPage-1)}><MdOutlineArrowLeft className={classes.left} /></button>
         {pages.map((page:any, index:number) => {
             const btnClass = `${page===currentPage && classes.active} ${
                classes.btn
              }`;
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className= {btnClass} >
                        {page}
                    </button>
                );
            })}
        <button  aria-label="next page" className={classes.btn} disabled={nextDisable}  onClick={() => setCurrentPage(currentPage+1)}><MdOutlineArrowRight className={classes.right}  /></button>
    </div>
  )
}

export default Pagination;