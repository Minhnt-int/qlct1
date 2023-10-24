import { getdatas, getfield } from './../../../services/store/data.actions';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, combineLatest, interval, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DataEditComponent } from '../popup/data-edit/data-edit.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FieldEditComponent } from '../popup/field-edit/field-edit.component';
import { Store, select } from '@ngrx/store';
import {
  datasortSelector,
  errorSelector,
  fieldSelector,
  itemsSelector,
  statusSelector,
} from '../../../services/store/data.selector';
import { AppState } from 'src/app/services/app.state';
// import * as firebase from 'firebase';
// import * as firebase from 'firebase/firestore';
// import firebase from 'firebase/app';
import * as firestore from '@firebase/firestore';
import { Timestamp } from '@firebase/firestore';
import { dataState } from 'src/app/services/store/data.reducer';

@Component({
  selector: 'app-cthn',
  templateUrl: './cthn.component.html',
  styleUrls: ['./cthn.component.scss'],
})
export class CthnComponent implements OnInit {
  status: any;
  now: any;
  filterData: any;
  date: Date[] = [];
  tongchi: any[] = [];
  tongchithang = [];
  varfield: any[] = [];
  constField = ['date'];

  // data: any;
  field: any[] = [];
  form!: FormGroup;
  expenses: any[] = [];
  data: any[] = [];
  constructor(
    private service: ApiService,
    private formBuilder: FormBuilder,
    private nzModalService: NzModalService,
    private message: NzMessageService,
    private store: Store<AppState>
  ) {}
  ngOnInit(): void {
    this.now = new Date();

    // this.getField();
    // this.store.dispatch(getfield());
    // this.store.dispatch(getdatas());

    this.store.pipe(select(fieldSelector)).subscribe((fields: any) => {
      this.field = [...fields];

      this.initForm();
      this.getVarfield();
    });

    this.store.pipe(select(itemsSelector)).subscribe((data: any) => {
      this.data = [...data];

      this.syncData();
    });
    this.store.pipe(select(errorSelector));
    this.store
      .pipe(select(statusSelector))
      .subscribe((status) => (this.status = status));

    // const sync = setInterval(() => {
    //   this.syncData();
    // }, 3000);

    // let i = 0;
    // let date = new Date();
    // const interval = setInterval(() => {
    //   date = new Date(2023, 2, 0 + i);
    //   i = i + 1;
    //   const expense = {
    //     date: date,
    //     Ăn: Math.floor(Math.random() * 100), // Số tiền tiêu cho Ăn ngẫu nhiên từ 0 đến 99
    //     Chơi: Math.floor(Math.random() * 100), // Số tiền tiêu cho Chơi ngẫu nhiên từ 0 đến 99
    //     Thuốc: Math.floor(Math.random() * 100), // Số tiền tiêu cho Chơi ngẫu nhiên từ 0 đến 99
    //     Học: Math.floor(Math.random() * 100), // Số tiền tiêu cho Chơi ngẫu nhiên từ 0 đến 99
    //   };
    //   console.log(Timestamp.fromDate(date), Timestamp.now());

    //   this.service.addData(expense).subscribe(() => console.log('yes'));

    //   // Kiểm tra nếu đã thêm đủ 300 bản ghi thì dừng interval
    //   if (i >= 300) {
    //     clearInterval(interval);
    //   }
    // }, 1000);
  }

