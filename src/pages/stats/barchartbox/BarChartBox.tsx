import React from 'react';
import BarChart from '../../../components/barchart/BarChart';
//import useFetch from '../../../hooks/useFetch';
import useBarDataGenerator from '../../../hooks/useBarDataConvertor';
import classes from './BarChartBox.module.scss';
//import Spinner from '../../../components/spinner/Spinner';

type PropTypes = {
  data: number[]
  isLoading: boolean
}

const BarChartBox:React.FC<PropTypes> = ({data}) => {
  //const { data, isLoading } = useFetch('http://localhost:8000/getStudentsData');
  const {barData, yTickNumber} = useBarDataGenerator(data);
  
  return (
    <div className={classes.barChartBox}>
      <BarChart
        data={barData}
        width={600}
        height={460}
        chartTitle={'Grades vs Number of Students'}
        yTickNumber={yTickNumber}
      />   
    </div>
  );
};

export default BarChartBox;
