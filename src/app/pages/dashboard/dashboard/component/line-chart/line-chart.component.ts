import {
  Component,
  ViewEncapsulation,
  OnInit,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

import * as d3 from 'd3-selection';
import * as D3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { STOCKS } from 'src/app/models/stocks';

@Component({
  selector: 'app-line-chart',
  encapsulation: ViewEncapsulation.None,

  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, AfterViewInit, OnChanges {
  title = 'Line Chart';

  margin = { top: 20, right: 20, bottom: 30, left: 50 };
  width: number;
  height: number;
  x: any;
  y: any;
  svg: any;
  line?: d3Shape.Line<[number, number]>;

  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();

    console.log(this.svg);
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.initSvg();
    // this.initAxis();
    // this.drawAxis();
    // this.drawLine();
  }
  svg1: any;
  ngAfterViewInit(): void {
    console.log(this.margin);
  }

  initSvg() {
    this.svg = d3
      .select('#svg')
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );
  }

  initAxis() {
    this.x = d3Scale.scaleTime().range([0, this.width]);
    let low = D3.min(STOCKS, (d) => d.low);
    let high = D3.max(STOCKS, (d) => d.high);
    this.y = D3.scaleLog()
      .domain([low ? low : 0, high ? high : 0])
      .rangeRound([this.height, this.margin.top]);
    this.x.domain(d3Array.extent(STOCKS, (d) => d.date));
    // this.y.domain(d3Array.extent(STOCKS, (d) => d.value));
  }

  drawAxis() {
    this.svg
      .append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));

    this.svg
      .append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Price ($)');
  }

  drawLine() {
    // this.line = d3Shape
    //   .line()
    //   .x((d: any) => this.x(d.date))
    //   .y((d: any) => this.y(d.value));

    // this.svg
    //   .append('path')
    //   .datum(STOCKS)
    //   .attr('class', 'line')
    //   .attr('d', this.line);

    let g = this.svg
      .append('g')
      .attr('stroke-linecap', 'round')
      .attr('stroke', 'black')
      .selectAll('g')
      .data(STOCKS)
      .join('g')
      .attr(
        'transform',
        (d: any) => `translate(${this.x(d.date) ? this.x(d.date) : 0},0)`
      );

    console.log(g);

    g.append('line')
      .attr('y1', (d: any) => this.y(d.low))
      .attr('y2', (d: any) => this.y(d.high));

    g.append('line')
      .attr('y1', (d: any) => this.y(d.open))
      .attr('y2', (d: any) => this.y(d.close))
      .attr('stroke-width', 10)
      .attr('stroke', (d: any) =>
        d.open > d.close
          ? D3.schemeSet1[0]
          : d.close > d.open
          ? D3.schemeSet1[2]
          : D3.schemeSet1[8]
      );
  }
}
