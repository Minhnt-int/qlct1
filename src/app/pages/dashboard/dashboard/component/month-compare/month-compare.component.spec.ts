import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthCompareComponent } from './month-compare.component';

describe('MonthCompareComponent', () => {
  let component: MonthCompareComponent;
  let fixture: ComponentFixture<MonthCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonthCompareComponent]
    });
    fixture = TestBed.createComponent(MonthCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
