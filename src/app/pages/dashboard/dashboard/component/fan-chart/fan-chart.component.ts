import { Component } from '@angular/core';

@Component({
  selector: 'app-fan-chart',
  templateUrl: './fan-chart.component.html',
  styleUrls: ['./fan-chart.component.scss'],
})
export class FanChartComponent {
  fanfield = [80, 11, 6, 3];
  fancolor = ['red', 'blue', 'green', 'yellow', 'black', 'purple'];
  fancurrentReverse = (percent: number, index: number) => {
    let percentRotate = this.fanfield
      .slice(0, index)
      .reduce((acc: number, current) => acc + current, 0);

    let angle = (percentRotate / 100) * 360 + ((percent / 100) * 360 - 180);
    return {
      transform: `rotate(${-angle}deg)`,
    };
  };
  fancurrent = (percent: number, index: number) => {
    let percentRotate = this.fanfield
      .slice(0, index)
      .reduce((acc: number, current) => acc + current, 0);

    let angle = (percentRotate / 100) * 360 + ((percent / 100) * 360 - 180);
    console.log(angle);

    if ((percent / 100) * 360 > 180) {
      console.log('over');
      return {
        overflow: 'unset',
        'background-color': this.fancolor[index],
        transform: `rotate(${angle}deg)`,
      };
    }
    console.log('hi');

    return {
      transform: `rotate(${angle}deg)`,
    };
  };
  fanpercent = (percent: number, index: number) => {
    let angle = -((percent / 100) * 360 - 180);
    return {
      'background-color': this.fancolor[index],
      transform: `rotate(${angle}deg)`,
    };
  };
}
