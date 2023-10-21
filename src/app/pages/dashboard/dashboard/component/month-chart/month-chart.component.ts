import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/services/api.service';
import { AppState } from 'src/app/services/app.state';
import { getfield } from 'src/app/services/store/data.actions';
import {
  fieldSelector,
  itemsSelector,
} from 'src/app/services/store/data.selector';

@Component({
  selector: 'app-month-chart',
  templateUrl: './month-chart.component.html',
  styleUrls: ['./month-chart.component.scss'],
})
export class MonthChartComponent {
  pickedfield: any = [];
  tongchi = [];
  varfield = [];
  constField = ['date'];
  pickedmonth!: Date;
  monthData: any;
  colorScheme = {
    domain: ['#FF5733', '#3498DB'],
  };
  data!: any;
  field!: any;

  constructor(
    private service: ApiService,
    private nzModalService: NzModalService,
    private message: NzMessageService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    // this.pickedmonth = new Date();
    // this.getField();
    // this.getData();
  }
  onPickField(arr: string[]) {
    this.setMonthData();
  }
  onPickDate(result: Date): void {
    this.setMonthData();
  }
  setMonthData() {
    this.monthData = this.pickmonth(
      this.pickedmonth.getMonth() + 1,
      this.pickedmonth.getFullYear()
    );
    this.getTongchi();
  }

  getTongchi() {
    if (this.monthData)
      this.tongchi = this.monthData.map((data: any) => {
        let total = 0;

        for (let i = 0; i < this.pickedfield.length; i++) {
          total += data[this.pickedfield[i]];
        }
        return {
          date: data.date,
          tongchi: total,
        };
      });
  }
  pickmonth(month: number, year: number) {
    return this.data.filter((item: any) => {
      const newDate = new Date(item.date);
      return newDate.getMonth() + 1 === month && newDate.getFullYear() === year;
    });
  }

  sort() {
    this.data = this.data.sort((a: any, b: any) => {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  getData() {
    // this.service.getData().subscribe(
    //   (x) => {
    //     this.data = x;
    //     this.sort();

    //     this.monthData = this.pickmonth(
    //       this.pickedmonth.getMonth() + 1,
    //       this.pickedmonth.getFullYear()
    //     );

    //     this.getTongchi();
    //   },
    //   (error) => {
    //     console.error(error);
    //     this.message.create('error', `Có lỗi xảy ra`);
    //   }
    // );
    this.store.pipe(select(itemsSelector)).subscribe((items) => {
      this.data = items;
      this.sort();

      this.monthData = this.pickmonth(
        this.pickedmonth.getMonth() + 1,
        this.pickedmonth.getFullYear()
      );
    });
  }
  getVarfield() {
    this.varfield = this.field
      .filter((field: any) => !this.constField.includes(field.text))
      .map((field: any) => {
        return field.text;
      });
  }
  getField() {
    // this.service.getField().subscribe(
    //   (x) => {
    //     this.field = x;
    //     this.getVarfield();
    //   },
    //   (error) => {
    //     console.error(error);
    //     this.message.create('error', `Có lỗi xảy ra`);
    //   }
    // );
    this.store.pipe(select(fieldSelector)).subscribe((field) => {
      this.field = field;
      this.getVarfield();
    });
  }
}
