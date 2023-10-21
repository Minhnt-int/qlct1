import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MonthChartComponent } from './component/month-chart/month-chart.component';
import { MonthCompareComponent } from './component/month-compare/month-compare.component';

const routes = [
  { path: 'monthchart', component: MonthChartComponent },
  { path: 'monthcompare', component: MonthCompareComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class DashboardRoutingModule {}
