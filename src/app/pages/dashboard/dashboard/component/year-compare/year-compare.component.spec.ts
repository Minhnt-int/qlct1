import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearCompareComponent } from './year-compare.component';

describe('YearCompareComponent', () => {
  let component: YearCompareComponent;
  let fixture: ComponentFixture<YearCompareComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearCompareComponent]
    });
    fixture = TestBed.createComponent(YearCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
