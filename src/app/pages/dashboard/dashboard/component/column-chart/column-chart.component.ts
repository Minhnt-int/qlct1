import { OnChanges, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit, OnChanges {
  @Input() height: number = 200;
  @Input() width: number = 400;
  @Input() data!: any;
  @Input() fieldName: string = 'tongchi';
  averageH: any;
  average: any;
  dataheight: any[] = [];
  date: any[] = [];

  chartContainer = () => {
    return {
      height: `${this.height}px`,
      width: `${this.width}px`,
    };
  };

  columnWidth = () => {
    return {
      width: `${(this.width * 0.9) / this.data?.length}px`,
    };
  };
  columnStyle = (percent: number, index: number) => {
    return {
      height: `${percent}%`,
      width: `${(95 / this.data.length) * index}%`,
    };
  };
  ngOnChanges() {
    if (this.data) {
      this.dataheight = this.data.map((data: any) => {
        return data[this.fieldName];
      });

      this.average = (
        this.dataheight.reduce(
          (acc: number, current) => acc + parseInt(current, 10),
          0
        ) / this.dataheight.length
      ).toFixed(2);
      this.averageH = (this.average / Math.max(...this.dataheight)) * 90;
      this.dataheight = this.dataheight.map((data: any) => {
        return ((data / Math.max(...this.dataheight)) * 90).toFixed(2);
      });
      this.date = this.data.map((data: any) => {
        return new Date(data.date).getDate();
      });
    }
  }
  ngOnInit(): void {}
  log() {}
}
