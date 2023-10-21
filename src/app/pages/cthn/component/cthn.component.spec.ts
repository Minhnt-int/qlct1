import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CthnComponent } from './cthn.component';

describe('CthnComponent', () => {
  let component: CthnComponent;
  let fixture: ComponentFixture<CthnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CthnComponent]
    });
    fixture = TestBed.createComponent(CthnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
