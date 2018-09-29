import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


  toProductCategory() {
  	this.router.navigate(['product/category']);
  }

  toProductSubCategory() {
  	this.router.navigate(['product/subcategory']);
  }

  toProduct() {
  	this.router.navigate(['product/product']);
  }

  toProductAdd() {
  	this.router.navigate(['product/product/add']);
  }

  toDistributor() {
    this.router.navigate(['distributor']);
  }

  toDistributorAdd() {
    this.router.navigate(['distributor/add/1']);
  }

  toDistributorInventory() {
    this.router.navigate(['distributor/inventory']);
  }
}
