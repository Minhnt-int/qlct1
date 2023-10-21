import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ApiService } from 'src/app/services/api.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClientModule } from '@angular/common/http';
import { FanChartComponent } from './component/fan-chart/fan-chart.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MonthChartComponent } from './component/month-chart/month-chart.component';
import { MonthCompareComponent } from './component/month-compare/month-compare.component';
import { YearChartComponent } from './component/year-chart/year-chart.component';
import { YearCompareComponent } from './component/year-compare/year-compare.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ColumnChartComponent } from './component/column-chart/column-chart.component';
import { LineChartComponent } from './component/line-chart/line-chart.component';
@NgModule({
  declarations: [
    FanChartComponent,
    MonthChartComponent,
    MonthCompareComponent,
    YearChartComponent,
    YearCompareComponent,
    ColumnChartComponent,
    LineChartComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    NzDatePickerModule,
    FormsModule,
    NzSelectModule,
    NzCardModule,
  ],
  providers: [ApiService, NzModalService, NzMessageService],
  exports: [ColumnChartComponent],
})
export class DashboardModule {}
