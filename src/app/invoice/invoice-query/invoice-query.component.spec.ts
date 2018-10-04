import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceQueryComponent } from './invoice-query.component';

describe('InvoiceQueryComponent', () => {
  let component: InvoiceQueryComponent;
  let fixture: ComponentFixture<InvoiceQueryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceQueryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
