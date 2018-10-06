import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-new-comer-page',
  templateUrl: './new-comer-page.component.html',
  styleUrls: ['./new-comer-page.component.css']
})
export class NewComerPageComponent implements OnInit {
  @ViewChild('preview') preview: ElementRef;

  description: string;
  images: any[];
  imageFiles: File[];
  numOfImages: number = 0;

  constructor(private vjApi: VJAPI, private renderer: Renderer2) { 
  	this.images = new Array<any>();
  	this.imageFiles = new Array<File>();
  }

  ngOnInit() {
  }

  previewImage(event) {
  	if(event.target.files && event.target.files.length > 0) {
  		this.imageFiles = event.target.files;

  		// remove old images
  		if(this.images.length > 0) {
  			for(let i = this.images.length - 1; i >= 0; i--) {
  				this.renderer.removeChild(this.preview.nativeElement, this.images[i]);
  				this.images.pop();
  			}
  		}

  		for(let i = 0; i < event.target.files.length; i++) {
  			let img = this.renderer.createElement('img');
  			this.renderer.setAttribute(img, 'src', URL.createObjectURL(this.imageFiles[i]));
  			this.renderer.setAttribute(img, 'width', '200');

  			this.images.push(img);

  			this.renderer.appendChild(this.preview.nativeElement, img);
  		}
  	}
  }

  save() {
  	let body = new FormData();
  	if(this.description) {
  		body.append('description', this.description);
  	}

  	if(this.imageFiles.length > 0) {
  		for(let i = 0; i < this.imageFiles.length; i++) {
  			body.append('image_file_' + i, this.imageFiles[i]);
  			this.numOfImages++;
  		} 

  		body.append('num_of_images', this.numOfImages + ''); 		
  	}

  	this.vjApi.updateNewComerPage(body).subscribe((resp) => {console.log(resp)});
  }
}
