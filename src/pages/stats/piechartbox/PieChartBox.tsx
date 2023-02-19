import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import PieChart from '../../../components/piechart/PieChart';
//import useFetch from '../../../hooks/useFetch';
import classes from './PieChartBox.module.scss';
//import Spinner from '../../../components/spinner/Spinner';

type PieTypes = {
  data: number[]
  isLoading: boolean
}



const PieChartBox: React.FC<PieTypes> = ({data,isLoading}) => {
  // const { data, isLoading } = useFetch('http://localhost:8000/getStudentsData');

  console.log("pie-chart box called");

  return (
    <div className={classes.pieBoxContainer}>
      <PassingPie
       data={data} isLoading={isLoading}/>
      <AttendancePie data={data} isLoading={isLoading}/>
    </div>
  );
};

export default PieChartBox;




const PassingPie: React.FC<PieTypes>  = ({data,isLoading}) => {
  const [piePassingData, setPiePassingData] = useState<number[]>();
  const [passingCriteria, setPassingCriteria] = useState("40");
  const [flagPassing, setFlagPassing] = useState<boolean>(false);
  

  useEffect(()=>{
    piePassingDataGenerator(data, 40);
  },[data])

  const piePassingDataGenerator = (
    data: any,
    passingCriteria:any
  ) => {
    if (
      !passingCriteria ||
      Number(passingCriteria) < 0 ||
      Number(passingCriteria) > 100
    ) {
      setFlagPassing(true);
      return;
    } else {
      let countPass: number = 0;
      let countFail: number = 0;
      const marksArray = data.map((el: any) => el.marks);
      for (let i = 0; i < marksArray.length; i++) {
        if (marksArray[i] >= Number(passingCriteria)) {
          countPass++;
        } else {
          countFail++;
        }
      }
      const pieData = [countPass, countFail];
      setPiePassingData(pieData);
      setFlagPassing(false);
    }
  };

  const passingCriteriaHandler = (e: any) => {
    setPassingCriteria(e.target.value);
  };

  const onSubmitHandler1 = (e: any) => {
    e.preventDefault();
    piePassingDataGenerator(data, passingCriteria);  
  };

  console.log("passing pie called")

  return (
    <div className={classes.pieBox}>
        <PieChart
          width={250}
          height={250}
          labelArr={['Passed Students', 'Failed Students']}
          pieData={piePassingData}
          chartTitle={'Passed Students & Failed Students'}
          customClass={classes.pieChart}
        />
        <form className={classes.formBox} onSubmit={onSubmitHandler1}>
          <label>Passing Criteria</label>
          <Input
            type={'number'}
            value={passingCriteria}
            onChange={passingCriteriaHandler}
            errorFlag={flagPassing}
            errorText={'Please enter the valid passing criteria'}
            aria-label="passing criteria"
            size={"sm"}
          />
          <Button
            label={'apply'}
            type={'submit'}
            customClass={classes.submitBtn}
            size={'medium'}
            onClick={() => piePassingDataGenerator(data, passingCriteria)}
          />
        </form>  
  </div>
  )

}






const AttendancePie:React.FC<PieTypes> = ({data,isLoading}) => {
  const [pieAttendanceData, setPieAttendanceData] = useState<number[]>();
  const [attendanceCriteria, setAttendanceCriteria] = useState("75");
  const [flagAttendance, setFlagAttendance] = useState<boolean>(false);
 

  useEffect(()=>{
    pieAttendanceDataGenerator(data, 75)
  },[data])

 

  const pieAttendanceDataGenerator = (
    data: any,
    attendanceCriteria: any
  ) => {
    if (
      !attendanceCriteria ||
      Number(attendanceCriteria) < 0 ||
      Number(attendanceCriteria) > 100
    ) {
      setFlagAttendance(true);
      return;
    } else {
      let countNonDefaulter: number = 0;
      let countDefaulter: number = 0;
      const attendanceArray = data.map((el: any) => el.attendance);
      for (let i = 0; i < attendanceArray.length; i++) {
        if (attendanceArray[i] >= Number(attendanceCriteria)) {
          countNonDefaulter++;
        } else {
          countDefaulter++;
        }
      }
      const pieAttendanceData = [countNonDefaulter, countDefaulter];
      setPieAttendanceData(pieAttendanceData);
      setFlagAttendance(false);
    }
  };

  const attendanceCriteriaHandler = (e: any) => {
    setAttendanceCriteria(e.target.value);
  };

  const onSubmitHandler2 = (e: any) => {
    e.preventDefault();
    pieAttendanceDataGenerator(data, attendanceCriteria);
  };

  console.log("attendance pie called")
  
  return (
      <div className={classes.pieBox}>
            <PieChart
              width={250}
              height={250}
              labelArr={['Non-defaulters', 'Defaulters']}
              pieData={pieAttendanceData}
              chartTitle={'Attendance Non-defaulters & Defaulters'}
              customClass={classes.pieChart}
            />
            <form className={classes.formBox} onSubmit={onSubmitHandler2}>
              <label>Attendance Criteria</label>
              <Input
                type={'number'}
                value={attendanceCriteria}
                onChange={attendanceCriteriaHandler}
                errorFlag={flagAttendance}
                errorText={'Please enter the valid attendance criteria'}
                aria-label="attendance criteria"
                size={"sm"}
              />
              <Button
                label={'apply'}
                type={'submit'}
                customClass={classes.submitBtn}
                size={'medium'}
                onClick={() => pieAttendanceDataGenerator(data, attendanceCriteria)}
              />
            </form>  
      </div>
  )
}