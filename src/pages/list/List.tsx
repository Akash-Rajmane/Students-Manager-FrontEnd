import React, { useEffect, useState } from 'react';
import classes from './List.module.scss';
import useTitle from '../../hooks/useTitle';
import Spinner from '../../components/spinner/Spinner';
import useFetch from '../../hooks/useFetch';
import Card from '../../components/card/Card';
import Input from '../../components/input/Input';
import Modal from '../../components/modal/Modal';
import Button from '../../components/button/Button';
import { useNavigate } from 'react-router-dom';

import { IoPersonRemove } from 'react-icons/io5';

// const Card = React.lazy(() => import('../../components/card/Card'));
// const Button = React.lazy(() => import('../../components/button/Button'));
// const Modal = React.lazy(() => import('../../components/modal/Modal'));
// const Input = React.lazy(() => import('../../components/input/Input'));

const Btn = React.memo(Button);

const List = () => {
  useTitle('Students Manager - List');
  let navigate = useNavigate();

  const [show,setShow] = useState(false);
  const [open,setOpen] = useState(false);
  const [rollNum,setRollNum] = useState<number>(0);

  const [dataChange,setDataChange] = useState(false);

  const { data, isLoading} = useFetch('https://students-manager.onrender.com/getStudentsData', dataChange);
  const [sortedData,setSortedData] = useState<any[]>(data);
  const [searchText, setSearchText] = useState("");

  const modalContent = (
    <>
    <p style={{textAlign:"center"}}>Are you sure you want to delete?</p>
    <div style={{display:"flex", margin:"10px", justifyContent:"space-evenly"}}>
      <Button aria-label={"delete"} label={"Delete"} color={"red"} size={"medium"} onClick={()=>{deleteStudent(rollNum)}}/>
      <Button aria-label={"cancel"} label={"Cancel"} color={"blue"} size={"medium"} onClick={()=>setShow(false)}/>
    </div>
    </>
  )

  const modalContentDeleteAll = (
    <>
    <p style={{textAlign:"center"}}>Are you sure you want to delete all the students?</p>
    <div style={{display:"flex", margin:"10px", justifyContent:"space-evenly"}}>
      <Button aria-label={"delete all"}  label={"Delete All"} color={"red"} size={"medium"} onClick={()=>{deleteAllStudents()}}/>
      <Button aria-label={"cancel"} label={"Cancel"} color={"blue"} size={"medium"} onClick={()=>setOpen(false)}/>
    </div>
    </>
  )

  const deleteAllStudents = async () => {
    const res = await fetch(`https://students-manager.onrender.com/deleteAllStudents/`, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
    });

    const deletedData = await res.json();

    if(res.status === 422 || !deletedData) {
      alert("Something went wrong!");
    }else {
      
      setShow(false);
      setTimeout(()=>alert("All students deleted succcessfully!"),500)
     
    }

    setDataChange(!dataChange);

  }
 
  
  const deleteStudent = async (rollNumber:any) => {

    const res = await fetch(`https://students-manager.onrender.com/deleteStudent/${rollNumber}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const deletedData = await res.json();
    
    if (res.status === 422 || !deletedData) {
      alert("Something went wrong!");
    } else {
      
        setShow(false);
        setTimeout(()=>{
            alert("Student deleted successfully!")
        },500);
       
    }
    setDataChange(!dataChange);
    
 
  }

  const sortData = (data:any[], rollNumber:any) => {
   const sorted = [...data].sort((a: any, b: any) =>a[rollNumber] - b[rollNumber])
   setSortedData(sorted);
  } 

  useEffect(()=>{
    sortData(data,"rollNumber");
    setSearchText("")
  },[data])
 

  const showDeletionModal = (rollNum:number) =>{
    setRollNum(rollNum);
    setShow(true);
  }

  return (
    <div className={classes.listContainer}>
      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
      (!isLoading && data.length<1) ? (<h2 style={{textAlign:'center', padding:"45px"}} className={classes.listContainer}>No students found! Please add students first.</h2>) :
        <div className={classes.elementsContainer}>
          <div className={classes.inputBtnBox}>
          <Input     
            type={'text'}
            label={'🔍Search by Name or Roll Number'}
            onChange={(e)=>{setSearchText(e.target.value)}}
            size={"x-lg"}
          />
          <Btn 
            label={<div className={classes.btnLabel}><span>Delete All </span> <span className={classes.delIcon}><IoPersonRemove/></span></div>} 
            color={"red"} 
            size={'large'}
            onClick={()=>setOpen(true)}
          />
          </div>
  
            {sortedData.filter((val:any) => {
                                        if (searchText === "") {
                                          return val;
                                        } else if ( val.name.toLowerCase().includes(searchText.toLowerCase()) || val.rollNumber === searchText) {
                                          return val;
                                        }
                                      }).map((el: any, index:any) => {  const {name,rollNumber,attendance,marks} = el;
                                                                          return (
                                                                            <div key={index} >
                                                                              <Card 
                                                                              //   styleOverride={
                                                                              //     {
                                                                              //       cardClass:{
                                                                              //       "color":"red"
                                                                              //       }
                                                                              //     }
                                                                              // }
                                                                                name={name}
                                                                                rollNumber={rollNumber}
                                                                                attendance={attendance}
                                                                                marks={marks} 
                                                                                onDelete={() => {   showDeletionModal(rollNumber) }}
                                                                                onEdit={()=>{navigate(`/edit/${rollNumber}`)}}/>
                                                                            </div>
                                                                            
                                                                          );
                                                                     }
                                            )
            }
          
        </div>
      )}
       {show && <Modal show={show}footer={false} setShow={setShow} onClose={()=>{setShow(false)}} modalContent={modalContent}></Modal>}
       {open && <Modal show={open}footer={false} setShow={setOpen} onClose={()=>{setOpen(false)}} modalContent={modalContentDeleteAll}></Modal>}
    </div>
  );
};

export default List;
