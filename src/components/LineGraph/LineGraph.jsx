import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './LineGraph.css';
import { select, line, curveCardinal, axisBottom, axisRight, scaleLinear, mouse, scaleOrdinal, schemeCategory10 } from 'd3';
import { useResizeObserver } from '../../hooks/d3Hooks';


function LineGraph({ dataset, yAxisConstraints }) {
  
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const [checkedOptions, setCheckedOptions] = useState([]);

  const handleCheckbox = ({ target }) => {
    if(!checkedOptions.includes(target.value)) 
      setCheckedOptions(prevState => [...prevState, target.value]);
    else setCheckedOptions(checkedOptions.filter(item => (item !== target.value)));
  };
  
  const checkboxOptions = (data) => {
    const myKeys = filteredKeys(data);
    return myKeys.map((myKey, i) => 
      <div key={i}>
        <input type='checkbox' id={myKey} name={myKey} value={myKey} onChange={handleCheckbox} checked={checkedOptions.includes(myKey)} />
        <label htmlFor={myKey}>{myKey}</label>
      </div>
    );
  };
  
  function formatDate(badDate) {
    return badDate.toString().slice(6, 7) + '/' + badDate.toString().slice(8, 10);
  }
  
  const selectOptions = (data) => {
    const myKeys = filteredKeys(data);
    return myKeys.map((myKey, i) => <option key={i} value={myKey}>{myKey}</option>);
  };

  const filteredData = (data, selectedKeys) => {
    // Refactor this
    const newArr = [];
    selectedKeys.map(item => { 
      if(data[item]); 
      newArr.push(data[item]);
    });
    return newArr;
  }; 

  const filteredKeys = (data) => {
    const keys = Object.keys(data);
    // Refactor: Apparently, item !== ('date' || 'countryCode' || 'countryName') doesn't work?
    return keys.filter(item => (item !== 'date' && item !== 'countryCode' && item !== 'countryName'));
  };
  

  useEffect(() => {
    if(!dataset || !dataset.date) {
      console.log('No data, exiting useEffect()');
      return;
    }

    const svg = select(svgRef.current);
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    
    // Define scales
    const xScale = scaleLinear()
      .domain([0, dataset['date'].length - 1]) // range of data
      .range([0, width]); // range of pixels
    const yScale = scaleLinear()
      .domain([yAxisConstraints[0], yAxisConstraints[1]])
      .range([height, 0]);
    const colorScale = scaleOrdinal(schemeCategory10)
      .domain(filteredKeys(dataset));
  
    // Define axis
    const xAxis = axisBottom(xScale)
      .ticks(dataset['date'].length / 5)
      .tickFormat(index => formatDate(dataset.date[index]));
    const yAxis = axisRight(yScale)
      .ticks(height / 20);

    // Draw axis on pre-existing elements
    svg
      .select('.x-axis')
      .style('transform', `translateY(${height}px)`)
      .call(xAxis);
    svg
      .select('.y-axis')
      .style('transform', `translateX(${width}px)`)
      .call(yAxis);

    // Define line
    const myLine = line()
      .x((value, index) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    // Draw line
    svg
      .selectAll('.graphLine')
      .data(filteredData(dataset, checkedOptions))
      .join('path')
      .attr('class', 'graphLine')
      .attr('d', value => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', d => colorScale(d));


    // // Mouseover bubbles
    //
    // const mouseG = svg.append('g')
    //   .attr('class', 'mouse-over-effects');
    // const lines = document.getElementsByClassName('line');
    // console.log('lines is: ', lines);
    // const mousePerLine = mouseG.selectAll('.mouse-per-line')
    //   .data([covidData['death']])
    //   .enter()
    //   .append('g')
    //   .attr('class', 'mouse-per-line');
    // mousePerLine.append('circle')
    //   .attr('r', 4)
    //   .style('stroke', 'red')
    //   .style('fill', 'none')
    //   .style('stroke-width', '1px')
    //   .style('opacity', '0');
    // mousePerLine.append('text')
    //   .attr('transform', 'translate(10,3)');
    // mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
    //   .attr('width', width) // can't catch mouse events on a g element
    //   .attr('height', height)
    //   .attr('fill', 'none')
    //   .attr('pointer-events', 'all')
    //   .on('mouseout', function() { // on mouse out hide line, circles and text
    //     svg.select('.mouse-line')
    //       .style('opacity', '0');
    //     svg.selectAll('.mouse-per-line circle')
    //       .style('opacity', '0');
    //     svg.selectAll('.mouse-per-line text')
    //       .style('opacity', '0');
    //   })
    //   .on('mouseover', function() { // on mouse in show line, circles and text
    //     svg.select('.mouse-line')
    //       .style('opacity', '1');
    //     svg.selectAll('.mouse-per-line circle')
    //       .style('opacity', '1');
    //     svg.selectAll('.mouse-per-line text')
    //       .style('opacity', '1');
    //   })
    //   .on('mousemove', function() { // mouse moving over canvas
    //     const thisMouse = mouse(this);
    //     svg.selectAll('.mouse-per-line')
    //       .attr('transform', function(d, i) {
    //         // console.log(width/mouse[0])
    //         // const xDate = x.invert(mouse[0]),
    //         //   bisect = svg.bisector(function(d) { return d.date; }).right;
    //         // bisect(d.values, xDate);
    //         let beginning = 0;
    //         let end = lines[i].getTotalLength();
    //         console.log('getTotalLength', lines[i].getTotalLength());
    //         let target = null;
    //         let pos;
    //         // NOTE: Something is going wrong in here in interpreting the Y axis in mouse position
    //         while(true){
    //           target = Math.floor((beginning + end) / 2);
    //           pos = lines[i].getPointAtLength(target);
    //           // console.log('pos:', pos);
    //           if((target === end || target === beginning) && pos.x !== thisMouse[0]) {
    //             break;
    //           }
    //           if(pos.x > thisMouse[0]) end = target;
    //           else if(pos.x < thisMouse[0]) beginning = target;
    //           else break; //position found
    //         }
    //         // svg.select(this).select('text')
    //         //   .text(y.invert(pos.y).toFixed(2));
    //         return 'translate(' + thisMouse[0] + ',' + pos.y + ')';
    //       });
    //   });

  }, [dataset, checkedOptions]);

  return (   
    <div className={styles.LineGraph}>
      <div ref={wrapperRef} className={styles.container}>
        <svg ref={svgRef}>
          <g className='x-axis' />
          <g className='y-axis' />
        </svg>
        {/* <select value={property} onChange={({ target }) => setProperty(target.value)}>
          {selectOptions(covidData)} */}
          {/* <option value='positive'>Total Positive Cases</option>
          <option value='recovered'>Current Cases</option>
          <option value='death'>Deaths</option> */}
        {/* </select> */}
      </div>
      <div className={styles.Controls}>
        {dataset && <>{checkboxOptions(dataset)}</> }
      </div>

    </div>
  );
}

LineGraph.propTypes = {
  dataset: PropTypes.object.isRequired,
  yAxisConstraints: PropTypes.array.isRequired
};


export default LineGraph;
