import { IconsProviderModule } from './../../icons-provider.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CthnRoutingModule } from './cthn-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { CthnComponent } from './component/cthn.component';
import { ApiService } from 'src/app/services/api.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { DataEditComponent } from './popup/data-edit/data-edit.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FieldEditComponent } from './popup/field-edit/field-edit.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { DashboardModule } from '../dashboard/dashboard/dashboard.module';
import { StoreModule } from '@ngrx/store';
import { datareducer } from 'src/app/services/store/data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { dataEffects } from 'src/app/services/store/data.effects';
import { NzSpinModule } from 'ng-zorro-antd/spin';
const ngZorroConfig: NzConfig = {
  message: { nzMaxStack: 3, nzDuration: 2000 },
};
@NgModule({
  declarations: [
    CthnComponent,
    DataEditComponent,
    FieldEditComponent,
    FieldEditComponent,
  ],
  imports: [
    CommonModule,
    CthnRoutingModule,
    FormsModule,
    HttpClientModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzModalModule,
    NzSelectModule,
    NzDatePickerModule,
    NzInputModule,
    NzFormModule,
    DashboardModule,
    StoreModule.forFeature('feature_state', datareducer),
    EffectsModule.forFeature([dataEffects]),
    NzSpinModule,
  ],
  providers: [
    ApiService,
    NzModalService,
    NzMessageService,
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
  ],
})
export class CthnModule {}