  sort() {
    this.data = this.data.sort((a: any, b: any) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });
  }

  // dataTimestamptodate() {
  //   console.log('hi');

  //   this.data = this.data.map((item) => {
  //     return {
  //       ...item,
  //       date: item.date.toDate(),
  //       // date: item.date,
  //     };
  //   });
  // }
  syncData() {
    this.sort();
    this.filter();
    this.getTongchi();
    this.setMonthData();
  }
  click() {
    const newWindow = window.open(
      'https://www.google.com/',
      'newWindow',
      'width=500, height=600'
    );
    window.addEventListener('message', (event) => {
      // Handle the message received from the child window
      console.log('Message from Child Window:', event.data);
    });
  }

  monthData: any;
  pickmonth(month: number, year: number) {
    return this.data.filter((item: any) => {
      const newDate = new Date(item.date);
      return newDate.getMonth() + 1 === month && newDate.getFullYear() === year;
    });
  }
  setMonthData() {
    this.monthData = this.pickmonth(
      this.now.getMonth() + 1,
      this.now.getFullYear()
    );
    this.getTongchithang();
  }

  getTongchithang() {
    if (this.monthData)
      this.tongchithang = this.monthData
        .map((data: any) => {
          let total = 0;

          for (let i = 0; i < this.varfield.length; i++) {
            if (data[this.varfield[i]] != undefined)
              total += data[this.varfield[i]];
          }
          return {
            date: data.date,
            tongchi: total,
          };
        })
        .reverse();
    console.log(this.tongchithang);
  }

  filter(): void {
    if (this.date.length == 0) {
      this.filterData = this.data;
    } else {
      let newdate = this.date;

      newdate[0].setDate(newdate[0].getDate() - 1);
      newdate[1].setDate(newdate[1].getDate());

      this.filterData = this.data.filter((data: any) => {
        let date = new Date(data.date);

        return date >= this.date[0] && date <= this.date[1];
      });
    }
  }

  addnewData(): void {
    const setmodal: NzModalRef = this.nzModalService.create({
      nzTitle: 'Modal Title',
      nzWidth: '60%',
      nzMaskClosable: false,
      nzContent: DataEditComponent,
      nzFooter: null,
      nzCentered: true,
    });
    setmodal.componentInstance.field = this.field;
    setmodal.afterClose.subscribe((x) => (x ? this.syncData() : null));
  }
  editData(editdata: any, id: number): void {
    const setmodal: NzModalRef = this.nzModalService.create({
      nzTitle: 'Modal Title',
      nzWidth: '60%',
      nzMaskClosable: false,
      nzContent: DataEditComponent,
      nzFooter: null,
      nzCentered: true,
    });

    setmodal.componentInstance.editdata = editdata;
    setmodal.componentInstance.field = this.field;
    setmodal.afterClose.subscribe((x) => (x ? this.syncData() : null));
  }

  editfield(): void {
    const setmodal: NzModalRef = this.nzModalService.create({
      nzTitle: 'Modal Title',
      nzWidth: '60%',
      nzMaskClosable: false,
      nzContent: FieldEditComponent,
      nzFooter: null,
      nzCentered: true,
    });
    setmodal.componentInstance.field = this.field;
    setmodal.afterClose.subscribe(() => this.getField());
  }

  initForm() {
    let formcontrol: any = {};
    of(this.field).subscribe((x: any) =>
      x.forEach((element: any) => {
        formcontrol[element.text] = ['', [Validators.required]];
      })
    );
    this.form = this.formBuilder.group({});
  }
  getTongchi() {
    this.tongchi = this.data.map((data: any) => {
      let total = 0;
      for (let i = 0; i < this.varfield.length; i++) {
        if (data[this.varfield[i]] != undefined)
          total += data[this.varfield[i]];
      }
      return total;
    });
  }

  // getData() {
  //   this.service.getData().subscribe(
  //     (x: any) => {
  //       this.data = x;
  //       this.sort();
  //       this.filter();
  //       this.getTongchi();
  //       this.setMonthData();
  //     },
  //     (error) => {
  //       console.error(error);
  //       this.message.create('error', `Có lỗi xảy ra`);
  //     }
  //   );
  // }
  setData(ndata: any, id: string) {
    this.service.setData(ndata, id).subscribe(() => {
      this.nzModalService.confirm({
        nzTitle: 'Thông báo',
        nzContent: 'Bạn có chắc chắn muốn thêm dữ liệu không?',
        nzOkText: 'Có',
        nzCancelText: 'Không',
        nzOnOk: () => {
          this.service.setData(ndata, id).subscribe(
            () => {
              this.syncData();
              this.message.create('success', `Sửa thành công`);
            },
            (error) => {
              console.error(error);
              this.message.create('error', `Sửa thất bại`);
            }
          );
        },
      });
    });
  }

  addData(ndata: any) {
    this.nzModalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn thêm dữ liệu không?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        this.service.addData(ndata).subscribe(
          () => {
            this.message.create('success', `Thêm mới thành công`);
          },
          (error) => {
            console.error(error);
            this.message.create('error', `Thêm mới thất bại`);
          }
        );
      },
    });
  }

  delData(id: string) {
    let confirmModal = this.nzModalService.confirm({
      nzTitle: 'Xóa dữ liệu?',
      nzContent: '',
      nzOnOk: () =>
        this.service.deleteData(id).subscribe(
          () => {
            this.syncData();
            this.message.create('success', `Xóa thành công`);
          },
          (error) => {
            console.error(error);
            this.message.create('error', `Xóa thất bại`);
          }
        ),
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
    this.service.getField().subscribe(
      (x: any) => {
        this.field = x;
        this.initForm();
        this.getVarfield();
      },
      (error) => {
        console.error(error);
        this.message.create('error', `Có lỗi xảy ra`);
      }
    );
  }
  setField(ndata: any, id: string) {
    this.nzModalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn sửa dữ liệu không?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        this.service.setField(ndata, id).subscribe(
          () => {
            this.getField();
            this.message.create('success', `Sửa thành công`);
          },
          (error) => {
            console.error(error);
            this.message.create('error', `Sửa thất bại`);
          }
        );
        this.getField();
      },
    });
  }

  addField(field: any) {
    this.nzModalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn thêm dữ liệu không?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        this.service.addField(field).subscribe(
          () => {
            this.getField();
            this.message.create('success', `Thêm mới thành công`);
          },
          (error) => {
            console.error(error);
            this.message.create('error', `Thêm mới thất bại`);
          }
        );
      },
    });
  }
  delField(id: string) {
    this.nzModalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn xóa dữ liệu không?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        this.service.deleteField(id).subscribe(
          () => {
            this.getField();
            this.message.create('success', `Xóa thành công`);
          },
          (error) => {
            console.error(error);
            this.message.create('error', `Xóa thất bại`);
          }
        );
      },
    });
  }
}
