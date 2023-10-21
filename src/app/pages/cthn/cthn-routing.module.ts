import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CthnComponent } from './component/cthn.component';

const routes: Routes = [
  {
    path: '',
    component: CthnComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class CthnRoutingModule {}
