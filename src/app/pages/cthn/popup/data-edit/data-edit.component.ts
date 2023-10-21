import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { of, map, filter } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { format } from 'date-fns';
import { fieldModel } from '../../field-model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/services/app.state';
import {
  adddata,
  editdata,
  getfield,
} from 'src/app/services/store/data.actions';
import {
  itemsSelector,
  statusSelector,
} from 'src/app/services/store/data.selector';
import { Timestamp } from '@firebase/firestore';
@Component({
  selector: 'app-data-edit',
  templateUrl: './data-edit.component.html',
  styleUrls: ['./data-edit.component.scss'],
})
export class DataEditComponent implements OnInit {
  change(event: any, fieldName: string) {
    this.form.controls[fieldName].setValue(event);
  }
  loading: boolean = false;
  field: any = fieldModel;
  editdata: any;
  form!: FormGroup;
  ngOnInit(): void {
    this.initForm();
    this.store
      .pipe(select(statusSelector))
      .subscribe((status) => (this.loading = status == 'loading'));
  }
  constructor(
    private formBuilder: FormBuilder,
    private nzModalRef: NzModalRef,
    private service: ApiService,
    private nzModalService: NzModalService,
    private message: NzMessageService,
    private store: Store<AppState>
  ) {}
  initForm() {
    let formcontrol: any = {};
    of(this.field).subscribe((x: any) =>
      x.forEach((element: any) => {
        formcontrol[element.text] = ['', [Validators.required]];
      })
    );
    this.form = this.formBuilder.group(formcontrol);
    if (this.editdata) {
      Object.keys(this.form.controls).forEach((controlName) => {
        this.form.controls[controlName].setValue(this.editdata[controlName]);
      });
    }
  }

  handleOk() {
    // console.log(this.form.invalid);
    if (this.form.invalid) {
      this.message.error('Dữ liệu không hợp lệ!');
      return;
    }

    if (this.editdata) {
      this.setData(this.form.value, this.editdata.id);
    } else {
      this.addData(this.form.value);
    }
  }
  handleCancel() {
    this.nzModalRef.destroy();
  }

  setData(ndata: any, id: string) {
    let data = { ...ndata, id: id };
    this.nzModalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn sửa dữ liệu không?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        // this.service.setData(ndata, id).subscribe(
        //   () => {
        //     console.log('edit success');
        //     this.message.create('success', `Sửa thành công`);
        //     this.loading = false;
        //     this.nzModalRef.destroy(1);
        //   },
        //   (error) => {
        //     console.error(error);
        //     this.message.create('error', `Sửa thất bại`);
        //     this.loading = false;
        //   }
        // );
        this.store.dispatch(editdata({ data }));
      },
    });
  }

  addData(ndata: any) {
    console.log(ndata.date.getDate());

    this.nzModalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn thêm dữ liệu không?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        // this.service.addData(ndata).subscribe(
        //   () => {
        //     console.log('add success');
        //     this.message.create('success', `Thêm mới thành công`);
        //     this.loading = false;
        //     this.nzModalRef.destroy(1);
        //   },
        //   (error) => {
        //     console.error(error);
        //     this.message.create('error', `Thêm mới thất bại`);
        //     this.loading = false;
        //   }
        // );
        let datatime = {
          date: ndata.date.getDate(),
          month: ndata.date.getMonth(),
          year: ndata.date.getFullYear(),
        };

        this.store
          .pipe(
            select(itemsSelector),
            map((datas) => {
              let ndatas = datas.map((data) => {
                return {
                  date: data.date.getDate(),
                  month: data.date.getMonth(),
                  year: data.date.getFullYear(),
                };
              });
              console.log(ndatas);
              ndatas = ndatas.filter(
                (date) => JSON.stringify(date) === JSON.stringify(datatime)
              );

              return !ndatas.length;
            })
          )
          .subscribe((nodata) => {
            if (nodata) {
              this.store.dispatch(adddata(ndata));
            }
          });
      },
    });
  }
}
