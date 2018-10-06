import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  @ViewChild('preview_top') preview_top: ElementRef;
  @ViewChild('preview_newcomer') preview_newcomer: ElementRef;
  @ViewChild('preview_coupon') preview_coupon: ElementRef;
  @ViewChild('preview_bottom') preview_bottom: ElementRef;

  topImageFiles: File[];
  newcomerImageFile: File;
  couponImageFile: File;
  bottomImageFiles: File[];

  topImages: any[];
  newcomerImage: any;
  couponImage: any;
  bottomImages: any[];

  numOfTopImages: number = 0;
  numOfBottomImages: number = 0;

  constructor(private vjApi: VJAPI, private renderer: Renderer2) { 
  	this.topImageFiles = new Array<File>();
  	this.bottomImageFiles = new Array<File>();

  	this.topImages = new Array<any>();
  	this.bottomImages = new Array<any>();
  }

  ngOnInit() {
  }

  preview(event, position) {
  	switch(position) {
  		case 'top':
  			// remove previous selected images
  			console.log(this.topImages);
  			if(this.topImages.length > 0) {
  				for(let i = this.topImages.length - 1; i >= 0; i--) {
  					console.log(this.topImages[i]);
  					this.renderer.removeChild(this.preview_top.nativeElement, this.topImages[i]);
  					this.topImages.pop();
  				}
  			}
  			if(event.target.files) {
  				this.topImageFiles = event.target.files;
  			}
  			break;

  		case 'newcomer':
  			// remove previous selected images
  			if(this.newcomerImage) {
  				this.renderer.removeChild(this.preview_newcomer.nativeElement, this.newcomerImage);
  				this.newcomerImage = null;
  			}

  			if(event.target.files) {
  				this.newcomerImageFile = event.target.files[0];
  			}
  			break;

  		case 'coupon':
  			// remove previous selected images
  			if(this.couponImage) {
  				this.renderer.removeChild(this.preview_coupon.nativeElement, this.couponImage);
  				this.couponImage = null;
  			}

  			if(event.target.files) {
  				this.couponImageFile = event.target.files[0];
  			}
  			break;

  		case 'bottom':
  			// remove previous selected images
  			if(this.bottomImages.length) {
  				for(let i = this.bottomImages.length - 1; i >= 0; i--) {
  					this.renderer.removeChild(this.preview_bottom.nativeElement, this.bottomImages[i]);
  					this.bottomImages.pop();
  				}
  			}
  			if(event.target.files) {
  				this.bottomImageFiles = event.target.files;
  			}

  	}

   	if(event.target.files) {

  		for(let i= 0; i < event.target.files.length; i++) {
   			const img = this.renderer.createElement('img');
   			this.renderer.setAttribute(img, 'src', URL.createObjectURL(event.target.files[i]));
   			this.renderer.setAttribute(img, 'width', '200');

	        switch(position) {
	          case 'top':
	            this.renderer.appendChild(this.preview_top.nativeElement, img);
	            this.topImages.push(img);
	            break;
	          case 'newcomer':
	            this.renderer.appendChild(this.preview_newcomer.nativeElement, img);
	            this.newcomerImage = img;
	            break;
	          case 'coupon':
	          	this.renderer.appendChild(this.preview_coupon.nativeElement, img);
	          	this.couponImage = img;
	          	break;
	          case 'bottom':
	            this.renderer.appendChild(this.preview_bottom.nativeElement, img);
	            this.bottomImages.push(img);
	            break;
	        }
  		}
  	}
  }

  prepareUpdateData() {
  	let body = new FormData();

  	if(this.topImageFiles.length > 0) {
  		for(let i = 0; i < this.topImageFiles.length; i++) {
  			this.numOfTopImages++;
  			body.append('top_image_' + i, this.topImageFiles[i]);
  		}
  	}

  	if(this.newcomerImageFile) {
  		body.append('newcomer_image', this.newcomerImageFile);
  	}

  	if(this.couponImageFile) {
  		body.append('coupon_image', this.couponImageFile);
  	}

  	if(this.bottomImageFiles.length > 0) {
  		for(let i = 0; i < this.bottomImageFiles.length; i++) {
  			this.numOfBottomImages++;
  			body.append('bottom_image_' + i, this.bottomImageFiles[i]);
  		}
  	}

  	body.append('num_top_images', this.numOfTopImages + '');
  	body.append('num_bottom_images', this.numOfBottomImages + '');

  	return body;
  }

  save() {
  	let body = this.prepareUpdateData();

  	this.vjApi.updateHomePageImages(body).subscribe((resp) => { console.log(resp)});
  }
}
