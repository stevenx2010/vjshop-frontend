import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { ProductCategory } from '../../../models/product-category';
import { ProductSubCategory } from '../../../models/product-sub-category';
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  @ViewChild('previewThumbnail') previewThumbnail: ElementRef;
  @ViewChild('fileInput') fielInput: ElementRef;
  @ViewChild('previewTopImages') previewTopImages: ElementRef;
  @ViewChild('previewBottomImages') previewBottomImages: ElementRef;

  @ViewChild('topImageInput') topImageInput: ElementRef;

  @ViewChild('c') c: ElementRef;
  @ViewChild('s') s: ElementRef;

  productCategories: ProductCategory[];
  productSubCategories: ProductSubCategory[];
  product: Product;
  productId: number;

  form: FormGroup;

  title: string = '新增产品';

  topImageQueue: any[];
  bottomImageQueue: any[];
  thumbnailImage: any;

  topImageFiles: File[];
  bottomImageFiles: File[];
  thumbnailFile: File;

  formFunction: string = 'add';

  constructor(private fb: FormBuilder, private renderer: Renderer2, private vjApi: VJAPI, private router: Router,
              private actRoute: ActivatedRoute) 
  { 
    this.productCategories = new Array<ProductCategory>(new ProductCategory());
    this.productSubCategories = new Array<ProductSubCategory>(new ProductSubCategory());
   
    this.product = new Product();

    this.topImageQueue = new Array<any>();
    this.bottomImageQueue = new Array<any>();

    this.topImageFiles = new Array<File>();
    this.bottomImageFiles = new Array<File>();

    this.productId = this.actRoute.snapshot.params['id'];
    if(this.productId) {
      this.formFunction = 'edit';
      this.title = '编辑产品';
    }

  }

  ngOnInit() {
  	this.form = this.fb.group({
      category_id: ['', Validators.required],
      sub_category_id: ['', Validators.required],
  		name: ['', Validators.required],
  		model: ['', Validators.required],
  		description: ['', Validators.compose([Validators.required, Validators.maxLength(600)])],
  		package_unit: ['盒', Validators.required],
  		weight: [0, Validators.required],
  		weight_unit: ['kg', Validators.required],
  		price: [0.00, Validators.required],
  		brand: ['Venjong'],
  		inventory: [0, Validators.required],
  		sort_order: [999, Validators.required],
  	});

    this.vjApi.getProductCategoryForConsole().subscribe((data) => {
      if(data) {
        this.productCategories = data;
      }
    });

    if(this.formFunction == 'edit'){
      this.vjApi.queryProductById(this.productId).subscribe((p) => {
        if(p.length > 0) {
          this.product  = p[0];

          // fill category control
          this.vjApi.queryProductCategoryIdBySubCatId(p[0].product_sub_category_id).subscribe((catId) => {
            let id = (catId.json())[0].id;
            let name = (catId.json())[0].name;
            this.c.nativeElement.selectedIndex = id;
            this.form.controls['category_id'].setValue(id);
          
            // fill subcategory control
            console.log(this.product);
            this.populateSubCategories(id);
            this.s.nativeElement.selectedIndex = this.product.product_sub_category_id;
            this.form.controls['sub_category_id'].setValue(this.product.product_sub_category_id);

            this.form.controls['name'].setValue(this.product.name);
            this.form.controls['model'].setValue(this.product.model);
            this.form.controls['description'].setValue(this.product.description);
            this.form.controls['package_unit'].setValue(this.product.package_unit);
            this.form.controls['price'].setValue(this.product.price);
            this.form.controls['brand'].setValue(this.product.brand);
            this.form.controls['inventory'].setValue(this.product.inventory);
          });
        }
      })
    }
  }


  previewImages(event, position: string) {
    // clear previous pictures

    switch(position) {
      case 'thumbnail':
        if(this.thumbnailImage) this.renderer.removeChild(this.previewThumbnail.nativeElement, this.thumbnailImage);

        if(event.target.files) this.thumbnailFile = event.target.files[0];
        console.log(this.thumbnailFile);
        break;

      case 'top':
        if(this.topImageQueue.length > 0) {
          for(let i = this.topImageQueue.length - 1; i >= 0; i--) {
              this.renderer.removeChild(this.previewTopImages.nativeElement, this.topImageQueue[i]);
              this.topImageQueue.pop();
          }
        }
        if(event.target.files) this.topImageFiles = event.target.files;
        break;

      case 'bottom':
        if(this.bottomImageQueue.length > 0) {
          for(let i = this.bottomImageQueue.length - 1; i >= 0; i--) {
              this.renderer.removeChild(this.previewBottomImages.nativeElement, this.bottomImageQueue[i]);
              this.bottomImageQueue.pop();
          }
        }
        if(event.target.files) this.bottomImageFiles = event.target.files;
        break;
    }

  	if(event.target.files) {

  		for(let i= 0; i < event.target.files.length; i++) {
   			const img = this.renderer.createElement('img');
   			this.renderer.setAttribute(img, 'src', URL.createObjectURL(event.target.files[i]));
   			this.renderer.setAttribute(img, 'width', '200');

        switch(position) {
          case 'thumbnail':
            this.renderer.appendChild(this.previewThumbnail.nativeElement, img);
            this.thumbnailImage = img;
            break;
          case 'top':
            this.renderer.appendChild(this.previewTopImages.nativeElement, img);
            this.topImageQueue.push(img);
            break;
          case 'bottom':
            this.renderer.appendChild(this.previewBottomImages.nativeElement, img);
            this.bottomImageQueue.push(img);
            break;
        }
  		}
  	}
  }


  submitThumbnail() {
  	let body = this.prepareFormData();
  	//body.append("file", this.selectedFiles);
  	console.log(body);
  	this.vjApi.updateOrCreateProductImages(body).subscribe((data) => console.log(data));
    this.form.get('thumbnail').setValue(null);
  }

  prepareFormData() {
    let body = new FormData();
    if(this.formFunction == 'edit'){
      body.append('id', this.productId + '');
    }
    body.append('product_sub_category_id', this.product.product_sub_category_id + '');
    body.append('product_sub_category_name', this.product.product_sub_category_name);
    body.append('name',this.form.controls.name.value);
    body.append('description', this.form.get('description').value);
    body.append('model',this.form.get('model').value);
    body.append('package_unit', this.form.get('package_unit').value);
    body.append('weight', this.form.get('weight').value);
    body.append('weight_unit', this.form.get('weight_unit').value);
    body.append('price', this.form.get('price').value);
    body.append('brand', this.form.get('brand').value);
    body.append('inventory', this.form.get('inventory').value);
    body.append('sort_order',  this.form.get('sort_order').value);
    body.append('thumbnail', this.thumbnailFile);
    for(let i = 0; i < this.topImageFiles.length; i++) {
      body.append('topImage' + i, this.topImageFiles[i]);
    }

    for(let i = 0; i < this.bottomImageFiles.length; i++) {
      body.append('bottomImage' + i, this.bottomImageFiles[i]);
    }

    body.append('numOfTopImages', this.topImageFiles.length + '');
    body.append('numOfBottomImages', this.bottomImageFiles.length + '');

    return body;
  }

  submitData() {
    /*
    this.form.disable();

    this.product.name = this.form.controls.name.value;
    this.product.description =this.form.get('description').value;
    this.product.model =this.form.get('model').value;
    this.product.package_unit =this.form.get('package_unit').value;
    this.product.weight = this.form.get('weight').value;
    this.product.weight_unit = this.form.get('weight_unit').value;
    this.product.price = this.form.get('price').value;
    this.product.brand =this.form.get('brand').value;
    this.product.inventory = this.form.get('inventory').value;
    this.product.sort_order = this.form.get('sort_order').value;

    console.log(this.product);*/

    let body = this.prepareFormData();

    console.log(body);
    this.vjApi.updateOrCreateProduct(body).subscribe((data)=> {
      console.log(data);
      if(data) {
        this.productId = (data.json())['id'];
        console.log(this.productId);
      }
    });

    // get back the product id of this one

  }

  categorySelected(event) {
    let id = event.target.value;

    this.vjApi.getProductSubCategoriesByProductCategoryId(id).subscribe((data) => {
      if(data) {
        this.productSubCategories = data;
      }
    });
  }

  populateSubCategories(catId) {
    this.vjApi.getProductSubCategoriesByProductCategoryId(catId).subscribe((data) => {
      if(data) {
        this.productSubCategories = data;
      }
    });    
  }

  subCategorySelected(event) {
    let id = event.target.value;
    console.log(id);
    console.log(this.productSubCategories); 
    for(let i = 0; i < this.productSubCategories.length; i++) {
      if(this.productSubCategories[i].id == id) {
        this.product.product_sub_category_name = this.productSubCategories[i].name;
        this.product.product_sub_category_id = this.productSubCategories[i].id;
        break;
      }
    }   

    console.log(this.product);
  }

}
