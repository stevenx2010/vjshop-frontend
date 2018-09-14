import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorContactComponent } from './distributor-contact.component';

describe('DistributorContactComponent', () => {
  let component: DistributorContactComponent;
  let fixture: ComponentFixture<DistributorContactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorContactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
