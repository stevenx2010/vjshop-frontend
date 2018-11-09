import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ProgressHttp } from 'angular-progress-http';

import { VJAPI } from '../../../services/vj.services';
import { API_BASE_URL } from '../../../models/constants';

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
  @ViewChild('preview_video') preview_video: ElementRef;
  @ViewChild('preview_poster') preview_poster: ElementRef;
  @ViewChild('progress_bar') progress_bar: ElementRef;

  topImageFiles: File[];
  newcomerImageFile: File;
  couponImageFile: File;
  bottomImageFiles: File[];
  videoFile: File;
  posterImageFile: File;

  topImages: any[];
  newcomerImage: any;
  couponImage: any;
  bottomImages: any[];
  videoClip: any;
  posterImage: any;

  numOfTopImages: number = 0;
  numOfBottomImages: number = 0;

  saveBtnDisabled: boolean = false;

  url: string = API_BASE_URL + 'api/front/page/homepage/update';
  progressBar: any;
  percentage: number = 0;
  videoWidth: number;

  constructor(private vjApi: VJAPI, private renderer: Renderer2, private http: ProgressHttp) { 
  	this.topImageFiles = new Array<File>();
  	this.bottomImageFiles = new Array<File>();

  	this.topImages = new Array<any>();
  	this.bottomImages = new Array<any>();
  }

  ngOnInit() {
    this.resizeVideo();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizeVideo();
  }

  preview(event, position) {
  	switch(position) {
  		case 'top':
  			// remove previously selected images
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
  			// remove previously selected images
  			if(this.newcomerImage) {
  				this.renderer.removeChild(this.preview_newcomer.nativeElement, this.newcomerImage);
  				this.newcomerImage = null;
  			}

  			if(event.target.files) {
  				this.newcomerImageFile = event.target.files[0];
  			}
  			break;

  		case 'coupon':
  			// remove previously selected images
  			if(this.couponImage) {
  				this.renderer.removeChild(this.preview_coupon.nativeElement, this.couponImage);
  				this.couponImage = null;
  			}

  			if(event.target.files) {
  				this.couponImageFile = event.target.files[0];
  			}
  			break;

  		case 'bottom':
  			// remove previously selected images
  			if(this.bottomImages.length) {
  				for(let i = this.bottomImages.length - 1; i >= 0; i--) {
  					this.renderer.removeChild(this.preview_bottom.nativeElement, this.bottomImages[i]);
  					this.bottomImages.pop();
  				}
  			}
  			if(event.target.files) {
  				this.bottomImageFiles = event.target.files;
  			}
        break;

      case 'video':
        // remove previously selected video
        if(this.videoClip) {
          this.renderer.removeChild(this.preview_video.nativeElement, this.videoClip);
          this.videoClip = null;
        }
        if(event.target.files) {
          this.videoFile = event.target.files[0];
        }
      break;

      case 'poster':
        // remove previously selected video
        if(this.posterImage) {
          this.renderer.removeChild(this.preview_poster.nativeElement, this.posterImage);
          this.posterImage = null;
        }
        if(event.target.files) {
          this.posterImageFile = event.target.files[0];
        }
      break;      
    }
      
    if(this.progressBar) {
      this.renderer.removeChild(this.progress_bar.nativeElement, this.progressBar);
      this.progressBar = null;
      this.percentage = 0;
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
            case 'video':
              const video = this.renderer.createElement('video');
              this.renderer.setAttribute(video, 'controls', 'controls');
              this.renderer.setAttribute(video, 'preload', 'metadata');
              this.renderer.setAttribute(video, 'autoplay', 'autoplay');
              this.renderer.setAttribute(video, 'width', this.videoWidth + '');

              const videoSource = this.renderer.createElement('source');
              this.renderer.setAttribute(videoSource, 'src', URL.createObjectURL(event.target.files[i]));
              this.renderer.setAttribute(videoSource, 'type', 'video/mp4');

              this.renderer.appendChild(video, videoSource);
              this.renderer.appendChild(this.preview_video.nativeElement, video);

              this.videoClip = video;

              if(this.posterImage == null) {
                this.saveBtnDisabled = true;
              } else {
                this.saveBtnDisabled = false;
              }
              break;
            case 'poster':
              this.renderer.appendChild(this.preview_poster.nativeElement, img);
              this.posterImage = img;

              if(this.videoClip == null) {
                this.saveBtnDisabled = true;
              } else {
                this.saveBtnDisabled = false;
              }
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

    if(this.videoFile) {
      body.append('video_clip', this.videoFile);
    }

    if(this.posterImage) {
      body.append('poster_image', this.posterImageFile);
    }

  	body.append('num_top_images', this.numOfTopImages + '');
  	body.append('num_bottom_images', this.numOfBottomImages + '');

  	return body;
  }

  save() {
  	let body = this.prepareUpdateData();

  	//this.vjApi.updateHomePageImages(body).subscribe((resp) => { console.log(resp)});
    this.updateHomePageImagesWithProgressHttp(body);
  }

  deleteConfirmed() {
    this.vjApi.deleteVideoOnHomePage().subscribe((resp) => console.log(resp));
  }

  updateHomePageImagesWithProgressHttp(body) {
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
      if(this.percentage < 100)
        text = this.renderer.createText(this.percentage + '%');
      else
        text = this.renderer.createText('Uploading Done: ' + this.percentage + '%');
      this.renderer.appendChild(this.progressBar, text);
    })
      .post(this.url, body)
      .subscribe((resp) => console.log(resp));
  }

  resizeVideo() {
    if(window.innerWidth <= 1340) {
      this.videoWidth = 960 * (window.innerWidth / 1500); 
    } else {
      this.videoWidth = 960;
    }  
  }
}
