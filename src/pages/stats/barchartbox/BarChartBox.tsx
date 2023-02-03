import React from 'react';
import BarChart from '../../../components/barchart/BarChart';
import useFetch from '../../../hooks/useFetch';
import useBarDataGenerator from '../../../hooks/useBarDataConvertor';
import classes from './BarChartBox.module.css';
import Spinner from '../../../components/spinner/Spinner';

const BarChartBox = () => {
  const { data, isLoading } = useFetch('https://students-manager.onrender.com/getStudentsData');
  const [barData] = useBarDataGenerator(data);


  return (
    <div className={classes.barChartBox}>
      {isLoading ? (
        <div className={classes.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <BarChart
          data={barData}
          width={600}
          height={460}
          xAxisLabel={'Grades'}
          yAxisLabel={'Number of Students'}
          chartTitle={'Grades vs Number of Students'}
          customClass={classes.barBox}
        />
      )}
    </div>
  );
};

export default BarChartBox;
