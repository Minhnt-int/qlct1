import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/services/api.service';
import { AppState } from 'src/app/services/app.state';
import {
  fieldSelector,
  itemsSelector,
} from 'src/app/services/store/data.selector';

@Component({
  selector: 'app-month-compare',
  templateUrl: './month-compare.component.html',
  styleUrls: ['./month-compare.component.scss'],
})
export class MonthCompareComponent {
  newDate: any;
  pickedfield: any = [];
  tongchi: any[][] = [];
  varfield = [];
  constField = ['date'];
  pickedmonth: Date[] = [];
  monthData: any[][] = [];
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
    this.pickedmonth.push(new Date());
    this.getField();
    this.getData();
    console.log(this.field, this.data);
  }
  removeChoose(index: number) {
    if (this.pickedmonth.length > 1) this.pickedmonth.splice(index, 1);
    console.log(this.pickedmonth);

    this.setMonthData();
  }
  onPickField(field: string) {
    // this.pickedfield = field;
    this.setMonthData();
  }
  onNewDate(result: any) {
    if (result == null) return;
    let arr = this.pickedmonth.filter((month) => {
      return (
        month.getMonth() == result.getMonth() &&
        month.getFullYear() == result.getFullYear()
      );
    });
    if (arr.length > 0) {
      this.message.error('Đã có bảng tháng này!');
      return;
    }
    this.pickedmonth.push(result);
    this.onPickDate(result);
  }
  onPickDate(result: any): void {
    this.setMonthData();
  }
  setMonthData() {
    console.log(this.pickedmonth.length);
    this.monthData = [];
    for (let i = 0; i < this.pickedmonth.length; i++) {
      this.monthData[i] = this.pickmonth(
        this.pickedmonth[i].getMonth() + 1,
        this.pickedmonth[i].getFullYear()
      );
    }

    this.getTongchi();
    console.log(this.pickedmonth[0].getMonth(), 'hi');
  }
  pickmonth(month: number, year: number) {
    return this.data.filter((item: any) => {
      const newDate = new Date(item.date);
      return newDate.getMonth() + 1 === month && newDate.getFullYear() === year;
    });
  }

  sort() {
    let data = [...this.data];
    data = data.sort((a: any, b: any) => {
      if (a.date > b.date) {
        return 1;
      } else {
        return -1;
      }
    });
    this.data = data;
  }

  getTongchi() {
    if (this.monthData) {
      this.tongchi = [];
      for (let i = 0; i < this.monthData.length; i++) {
        if (Array.isArray(this.monthData[i]))
          this.tongchi[i] = this.monthData[i].map((data: any) => {
            let total = 0;

            for (let j = 0; j < this.pickedfield.length; j++) {
              total += data[this.pickedfield[j]];
            }
            return {
              date: data.date,
              tongchi: total,
            };
          });
      }
    }
    console.log(this.tongchi);
  }
  getData() {
    // this.service.getData().subscribe(
    //   (x) => {
    //     this.data = x;
    //     this.sort();

    //     this.monthData[0] = this.pickmonth(
    //       this.pickedmonth[0].getMonth() + 1,
    //       this.pickedmonth[0].getFullYear()
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

      this.monthData[0] = this.pickmonth(
        this.pickedmonth[0].getMonth() + 1,
        this.pickedmonth[0].getFullYear()
      );
      this.getTongchi();
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
