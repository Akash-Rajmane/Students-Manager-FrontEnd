import React, { useState } from 'react';
//import Button from '../../components/button/Button';
import useTitle from '../../hooks/useTitle';
import classes from './Home.module.css';
//import Input from '../../components/input/Input';

const Button = React.lazy(() => import('../../components/button/Button'));
const Input = React.lazy(() => import('../../components/input/Input'));


const Home = () => {
  useTitle('Students Manager - Home');
 
  const[name,setName] = useState(""); 
  const[rollNumber,setRollNumber] = useState("");
  const[attendance,setAttendance] = useState("");
  const[marks,setMarks] = useState("");
 
  const [nameFlag, setNameFlag] = useState(false);
  const [rollNumFlag, setRollNumFlag] = useState(false);
  const [attendanceFlag, setAttendanceFlag] = useState(false);
  const [marksFlag, setMarksFlag] = useState(false);
  

  const handleClick = async(e:any) => {
   
      e.preventDefault();
      let regEx:RegExp = new RegExp("[a-zA-Z]+\\.?");

      if(!name.trim() || !rollNumber.trim() || !attendance.trim() || !marks.trim()){
        alert("Please enter the data in all the fields");
        return;
      }else if(regEx.test(name)===false || name.length<3){
        setNameFlag(true);
        return;
      }else if(isNaN(Number(rollNumber)) || Number(rollNumber)<0 ){
        setRollNumFlag(true);
        return;
      }else if(isNaN(Number(attendance)) || Number(attendance)<0 || Number(attendance)>100){
        setAttendanceFlag(true);
        setRollNumFlag(false);
        return;
      }else if(isNaN(Number(marks)) || Number(marks)<0 || Number(marks)>100){
        setMarksFlag(true);
        setRollNumFlag(false);
        setAttendanceFlag(false);
        return;
      }

      const res = await fetch("https://students-manager.onrender.com/add", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name, rollNumber, attendance, marks
          })
      });

      const resData = await res.json();
      //console.log(resData);

      if (res.status === 422 || !resData) {
          alert("Something went wrong!");
      } else {
          setMarksFlag(false);
          setRollNumFlag(false);
          setAttendanceFlag(false);
          setNameFlag(false); 

          alert("Student added successfully"); 
          
          setName("");
          setRollNumber("");
          setAttendance("");
          setMarks("");       
      }
    
  };
  

  return (
   
    <div className={classes.homeContainer}>
      <div className={classes.inputBox}>
        <div className={classes.homeText}>Add New Student</div>
        <form className={classes.form} >
          <Input
            type={'text'}
            label={'Name'}
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            name={'name'}
            errorFlag={nameFlag}
            errorText={"Please enter the valid name"}
          />

          <Input
            type={'text'}
            label={'Roll Number'}
            value={rollNumber}
            onChange={(e)=>{setRollNumber(e.target.value)}}
            name={'rollNumber'}
            errorFlag={rollNumFlag}
            errorText={"Please enter the valid roll number"}
          />

          <Input
            type={'text'}
            label={'Attendance'}
            value={attendance}
            onChange={(e)=>{setAttendance(e.target.value)}}
            name={'attendance'}
            errorFlag={attendanceFlag}
            errorText={"Please enter the valid attendance data"}
          />

          <Input
            type={'text'}
            label={'Marks'}
            value={marks}
            onChange={(e)=>{setMarks(e.target.value)}}
            name={'marks'}
            errorFlag={marksFlag}
            errorText={"Please enter the valid marks data"}
          />

          <Button
            label={'Add Student'}
            type={'submit'}
            customClass={classes.submitBtn}
            size={'large'}
            onClick={handleClick}
          />
        </form>
      </div>
     
    </div>
 
  );
};

export default Home;
