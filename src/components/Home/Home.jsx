import React, { useState, useEffect } from 'react';
import Map from '../../HOC/MapHOC';
import LineGraph from '../LineGraph/LineGraph';
// import { useWorldMobilityData } from '../../hooks/mobilityHooks';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalMobilityDataByDate } from '../../actions/globalActions';
import { getGlobalMapMobilityByDate } from '../../selectors/globalSelectors';
import style from './Home.css';
import { getCovidChartData, getSelectedCountryCode } from '../../selectors/selectors';
import { setCovidChartData } from '../../actions/actions';

const Home = () => {
  const [dateNum, setDateNum] = useState(1);
  // const worldMobilityData = useWorldMobilityData(`2020-04-0${dateNum}T00:00:00.000+00:00`);

  const dispatch = useDispatch();
  const globalMapMobilityData = useSelector(getGlobalMapMobilityByDate);
  const countryCode = useSelector(getSelectedCountryCode);
  const chartDataSet = useSelector(getCovidChartData);
  const yAxisConstraints = [0, 1600000];

  useEffect(() => {
    dispatch(setGlobalMobilityDataByDate(`2020-04-0${dateNum}T00:00:00.000+00:00`));
  }, [dateNum]);

  useEffect(() => {
    dispatch(setCovidChartData(countryCode));
  }, [countryCode]);

  return (
    <section className={style.Home}>
      <Map mapData={globalMapMobilityData} />
      <span>date: </span><input type="range" min="1" max="9" value={dateNum} onChange={({ target }) => setDateNum(target.value)}/>
      <LineGraph dataSet={chartDataSet} yAxisConstraints={yAxisConstraints} />
    </section>
  );
};

export default Home;
