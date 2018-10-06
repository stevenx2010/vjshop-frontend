import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelProcessComponent } from './cancel-process.component';

describe('CancelProcessComponent', () => {
  let component: CancelProcessComponent;
  let fixture: ComponentFixture<CancelProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
