import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSubCategoryFormComponent } from './product-sub-category-form.component';

describe('ProductSubCategoryFormComponent', () => {
  let component: ProductSubCategoryFormComponent;
  let fixture: ComponentFixture<ProductSubCategoryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSubCategoryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSubCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
