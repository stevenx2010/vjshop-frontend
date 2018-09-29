import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'vjshop-frontend';

  constructor(private router: Router) {

  }

  toProductCategory() {
  	this.router.navigate(['product/category']);
  }
}
