import { Component, OnInit, HostListener } from '@angular/core';
import { ASSETS_BASE_URL } from '../models/constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styles: []
})
export class AboutComponent implements OnInit {
  assetsBaseUrl: string;

  pictureWidth: number;

  constructor() { 
    this.assetsBaseUrl = ASSETS_BASE_URL;
    this.resizePicture();
  }

  ngOnInit() {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.resizePicture();
  }

  resizePicture() {
    if(window.innerWidth <= 1340) {
      this.pictureWidth = 300 * (window.innerWidth / 1500); 
    } else {
      this.pictureWidth = 300;
    }  
  }
}
