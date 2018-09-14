import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorInventoryFormComponent } from './distributor-inventory-form.component';

describe('DistributorInventoryFormComponent', () => {
  let component: DistributorInventoryFormComponent;
  let fixture: ComponentFixture<DistributorInventoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistributorInventoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorInventoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
