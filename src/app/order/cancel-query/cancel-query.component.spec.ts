import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelQueryComponent } from './cancel-query.component';

describe('CancelQueryComponent', () => {
  let component: CancelQueryComponent;
  let fixture: ComponentFixture<CancelQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
