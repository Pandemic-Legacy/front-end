import { useState, useEffect } from 'react';
import { fetchCovidData } from '../services/covid';

export const useCovidData = () => {

  const [covidData, setCovidData] = useState(null);

  useEffect(() => {    
    const covidDataTemp = {};
    fetchCovidData()
      .then(res => {
        covidDataTemp.date = res.map(item => item.date);
        covidDataTemp.positive = res.map(item => item.positive ?? 0);
        covidDataTemp.recovered = res.map(item => item.recovered ?? 0);
        covidDataTemp.death = res.map(item => item.death ?? 0);
        setCovidData(covidDataTemp);
      });
  }, []);

  return covidData;
};
