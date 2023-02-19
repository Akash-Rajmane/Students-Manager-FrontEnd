import React from 'react';
import classes from './Stats.module.scss';
import useTitle from '../../hooks/useTitle';
import PieChartBox from './piechartbox/PieChartBox';
//import BarChartBox from './barchartbox/BarChartBox';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/spinner/Spinner';

const BarChartBox = React.lazy(() => import('./barchartbox/BarChartBox'));

const Stats = () => {
  useTitle('Students Manager - Statistics');
  const { data, isLoading } = useFetch("https://students-manager.onrender.com/getStudentsData");
  
  return (
    <div className={classes.statsContainer}>
      { !isLoading && data.length<1 ? (<h2 style={{textAlign:'center', padding:"45px"}} className={classes.statsContainer}>No students found! Please add students first.</h2>) :
        <>
         { isLoading ? (<div className={classes.spinnerContainer}><Spinner /></div>) :
          (  <>
                <PieChartBox  data={data} isLoading={isLoading}/>
                <BarChartBox  data={data} isLoading={isLoading}/>
              </>
            )
        }
        </>
      }
    </div>
  );
};

export default Stats;
