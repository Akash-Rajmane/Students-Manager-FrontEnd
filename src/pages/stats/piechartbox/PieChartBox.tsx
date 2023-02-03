import React, { useEffect, useState } from 'react';
import Button from '../../../components/button/Button';
import Input from '../../../components/input/Input';
import PieChart from '../../../components/piechart/PieChart';
import useFetch from '../../../hooks/useFetch';
import classes from './PieChartBox.module.css';
import Spinner from '../../../components/spinner/Spinner';

const PieChartBox: React.FC = () => {
  const { data, isLoading } = useFetch('https://students-manager.onrender.com/getStudentsData');
  const [piePassingData, setPiePassingData] = useState<number[]>();
  const [pieAttendanceData, setPieAttendanceData] = useState<number[]>();
  const [passingCriteria, setPassingCriteria] = useState("40");
  const [attendanceCriteria, setAttendanceCriteria] = useState("75");
  const [flagAttendance, setFlagAttendance] = useState<boolean>(false);
  const [flagPassing, setFlagPassing] = useState<boolean>(false);


  useEffect(()=>{
    piePassingDataGenerator(data, 40);
    pieAttendanceDataGenerator(data, 75)
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

  const passingCriteriaHandler = (e: any) => {
    setPassingCriteria(e.target.value);
  };

  const attendanceCriteriaHandler = (e: any) => {
    setAttendanceCriteria(e.target.value);
  };

  const onSubmitHandler1 = (e: any) => {
    e.preventDefault();
    piePassingDataGenerator(data, passingCriteria);
    
  };

  const onSubmitHandler2 = (e: any) => {
    e.preventDefault();
    pieAttendanceDataGenerator(data, attendanceCriteria);
  };

  return (
    <div className={classes.pieBoxContainer}>
      <div className={classes.pieBox1}>
        {isLoading ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            <PieChart
              width={260}
              height={260}
              labelArr={['Passed Students', 'Failed Students']}
              pieData={piePassingData}
              chartTitle={'Passed Students & Failed Students'}
              customClass={classes.pieChart}
            />
            <form className={classes.formBox} onSubmit={onSubmitHandler1}>
              <div  className={classes.label1}>Passing Criteria</div>
              <Input
                type={'number'}
                customClass={classes.inputContainer}
                value={passingCriteria}
                onChange={passingCriteriaHandler}
                errorFlag={flagPassing}
                errorText={'Please enter the valid passing criteria'}
                aria-label="passing criteria"
              />
              <Button
                label={'apply'}
                type={'submit'}
                customClass={classes.submitBtn}
                size={'medium'}
                onClick={() => piePassingDataGenerator(data, passingCriteria)}
              />
            </form>
          </>
        )}
        
      </div>
      <div className={classes.pieBox2}>
        {isLoading ? (
          <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            <PieChart
              width={260}
              height={260}
              labelArr={['Non-defaulters', 'Defaulters']}
              pieData={pieAttendanceData}
              chartTitle={'Attendance Non-defaulters & Defaulters'}
              customClass={classes.pieChart}
            />
            <form className={classes.formBox} onSubmit={onSubmitHandler2}>
              <div  className={classes.label2}>Attendance Criteria</div>
              <Input
                type={'number'}
                customClass={classes.inputContainer}
                value={attendanceCriteria}
                onChange={attendanceCriteriaHandler}
                errorFlag={flagAttendance}
                errorText={'Please enter the valid attendance criteria'}
                aria-label="attendance criteria"
              />
              <Button
                label={'apply'}
                type={'submit'}
                customClass={classes.submitBtn}
                size={'medium'}
                onClick={() => pieAttendanceDataGenerator(data, attendanceCriteria)}
              />
            </form>
          </>       
        )}      
      </div>
    </div>
  );
};

export default PieChartBox;
