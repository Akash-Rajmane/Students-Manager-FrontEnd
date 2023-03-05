import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './BarChart.scss';

type BarChartTypes = {
  data: {}[];
  width: number;
  height: number;
  chartTitle?: string;
  hTickNumber?: number;
  vTickNumber?: number;
};


const BarChart: React.FC<BarChartTypes> = ({
  width,
  height,
  chartTitle,
  data,
  hTickNumber,
  vTickNumber 
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
      'red'
    ];


    const xScale = d3.scaleBand().range([0, width-margin]).padding(0.5);
    const yScale = d3.scaleLinear().range([height-margin, 0]);

    const g = svg.append('g').attr("transform","translate("+margin/2+","+margin/2+")");

    xScale.domain(data.map((d: any) => d.Grade));
    yScale.domain([0, d3.max(data, (d: any) => d.Value)]);


    g.append('g')
      .attr('transform', 'translate(0,' + (height-margin) + ')')
      .style('font-size', "12px")
      .style('stroke', 'grey')
      .call(d3.axisBottom(xScale).ticks(hTickNumber).tickSize(0))
      .append('text')
      .attr('y', 40)
      .attr('x', (width-margin) / 2)
      .attr('text-anchor', 'middle')
      .attr('fill', 'green')
      .attr('font-size', '16px')
      .attr('font-family', 'Poppins')
      .text("Grades");

    g.append('g')
      .attr('transform', 'translate(0,0)')
      .style('font-size', "12px")
      .style('stroke', 'grey')
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(yScale)
          .tickFormat(d3.format('d'))
          .ticks(vTickNumber)
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
      .text("Number of Students");

    

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



  }, [
    data,
    hTickNumber,
    vTickNumber,
    height,
    width,
  ]);
  
  return (
    <div className={"barChart"}>
      {chartTitle && <div className={"barChartTitle"}>{chartTitle}</div>}
      <svg ref={svgRef} className={"svg"}/>
    </div>
  );
};

export default BarChart;

BarChart.defaultProps = {
  hTickNumber : 4,
  vTickNumber : 12
};