import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearChartComponent } from './year-chart.component';

describe('YearChartComponent', () => {
  let component: YearChartComponent;
  let fixture: ComponentFixture<YearChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearChartComponent]
    });
    fixture = TestBed.createComponent(YearChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
