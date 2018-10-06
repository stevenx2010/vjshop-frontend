import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceIssueComponent } from './invoice-issue.component';

describe('InvoiceIssueComponent', () => {
  let component: InvoiceIssueComponent;
  let fixture: ComponentFixture<InvoiceIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoiceIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
