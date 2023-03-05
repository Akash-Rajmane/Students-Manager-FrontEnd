import React,{useState,useEffect} from 'react';
import "./Pagination.scss";
import {MdOutlineArrowLeft,MdOutlineArrowRight} from "react-icons/md";

type PaginationTypes = {
    totalPosts:number;
    postsPerPage:number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage:number;
}

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
    <div className={"pagination"}>
        <button  aria-label="previous page" className={"btn"} disabled={prevDisable} onClick={() => setCurrentPage(currentPage-1)}><MdOutlineArrowLeft className={"left"} /></button>
         {pages.map((page:any, index:number) => {
             const btnClass = `${page===currentPage && "active"} ${
                "btn"
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
        <button  aria-label="next page" className={"btn"} disabled={nextDisable}  onClick={() => setCurrentPage(currentPage+1)}><MdOutlineArrowRight className={"right"}/></button>
    </div>
  )
}

export default Pagination;