import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { API_BASE_URL } from '../../../models/constants';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input() username: string;
  @Input() lastLogin: string;
  @Input() imageUrl: string;

  count: number;
  timer: any;
  baseUrl: string;

  constructor(private router: Router, private vjApi: VJAPI) { 
    this.baseUrl = API_BASE_URL;
  }

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

  toCouponType() {
    this.router.navigate(['coupon/type']);
  }

  toCoupon() {
    this.router.navigate(['coupon']);
  }

  toCouponAdd() {
    this.router.navigate(['coupon/add']);
  }

  toUserOrder() {
    this.router.navigate(['order/user/query']);
  }

  toDistributorOrder() {
    this.router.navigate(['order/distributor/query']);
  }

  toInvoiceProcess() {
    this.router.navigate(['invoice/process']);
  }

  toInvoiceQuery() {
    this.router.navigate(['invoice/query']);
  }

  toOrderCancelProcess() {
    this.router.navigate(['order/cancel/process']);
  }

  toOrderCancelQuery() {
    this.router.navigate(['order/cancel/query']);
  }

  toHomePage() {
    this.router.navigate(['page/homepage']);
  }

  toNewComerPage() {
    this.router.navigate(['page/newcomerpage']);
  }

  toProcessConsulting() {
    this.router.navigate(['customerservice/process']);
  }

  toQandA() {
    this.router.navigate(['customerservice/qna']);
  }

  toCreateNewUser() {
    this.router.navigate(['auth/new-user']);
  }

  toManageUser() {
    this.router.navigate(['auth/manage-user']);
  }

  toAssignRoles() {
    
  }

  toLogin() {
    this.router.navigate(['auth/login']);
  }

  toDashboard() {
    this.router.navigate(['home']);
  }
}
