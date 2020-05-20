import React, { Component, useRef, useEffect, useState } from 'react';
import request from 'superagent';
import styles from './LineGraph.css';
import JSONdata from '../../data/daily-test.json';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear } from 'd3';

function formatDate(badDate) {
  return badDate.toString().slice(5, 6) + '/' + badDate.toString().slice(6);
}

function LineGraph() {
  
  const [positiveData, setPositiveData] = useState(JSONdata.map(item => item.positive));
  const [dateData, setDateData] = useState(JSONdata.map(item => item.date));

  console.log('PositiveData: ', positiveData);

  const svgRef = useRef();

  useEffect(() => {
    
    // const fetchData = async() => {
    //   const result = await request.get('https://covidtracking.com/api/v1/us/daily.json');
    //   const resultObj = JSON.parse(result.text);
    //   console.log('Data is:', resultObj);
    //   setPositiveData(resultObj.map(item => item.positive));
    //   setDateData(resultObj.map(item => item.date));
    // }

    // Looks like I'm running a loop here, let's just stick with local data...
    // fetchData();

    const svg = select(svgRef.current);
    
    const xScale = scaleLinear()
      .domain([0, positiveData.length - 1])
      .range([0, 600]);
    const yScale = scaleLinear()
      .domain([0, Math.max(...positiveData)])
      .range([400, 0]);
  
    const xAxis = axisBottom(xScale)
      .ticks(positiveData.length)
      .tickFormat(index => formatDate(dateData[index]));
    const yAxis = axisRight(yScale)
      .ticks(positiveData.length);

    svg
      .select('.x-axis')
      .style('transform', 'translateY(400px)')
      .call(xAxis);

    svg
      .select('.y-axis')
      .style('transform', 'translateX(600px)')
      .call(yAxis);

    
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll('.line')
      .data([positiveData])
      .join('path')
      .attr('class', 'line')
      .attr('d', value => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, []);

  return (   
    <div className={styles.LineGraph}>
      <div>
        <h2>Total U.S. Positive Cases</h2>
        <svg ref={svgRef}>
          <g className='x-axis' />
          <g className='y-axis' />
        </svg>
        <br />
        <br />
        <br />
        <br />
        {/* <button onClick={() => setData(tempData.map(value => value + 5))}>Update Data</button>
        <button onClick={() => setData(tempData.filter(value => value < 35))}>Filter Data</button> */}
      </div>
    </div>
  );
}

export default LineGraph;
