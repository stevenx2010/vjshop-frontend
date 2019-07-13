import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';

import { Md5 } from 'md5-typescript';

import { VJAPI } from '../../../services/vj.services';
import { Order } from '../../../models/order.model';
import { AccessLog } from '../../../models/access-log-model';

@Component({
  selector: 'app-order-price',
  templateUrl: './order-price.component.html',
  styleUrls: ['./order-price.component.css']
})
export class OrderPriceComponent implements OnInit {
  @ViewChild('price') price: ElementRef;

  orderSerial: string = '';
  btnSearchDisabled: boolean = true;
  orders: Order[] = [];
  orderId: number;
  totalPrice: number;
  newPrice: number;

  displayDetail: boolean = false;
  selectedOrder: number;
  iconDisabled: boolean = true;

  displayModification: boolean = false;
  btnModDisabled: boolean = true;

  username: string ='';
  email: string = '';

  date1: Date = new Date();
  date2: Date = new Date();

  settings = {
	  bigBanner: false,
	  timePicker: true,
	  format: 'yyyy-MM-dd',
	  defaultOpen: false,
  }

  dp: DatePipe = new DatePipe('en_US');

  queryByDate: boolean = false;

  accessLogs: AccessLog[] = [];

  constructor(private vjApi: VJAPI, private cs: CookieService) { }

  ngOnInit() {
  	this.username = this.cs.get('username');
  	this.email = this.cs.get('email');

  	console.log(this.email);
  }

  orderSerialChanged() {
  	if(this.orderSerial.length == 16) this.btnSearchDisabled = false;
  	else this.btnSearchDisabled = true;
  }

  clearModPart() {
  	this.orders = [];
	this.orderId = 0;
	this.totalPrice = 0;
	this.newPrice = 0;
	this.iconDisabled = true;
	this.displayModification = false;
	this.displayDetail = false;
  }

  search() {
  	this.accessLogs = [];

  	let body = {
  		'order_serial': this.orderSerial
  	}

  	this.vjApi.queryOrderByConditions(body).subscribe((data) => {
  		console.log(data);
  		if(data.length > 0) {
  			this.orders = data;
  			this.orderId = this.orders[0].id;
  			this.totalPrice = this.orders[0].total_price;
  			this.newPrice = this.totalPrice;
  			this.iconDisabled = false;
  			this.displayModification = true;
  		} else {
  			this.clearModPart();
  		}
  	});
  }

  toOrderDetail(index, dir) {
    if(!this.iconDisabled) {
      if(dir == 'down') this.displayDetail = true;
      else this.displayDetail = false;
      this.selectedOrder = index;

      this.orderId = this.orders[index].id;
      console.log(this.orderId);
    }
  }

  priceChanged(event) {
  	let regex = /^[0-9]+\.[0-9]{2}$/

  	let value = event.target.value;
  	if(regex.test(value)) {
  		this.btnModDisabled = false;
  	} else {
  		this.btnModDisabled = true;
  	}
  }

  modify() {
  	let body = {
  		'username': this.username,
  		'email': Md5.init(this.email),
  		'order_serial': this.orderSerial,
  		'order_id': Md5.init(this.orderId),
  		'old_price': Md5.init(this.totalPrice),
  		'new_price': this.newPrice,
  		'module_name': '订单管理 订单价格修改模块'
  	}

  	this.vjApi.changeOrderPrice(body).subscribe((data) => {
  		this.search();
  	});
  }

  checkboxSelected(event) {
    this.queryByDate = !this.queryByDate;
    console.log(this.queryByDate);
  }

  query() {
  	this.clearModPart();

  	let body = {
  		'query_by_date': this.queryByDate,
  		'date1': this.dp.transform(this.date1, 'yyyy-MM-dd 00:00:00'),
  		'date2': this.dp.transform(this.date2, 'yyyy-MM-dd 23:59:59') 
  	}

  	this.vjApi.queryOrderPriceChangeHistory(body).subscribe((data) => {
  		console.log(data);
  		if(data.length > 0) {
  			this.accessLogs = data;
  		} else {
  			this.accessLogs = [];
  		}
  	})
  }
}
