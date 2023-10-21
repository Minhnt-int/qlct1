import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from './../../../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd/modal';
import { fieldModel } from '../../field-model';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/services/app.state';
import { addfield, editfield } from 'src/app/services/store/data.actions';
import { fieldSelector } from 'src/app/services/store/data.selector';

@Component({
  selector: 'app-field-edit',
  templateUrl: './field-edit.component.html',
  styleUrls: ['./field-edit.component.scss'],
})
export class FieldEditComponent implements OnInit {
  fieldtype = [
    {
      value: 'date',
      label: 'Thời gian',
    },
    {
      value: 'number',
      label: 'Số liệu',
    },
    {
      value: 'text',
      label: 'Chữ',
    },
  ];
  editId!: string;
  edit: boolean = false;
  form!: FormGroup;
  isVisible: boolean = false;
  field: any = fieldModel;
  isConfirmLoading: boolean = false;
  constructor(
    private service: ApiService,
    private message: NzMessageService,
    private formBuilder: FormBuilder,
    private nzModalService: NzModalService,
    private store: Store<AppState>
  ) {}
  ngOnInit() {
    this.getField();
    this.initForm();
  }
  editField(field: any) {
    this.editId = field.id;
    Object.keys(this.form.controls).forEach((controlName) => {
      this.form.controls[controlName].setValue(field[controlName]);
    });

    this.isVisible = true;
  }
  addnewField() {
    this.initForm();
    this.editId = '';
    this.isVisible = true;
  }

  initForm() {
    this.form = this.formBuilder.group({
      text: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      fieldtype: ['', [Validators.required]],
    });
  }

  handleOk(id?: string): void {
    this.isConfirmLoading = true;
    if (id) {
      this.setField(this.form.value, id);
    } else {
      this.addField(this.form.value);
    }
    this.isConfirmLoading = false;

    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  getField() {
    // this.service.getField().subscribe(
    //   (x) => {
    //     this.field = x;
    //     this.initForm();
    //     console.log(this.field);
    //   },
    //   (error) => {
    //     console.error(error);
    //     this.message.create('error', `Có lỗi xảy ra`);
    //   }
    // );
    this.store
      .pipe(select(fieldSelector))
      .subscribe((field) => (this.field = field));
    console.log(this.field);
  }
  setField(field: any, id: string) {
    this.nzModalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn sửa dữ liệu không?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        // this.service.setField(ndata, id).subscribe(
        //   () => {
        //     this.getField();
        //     console.log('edit success');
        //     this.message.create('success', `Sửa thành công`);
        //   },
        //   (error) => {
        //     console.error(error);
        //     this.message.create('error', `Sửa thất bại`);
        //   }
        // );
        // this.getField();
        let data = { ...field, id: id };
        this.store.dispatch(editfield(data));
      },
    });
  }

  addField(field: any) {
    console.log(field);

    this.nzModalService.confirm({
      nzTitle: 'Thông báo',
      nzContent: 'Bạn có chắc chắn muốn thêm dữ liệu không?',
      nzOkText: 'Có',
      nzCancelText: 'Không',
      nzOnOk: () => {
        // this.service.addField(field).subscribe(
        //   () => {
        //     this.getField();
        //     console.log('add success');
        //     this.message.create('success', `Thêm mới thành công`);
        //   },
        //   (error) => {
        //     console.error(error);
        //     this.message.create('error', `Thêm mới thất bại`);
        //   }
        // );
        this.store.dispatch(addfield(field));
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
            console.log('del success');
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
