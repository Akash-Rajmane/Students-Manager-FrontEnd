import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import classes from './BarChart.module.scss';
import BarChartTypes from './BarChartTypes';

const BarChart: React.FC<BarChartTypes> = ({
  width,
  height,
  chartTitle,
  data,
  xAxisLabel = 'X Axis',
  xTickNumber = 4,
  xTickFontSize = '12px',
  yAxisLabel = 'Y Axis',
  yTickNumber = 12,
  yTickFontSize = '12px',
  yFormat = 'd',
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
     // .style('overflow', 'visible');

    const margin = 120;
    // const graphWidth = width - margin;
    // const graphHeight = height - margin;
    const colorArr = [
      'indigo',
      'gold',
      'steelblue',
      'red',
      'greenyellow',
      'orange',
      'slategrey',
    ];

    // Add the tooltip
    // const tooltip = d3
    //   .select('svg')
    //   .append('div')
    //   .style('opacity', 0)
    //   .attr('class', classes.tooltip);

    // const showTooltip = (event: any, d: any) => {
    //   tooltip.transition().duration(200);
    //   tooltip
    //     .style('opacity', 1)
    //     .html('Grade: ' + d.Grade + ' , Number of Students: ' + d.Value)
    //     .style('left', event.pageX + 5 + 'px')
    //     .style('top', event.pageY - 50 + 'px');
    // };

    // const moveTooltip = (event: any, d: any) => {
    //   tooltip
    //     .style('left', event.pageX  + 5 + 'px')
    //     .style('top', event.pageY - 50 + 'px');
    // };

    // const hideTooltip = (event: any, d: any) => {
    //   tooltip.transition().duration(200).style('opacity', 0);
    // };

    const xScale = d3.scaleBand().range([0, width-margin]).padding(0.5);
    const yScale = d3.scaleLinear().range([height-margin, 0]);

    const g = svg.append('g').attr("transform","translate("+margin/2+","+margin/2+")");

    xScale.domain(data.map((d: any) => d.Grade));
    yScale.domain([0, d3.max(data, (d: any) => d.Value)]);


    g.append('g')
      .attr('transform', 'translate(0,' + (height-margin) + ')')
      .style('font-size', xTickFontSize)
      .style('stroke', 'grey')
      .call(d3.axisBottom(xScale).ticks(xTickNumber).tickSize(0))
      .append('text')
      .attr('y', 40)
      .attr('x', (width-margin) / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'green')
      .attr('font-size', '16px')
      .attr('font-family', 'Poppins')
      .text(xAxisLabel)

    g.append('g')
      .attr('transform', 'translate(0,0)')
      .style('font-size', yTickFontSize)
      .style('stroke', 'grey')
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(d3.format(yFormat ? yFormat : 'd'))
          .ticks(yTickNumber)
          .tickSize(-width)
          .tickSizeOuter(0)
      )
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', - (height-margin) / 2)
      .attr('y', -40)
      .attr('text-anchor', 'middle')
      .attr('fill', 'green')
      .attr('font-size', '16px')
      .attr('font-family', 'Poppins')
      .text(yAxisLabel);

    

    // Add the bars
    g.selectAll('bars')
      .data(data)
      .enter() 
      .append('rect')
      .attr("transform","translate(0,0)")
      .attr('x', (d: any) => xScale(d.Grade) || 0)
      .attr('y', (d: any) => yScale(d.Value))
      .attr('width', xScale.bandwidth()) 
      .transition()
      .duration(1500)
      .delay((d,i:number)=>i*300)
      .attr('height', (d: any) => (height-margin) - yScale(d.Value) || 0)     
      .attr('fill', (d: any, i: any) => colorArr[i])
      // .on('mouseover', showTooltip)
      // .on('mousemove', moveTooltip)
      // .on('mouseleave', hideTooltip);



  }, [
    data,
    xAxisLabel,
    yAxisLabel,
    xTickFontSize,
    yTickFontSize,
    xTickNumber,
    yTickNumber,
    yFormat,
    height,
    width,
  ]);
  return (
    <div className={classes.barChart}>
      {chartTitle && <div className={classes.barChartTitle}>{chartTitle}</div>}
      <svg ref={svgRef} className={classes.svg}/>
    </div>
  );
};

export default BarChart;
