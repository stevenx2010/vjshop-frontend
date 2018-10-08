import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessConsultingComponent } from './process-consulting.component';

describe('ProcessConsultingComponent', () => {
  let component: ProcessConsultingComponent;
  let fixture: ComponentFixture<ProcessConsultingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessConsultingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessConsultingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
