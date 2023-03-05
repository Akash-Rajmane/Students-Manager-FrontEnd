import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import classes from './PieChart.module.scss';
import PieChartTypes from './PieChartTypes';
import ReactDOM from "react-dom";

type Datum = number | { valueOf(): number };
const PieChart: React.FC<PieChartTypes> = ({
  chartTitle,
  width,
  height,
  labelArr,
  pieData,
  customClass
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
 

  useEffect(() => {
    const w = width || 400;
    const h = height || 320;
    const margin = 20; 

    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('margin-top', 10)
      .style('margin-bottom', 10)
      .style('overflow', 'visible');

    const g = svg
      .append('g')
      .attr('transform', 'translate(' + w / 2 + ',' + (h / 2 + 10) + ')');

    const radius = Math.min(w, h) / 2;

    const colorArr = [
      'green',
      'red',
      '#377eb8',
      '#984ea3',
      '#e41a1c',
      '#0000ff',
      '#F0FFF0',
      '#C0C0C0',
      '#DAA520',
      '#FFFF00',
      '#ADFF2F',
    ];

    const labelArray = labelArr || [];
    const pieDataArray = pieData || [];
    const arcStrokeFlag = pieDataArray[1] === 0 ? false : true;

   

    const pie = d3.pie();

    const tooltip = d3
      .select('.toolTipContainer')
      .append('div')
      .style('opacity', 0)
      .attr('class', classes.tooltip);

    const showTooltip = function (event: any, d: any) {
      tooltip.transition().duration(200);
      tooltip
        .style('opacity', 1)
        .html('Value: ' + d.value)
        .style('left', event.x + 5 + 'px')
        .style('top', event.y - 35 + 'px');
    };
    const moveTooltip = function (event: any, d: any) {
      tooltip
        .style('left', event.x + 5 + 'px')
        .style('top', event.y - 35 + 'px');
    };
    const hideTooltip = function (event: any, d: any) {
      tooltip.transition().duration(200).style('opacity', 0);
    };

    const path = d3
      .arc<d3.PieArcDatum<Datum>>()
      .innerRadius(0)
      .outerRadius(radius - 15);

    const label = d3
      .arc()
      .innerRadius(radius - 145)
      .outerRadius(radius);

    const arcs = g
      .selectAll('.arc')
      .data(pie(pieDataArray))
      .enter()
      .append('g')
      .classed(classes.arc, arcStrokeFlag);

    arcs
      .append('path')
      .attr('d', path)
      .attr('fill', (d, i) => colorArr[i])
      .on('mouseover', showTooltip)
      .on('mousemove', moveTooltip)
      .on('mouseleave', hideTooltip);


    const legend = svg
                    .selectAll('.legends')
                    .data(labelArray);

    legend
      .enter()
      .append('circle')
      .attr('cx', radius / 2)
      .attr('cy', function (d, i) {
        return i * 25 - margin;
      })
      .attr('r', 10)
      .style('fill', (d, i) => colorArr[i]);

legend
      .enter()
      .append('text')
      .attr('x', radius / 2 + 25)
      .attr('y', function (d, i) {
        return i * 25 - margin;
      })
      .style('fill', (d, i) => colorArr[i])
      .text(function(d){ return d;})
      .attr('text-anchor', 'left')
      .style('alignment-baseline', 'middle');

  }, [width, height, labelArr, pieData]);
  
  return (
    <div className={customClass && customClass}>
      <Tooltip/>
      {chartTitle && <p className={classes.pieChartTitle}>{chartTitle}</p>}
      <svg ref={svgRef} />
    </div>
  );
};

export default PieChart;

export const Tooltip = () => {

  const child = (<div className={'toolTipContainer'}></div>);
  const parent = document.getElementById("toolTip")! as HTMLElement;


  return ReactDOM.createPortal(child,parent);
}
