import React, { useEffect, useRef, useState } from 'react';
import classes from './Leaderboard.module.scss';
import useTitle from '../../hooks/useTitle';
import useFetch from '../../hooks/useFetch';
//import DropDown from '../../components/dropdown/DropDown';
import Spinner from '../../components/spinner/Spinner';
//import Pagination from '../../components/pagination/Pagination';
//import PerPage from '../../components/perpage/PerPage';
import { DownloadTableExcel } from 'react-export-table-to-excel';
//import Button from '../../components/button/Button';

const Button = React.lazy(() => import('../../components/button/Button'));
const Pagination = React.lazy(() => import('../../components/pagination/Pagination'));
const PerPage = React.lazy(() => import('../../components/perpage/PerPage'));
const DropDown = React.lazy(() => import('../../components/dropdown/DropDown'));


const Leaderboard = () => {
  useTitle('Students Manager - Leaderboard');
  const tableRef = useRef(null);
  const { data, isLoading } = useFetch("https://students-manager.onrender.com/getStudentsData");
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [selectedPerPage, setSelectedPerPage] = useState<number>(5);
  const [dataSortedBySelectedOption, setDataSortedBySelectedOption] = useState<any[]>(data);
  const [dataSortedByRollNumber, setDataSortedByRollNumber] = useState<any[]>(data);
  const tableData = selectedOption ? dataSortedBySelectedOption : dataSortedByRollNumber;
  const [currentPage, setCurrentPage] = useState(1);
  const All:number = tableData.length;

  const sortDataByRollNum = (data:any[], rollNumber:any) => {
    const sortedData = [...data].sort((a: any, b: any) =>a[rollNumber] - b[rollNumber])
    setDataSortedByRollNumber(sortedData);
   } 
   

   useEffect(()=>{
     sortDataByRollNum(data,"rollNumber");
   },[data])




  const sortDataBySelectedOption = (data: any[], selectedOption: string) => {
    const sortedData = [...data].sort(
      (a: any, b: any) => {
        if(a.marks===b.marks && selectedOption.toLowerCase()==="marks"){
          return a.name.toLowerCase()>b.name.toLowerCase()? 1: -1;
        }
        else if(a.attendance===b.attendance && selectedOption.toLowerCase()==="attendance"){
          return a.name.toLowerCase()>b.name.toLowerCase()? 1: -1;
        }
        else{
          return b[selectedOption.toLowerCase()] - a[selectedOption.toLowerCase()];
        }
      }
    );
    setDataSortedBySelectedOption(sortedData);
  };

  useEffect(() => {
    sortDataBySelectedOption(data, selectedOption);
  }, [selectedOption, data]);

  const lastPostIndex = currentPage*selectedPerPage;
  const firstPostIndex = lastPostIndex - selectedPerPage;
  const currentData = tableData.slice(firstPostIndex, lastPostIndex);


  return (
  
    
    <div className={classes.leaderBoardContainer}>
      {
      (!isLoading && data.length<1) ? (<h2 style={{textAlign:'center', padding:"45px"}} className={classes.leaderBoardContainer}>No students found! Please add students first.</h2>) :
    (<div>
      <DropDown
        label="Sort by"
        optionsArr={['Marks', 'Attendance']}
        customClass={classes.dropDownClass}
        selected={selectedOption}
        setSelected={setSelectedOption}
      />

      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <div className={classes.tableContainer}>
          <table className={classes.table}   ref={tableRef}>
            <thead>
              <tr className={classes.tr}>
                {selectedOption && <th className={classes.thRank}>Rank</th>}
                <th className={classes.thName}>Name</th>
                <th className={classes.th}>Roll Number</th>
                <th className={classes.th}>Attendance</th>
                <th className={classes.thMarks}>Marks</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((el: any, idx: any) => {
                return (
                  <tr key={idx} className={classes.tr}>
                    {selectedOption && (
                      <td className={classes.td}>{firstPostIndex+idx+1}</td>
                    )}
                    <td className={classes.td}>{el.name}</td>
                    <td className={classes.td}>{el.rollNumber}</td>
                    <td className={classes.td}>{el.attendance}</td>
                    <td className={classes.td}>{el.marks}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

     <div className={classes.downloadBtn}>
        <DownloadTableExcel
          filename="Students_Leaderboard"
          sheet="students"
          currentTableRef={tableRef.current}
        >
          <Button label="Download" color={'blue'} size={'xlarge'} type={'button'}/>
        </DownloadTableExcel>
      </div>

      <div className={classes.paginationBox}>
            <Pagination
              totalPosts={tableData.length}
              postsPerPage={selectedPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
            <PerPage
              label={"Per Page"}
              optionsArr={[5, 10, All]}
              selected={selectedPerPage}
              setSelected={setSelectedPerPage}
            />              
      </div>

      </div>)
     }
    </div>
 
    );
};

export default Leaderboard;
