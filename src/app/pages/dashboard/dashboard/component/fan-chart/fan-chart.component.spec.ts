import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FanChartComponent } from './fan-chart.component';

describe('FanChartComponent', () => {
  let component: FanChartComponent;
  let fixture: ComponentFixture<FanChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FanChartComponent]
    });
    fixture = TestBed.createComponent(FanChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
