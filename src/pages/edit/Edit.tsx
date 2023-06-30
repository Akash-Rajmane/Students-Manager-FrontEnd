import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import useTitle from "../../hooks/useTitle";
import classes from "./Edit.module.scss";
import Input from "../../components/input/Input";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/spinner/Spinner";

const Edit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  useTitle("Students Manager - Home");
  let navigate = useNavigate();
  const rN = useParams().rollNumber;
  // const { data, isLoading } = useFetch(
  //   `https://students-manager.onrender.com/getStudent/${rN}`
  // );

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [attendance, setAttendance] = useState("");
  const [marks, setMarks] = useState("");

  const [nameFlag, setNameFlag] = useState(false);
  const [rollNumFlag, setRollNumFlag] = useState(false);
  const [attendanceFlag, setAttendanceFlag] = useState(false);
  const [marksFlag, setMarksFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://students-manager.onrender.com/getStudent/${rN}`
        );

        const responseData = await response.json();
        const {
          name: studentName,
          rollNumber: studentRollNumber,
          attendance: studentAttendance,
          marks: studentMarks,
        } = responseData[0];

        setName(studentName);
        setRollNumber(studentRollNumber);
        setAttendance(studentAttendance);
        setMarks(studentMarks);
        setData(responseData);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [rN]);

  if (isLoading) {
    return (
      <div className={classes.spinnerContainer}>
        <Spinner />
      </div>
    );
  }

  const handleEdit = async (e: any) => {
    e.preventDefault();
    let regEx: RegExp = new RegExp("^[ a-zA-Z-’]+$");

    if (!name || !rollNumber || !attendance || !marks) {
      alert("Please enter the data in all the fields");
      return;
    } else if (regEx.test(name) === false) {
      setNameFlag(true);
      return;
    } else if (isNaN(Number(rollNumber)) || Number(rollNumber) < 0) {
      setRollNumFlag(true);
      return;
    } else if (
      isNaN(Number(attendance)) ||
      Number(attendance) < 0 ||
      Number(attendance) > 100
    ) {
      setAttendanceFlag(true);
      setRollNumFlag(false);
      return;
    } else if (
      isNaN(Number(marks)) ||
      Number(marks) < 0 ||
      Number(marks) > 100
    ) {
      setMarksFlag(true);
      setRollNumFlag(false);
      setAttendanceFlag(false);
      return;
    }

    const res = await fetch(
      `https://students-manager.onrender.com/updateStudent/${rN}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          rollNumber,
          attendance,
          marks,
        }),
      }
    );

    const resData = await res.json();
    //console.log(resData);

    if (res.status === 422 || !resData) {
      alert("Something went wrong!");
    } else {
      setMarksFlag(false);
      setRollNumFlag(false);
      setAttendanceFlag(false);
      setNameFlag(false);

      alert("Student edited successfully");
    }
    navigate("/list");
  };

  const cancelHandler = () => {
    navigate("/list");
  };

  return (
    <div className={classes.homeContainer}>
      {!isLoading && data.length === 1 && (
        <div className={classes.inputBox}>
          <div className={classes.homeText}>Update Student Data</div>
          <form className={classes.form}>
            <Input
              type={"text"}
              label={"Name"}
              value={name}
              onChange={(e: any) => {
                setName(e.target.value);
              }}
              name={"name"}
              errorFlag={nameFlag}
              size={"sm"}
            />

            <Input
              type={"text"}
              label={"Roll Number"}
              value={rollNumber}
              onChange={(e) => {
                setRollNumber(e.target.value);
              }}
              name={"rollNumber"}
              errorFlag={rollNumFlag}
              errorText={"Please enter the valid roll number"}
              size={"sm"}
            />

            <Input
              type={"text"}
              label={"Attendance"}
              value={attendance}
              onChange={(e) => {
                setAttendance(e.target.value);
              }}
              name={"attendance"}
              errorFlag={attendanceFlag}
              errorText={"Please enter the valid attendance data"}
              size={"sm"}
            />

            <Input
              type={"text"}
              label={"Marks"}
              value={marks}
              onChange={(e) => {
                setMarks(e.target.value);
              }}
              name={"marks"}
              errorFlag={marksFlag}
              errorText={"Please enter the valid marks data"}
              size={"sm"}
            />
            <div className={classes.btnBox}>
              <Button
                label={"Update"}
                type={"submit"}
                customClass={classes.submitBtn}
                size={"large"}
                onClick={(rollNumber) => handleEdit(rollNumber)}
              />
              <Button
                label={"Cancel"}
                type={"button"}
                color={"red"}
                customClass={classes.cancelBtn}
                size={"large"}
                onClick={cancelHandler}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Edit;
