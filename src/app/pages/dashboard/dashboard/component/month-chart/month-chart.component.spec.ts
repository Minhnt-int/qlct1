import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthChartComponent } from './month-chart.component';

describe('MonthChartComponent', () => {
  let component: MonthChartComponent;
  let fixture: ComponentFixture<MonthChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthChartComponent]
    });
    fixture = TestBed.createComponent(MonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
