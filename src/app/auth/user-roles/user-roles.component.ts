import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { VJAPI } from '../../../services/vj.services';
import { User } from '../../../models/user.model';
import { UserRole } from '../../../models/user-role.model';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  @ViewChild('product') product: ElementRef;
  @ViewChild('distributor') distributor: ElementRef;
  @ViewChild('coupon') coupon: ElementRef;
  @ViewChild('order') order: ElementRef;
  @ViewChild('invoice') invoice: ElementRef;
  @ViewChild('page') page: ElementRef;
  @ViewChild('setting') setting: ElementRef;

  adminChecked: boolean = false;
  productManageChecked: boolean = false;
  distributorManageChecked: boolean = false;
  couponManageChecked: boolean = false;
  orderManageChecked: boolean = false;
  invoiceManageChecked: boolean = false;
  pageManageChecked: boolean = false;
  settingManageChecked: boolean = false;

  users: User[];
  role: UserRole;

  selectedItem: number;
  selectedUserId: number;
  displayRoles: boolean = false;

  constructor(private vjApi: VJAPI) { 
  	this.users = new Array<User>(new User());
  	this.role = new UserRole();
  }

  ngOnInit() {
  	this.getAllUsers();
  }

  getAllUsers() {
   	this.vjApi.getAllUsers().subscribe((u) => {
  		if(u.length > 0) {
  			console.log(u);
  			this.users = u;
  		}
  	}); 	
  }

  adminCheck(event) {
  	this.adminChecked = !this.adminChecked;
  }

  productManageCheck(event) {
  	this.productManageChecked = !this.productManageChecked;
  }

  distributorManageCheck(event) {
  	this.distributorManageChecked = !this.distributorManageChecked;
  }

  couponManageCheck(event) {
  	this.couponManageChecked = !this.couponManageChecked;
  }

  orderManageCheck(event) {
  	this.orderManageChecked = !this.orderManageChecked;
  }

  invoiceManageCheck(event) {
  	this.invoiceManageChecked = !this.invoiceManageChecked;
  }

  pageManageCheck(event) {
  	this.pageManageChecked = !this.pageManageChecked;
  }

  settingManageCheck(event) {
  	this.settingManageChecked = !this.settingManageChecked;
  }

  bitwise(a, b) {
  	return (a & b) ? 1 : 0;
  }

  select(index) {
  	this.selectedItem = index;
  	this.selectedUserId = this.users[index].id;
  	this.displayRoles = true;
  	this.syncRoles(this.users[index]);
  }

  save() {
  	let roles: number = 0;
  	if(this.adminChecked) roles |= this.role.ADMINISTRATOR;
  	if(this.productManageChecked) roles |= this.role.PRODUCT_MANAGER;
  	if(this.distributorManageChecked) roles |= this.role.DISTRIBUTOR_MANAGER;
  	if(this.couponManageChecked) roles |= this.role.COUPON_MANAGER;
  	if(this.orderManageChecked) roles |= this.role.ORDER_MANAGER;
  	if(this.invoiceManageChecked) roles |= this.role.INVOICE_MANAGER;
  	if(this.pageManageChecked) roles |= this.role.PAGE_MANAGER;
  	if(this.settingManageChecked) roles |= this.role.SETTING_MANAGER;



  	let body = {
  		'id': this.selectedUserId,
  		'roles': roles
  	}

  	this.vjApi.updateUserRoles(body).subscribe((resp) => {
  		console.log(resp);
  		this.users = [];
  		this.getAllUsers();
  	});

  }

  cancel() {
  	this.displayRoles = false;
  }

  syncRoles(user: User) {
  	this.adminChecked = this.bitwise(user.roles, this.role.ADMINISTRATOR) ? true : false;
  	this.productManageChecked = this.bitwise(user.roles, this.role.PRODUCT_MANAGER) ? true : false;
  	this.distributorManageChecked = this.bitwise(user.roles, this.role.DISTRIBUTOR_MANAGER) ? true: false;
  	this.couponManageChecked = this.bitwise(user.roles, this.role.COUPON_MANAGER) ? true : false;
  	this.orderManageChecked = this.bitwise(user.roles, this.role.ORDER_MANAGER) ? true : false;
  	this.invoiceManageChecked = this.bitwise(user.roles, this.role.INVOICE_MANAGER) ? true : false;
  	this.pageManageChecked = this.bitwise(user.roles, this.role.PAGE_MANAGER) ? true : false;
  	this.settingManageChecked = this.bitwise(user.roles, this.role.SETTING_MANAGER) ? true : false;
  }
}
