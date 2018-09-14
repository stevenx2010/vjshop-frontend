import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorContactFormComponent } from './distributor-contact-form.component';

describe('DistributorContactFormComponent', () => {
  let component: DistributorContactFormComponent;
  let fixture: ComponentFixture<DistributorContactFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorContactFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
