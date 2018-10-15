import { Component, OnInit } from '@angular/core';
import { ASSETS_BASE_URL } from '../models/constants';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  assetsBaseUrl: string;

  constructor() { 
  		this.assetsBaseUrl = ASSETS_BASE_URL;
  }

  ngOnInit() {
  }

}
