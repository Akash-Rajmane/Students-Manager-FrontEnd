import React, { useEffect, useState } from 'react';
import Button from '../../components/button/Button';
import useTitle from '../../hooks/useTitle';
import classes from './Edit.module.scss';
import Input from '../../components/input/Input';
import { useNavigate,useParams} from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/spinner/Spinner';

const Edit = () => {
  useTitle('Students Manager - Home');
  const params = useParams();
  const rN = params.rollNumber;
  console.log(rN);
  const {data,isLoading} = useFetch(`https://students-manager.onrender.com/getStudent/${rN}`); 
  //console.log(data[0]["name"]);
  let navigate = useNavigate();
 // const { studentName, studentRollNum, studentAttendace, studentMarks} = data;

  //console.log(studentName, studentRollNum, studentAttendace, studentMarks)

  const[name,setName] = useState(""); 
  const[rollNumber,setRollNumber] = useState("");
  const[attendance,setAttendance] = useState("");
  const[marks,setMarks] = useState("");
 
  const [nameFlag, setNameFlag] = useState(false);
  const [rollNumFlag, setRollNumFlag] = useState(false);
  const [attendanceFlag, setAttendanceFlag] = useState(false);
  const [marksFlag, setMarksFlag] = useState(false);

 
  //const [dataChange,setDataChange] = useState(false);

  

 // console.log([...data][0][name]);

  // useEffect(()=>{
  //   setDataChange(!dataChange)
  // },[rN])

  // const [studentData, setStudentData] = useState<{
  //   name: string;
  //   rollNumber: string;
  //   attendance: string;
  //   marks: string;  
  // }>({
  //   name : [...data][0]["name"],
  //   rollNumber : [...data][0]["rollNumber"],
  //   attendance : [...data][0]["attendance"],
  //   marks : [...data][0]["marks"], 
  // })
  
  // console.log(studentData);

//   const setData = (e:any) => {
    
//     console.log(e.target.value);
//     const { name, value } = e.target;
//     setStudentData((preval) => {
//         return {
//             ...preval,
//             [name]: value
//         }
//     })
// }


  const getStudentData = async (rollNumber:any) => {

    const res = await fetch(`https://students-manager.onrender.com/getStudent/${rollNumber}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
        console.log("error ");

    } else {
        //setStudentData(data);
        //setIsLoading(false);
        //console.log(studentData);

    }
}



// useEffect(() => {
//   getStudentData(rN);
// },[rN]);

  const handleEdit = async(e:any) => {
  

      e.preventDefault();
      let regEx:RegExp = new RegExp("^[ a-zA-Z\-\’]+$");

      if(!name || !rollNumber || !attendance || !marks){
        alert("Please enter the data in all the fields");
        return;
      }else if(regEx.test(name)===false){
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

      const res = await fetch("https://students-manager.onrender.com/updateStudent/:rollNumber", {
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
          
          // setName("");
          // setRollNumber("");
          // setAttendance("");
          // setMarks("");    
        
      }
      navigate("/list");
  };
  
  
  const cancelHandler = () => {
    navigate('/list');
  };

  return (
   
    <div className={classes.homeContainer}>
      {isLoading? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) :
      (<div className={classes.inputBox}>
        <div className={classes.homeText}>Update Student Data</div>
        <form className={classes.form} >
          <Input
            type={'text'}
            label={'Name'}
            value={name}
            onChange={(e)=>{setName(e.target.value)}} 
            //onChange={setData}
            size={"sm"}
          />

          <Input
            type={'text'}
            label={'Roll Number'}
            value={rollNumber}
            onChange={(e)=>{setRollNumber(e.target.value)}}  
            //onChange={setData}
            size={"sm"}
          />

          <Input
            type={'text'}
            label={'Attendance'}
            value={attendance}
            onChange={(e)=>{setAttendance(e.target.value)}}
           // onChange={setData}
           size={"sm"}
          />

          <Input
            type={'text'}
            label={'Marks'}
            value={marks}
            onChange={(e)=>{setMarks(e.target.value)}}
            //onChange={setData}
            size={"sm"}
          />
        <div className={classes.btnBox}>
            <Button
                label={'Update'}
                type={'submit'}
                size={'large'}
                onClick={(rollNumber)=>handleEdit(rollNumber)}
            />
            <Button
            label={"Cancel"}
            type={"button"}
            color={"red"}
            size={"large"}
            onClick={cancelHandler}
            />
        </div>
          
        </form>
      </div>)
      }
      
    </div>
 
  );
};

export default Edit;
