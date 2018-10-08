import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { MenuComponent } from './ui/menu/menu.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  images: string[];
  timer: any;
  currentImage: string;
  counter: number = 0;

  constructor() {
  	this.images = ['../assets/img/image01.jpg', '../assets/img/image02.jpg', '../assets/img/image03.jpg', 
  				'../assets/img/image04.jpg'];
  	this.currentImage = this.images[0];
   }

  ngOnInit() {
  	this.timer = setInterval(() => {
  		this.currentImage = this.images[this.counter];
  		this.counter++;
  		if(this.counter > 3) this.counter = 0;
  	}, 3000);
  }

  ngOnDestroy() {
  	clearInterval(this.timer);
  }

}
