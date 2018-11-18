import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ProgressHttp } from 'angular-progress-http';

import { VJAPI } from '../../../services/vj.services';
import { API_BASE_URL } from '../../../models/constants';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.css']
})
export class AboutPageComponent implements OnInit {
  @ViewChild('preview_top') preview_top: ElementRef;
  @ViewChild('progress_bar') progress_bar: ElementRef;

  topImageFiles: File[];
  topImages: any[];
  numOfTopImages: number = 0;

  progressBar: any;
  percentage: number = 0;

  content: string;
  saveBtnDisabled: boolean = false;

  url: string = API_BASE_URL + 'api/front/about/page/update';

  constructor(private vjApi: VJAPI, private renderer: Renderer2, private http: ProgressHttp) { 
  	this.topImageFiles = new Array<File>();

  	this.topImages = new Array<any>();
  }

  ngOnInit() {
  }

  preview(event, position) {
  	this.saveBtnDisabled = false;

	// remove previously selected images
	console.log(this.topImages);
	if(this.topImages.length > 0) {
		for(let i = this.topImages.length - 1; i >= 0; i--) {
			console.log(this.topImages[i]);
			this.renderer.removeChild(this.preview_top.nativeElement, this.topImages[i]);
			this.topImages.pop();
		}
	}

	if(this.progressBar) {
      this.renderer.removeChild(this.progress_bar.nativeElement, this.progressBar);
      this.progressBar = null;
      this.percentage = 0;
  	}

	if(event.target.files) {
		this.topImageFiles = event.target.files;
		for(let i= 0; i < event.target.files.length; i++) {
   			const img = this.renderer.createElement('img');
   			this.renderer.setAttribute(img, 'src', URL.createObjectURL(event.target.files[i]));
   			this.renderer.setAttribute(img, 'width', '200');

	        this.renderer.appendChild(this.preview_top.nativeElement, img);
	        this.topImages.push(img);
	    }
	}
  }

  contentChange() {
  	this.saveBtnDisabled = false;
	if(this.progressBar) {
      this.renderer.removeChild(this.progress_bar.nativeElement, this.progressBar);
      this.progressBar = null;
      this.percentage = 0;
  	}
  }

  prepareData() {
  	let body = new FormData();

  	if(this.topImageFiles.length > 0) {
  		for(let i = 0; i < this.topImageFiles.length; i++) {
  			this.numOfTopImages++;
  			body.append('top_image_' + i, this.topImageFiles[i]);
  		}
  	}

  	body.append('num_top_images', this.numOfTopImages + '');
  	body.append('content', this.content);

  	return body;
  }

  save() {
  	this.saveBtnDisabled = true;
  	let body = this.prepareData();

    this.updateAboutPageImagesWithProgressHttp(body);
  }

  updateAboutPageImagesWithProgressHttp(body) {
    this.progressBar = this.renderer.createElement('div');
    this.renderer.addClass(this.progressBar, 'progress-bar');
    this.renderer.addClass(this.progressBar, 'progress-bar-info');
    this.renderer.addClass(this.progressBar, 'progress-bar-striped');
    this.renderer.addClass(this.progressBar, 'active')
    this.renderer.setAttribute(this.progressBar, 'role', 'progressbar');
    this.renderer.setAttribute(this.progressBar, 'aria-valuenow', this.percentage + '');
    this.renderer.setAttribute(this.progressBar, 'aria-valuemin', '0');
    this.renderer.setAttribute(this.progressBar, 'aria-valuemax', '100');
    this.renderer.setAttribute(this.progressBar, 'style', 'width:' + this.percentage + '%');
    let text = this.renderer.createText(this.percentage + '%');
    this.renderer.appendChild(this.progressBar, text);
    this.renderer.appendChild(this.progress_bar.nativeElement, this.progressBar);


    this.http.withUploadProgressListener(progress => { 
      this.percentage = progress.percentage;    
      this.renderer.setAttribute(this.progressBar, 'style', 'width:' + this.percentage + '%');
      this.renderer.removeChild(this.progressBar, text);
      if(this.percentage < 100) {
        text = this.renderer.createText(this.percentage + '%');
        this.saveBtnDisabled = true;
      }
      else {
        text = this.renderer.createText('Uploading Done: ' + this.percentage + '%');
//        this.saveBtnDisabled = false;
      }
      this.renderer.appendChild(this.progressBar, text);
    })
      .post(this.url, body)
      .subscribe((resp) => console.log(resp));
  }
}
