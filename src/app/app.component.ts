import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '稳卓商城管理后台';
  cookie: any;
  displayHome: boolean = false;
  loggedIn: boolean = false;

  username: string;
  lastLogin: string;
  imageUrl: string;
  email: string;

  constructor(private router: Router, private actRoute: ActivatedRoute, private cs: CookieService) {

  	this.cookie = this.cs.get('api_token');
  	if(!this.cookie) {
      this.loggedIn = false;
      this.router.navigate(['home']);
  	} else {
      this.loggedIn = true;


    }
  }

  checkLogin(event) {
    this.loggedIn = event;

    this.username = this.cs.get('username');
    this.lastLogin = this.cs.get('last_login');
    this.imageUrl = this.cs.get('image_url');
    this.email = this.cs.get('email');
  }
}
