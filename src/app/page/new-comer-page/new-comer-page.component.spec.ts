import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewComerPageComponent } from './new-comer-page.component';

describe('NewComerPageComponent', () => {
  let component: NewComerPageComponent;
  let fixture: ComponentFixture<NewComerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewComerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewComerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
