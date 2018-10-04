import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderDetailComponent } from '../order-detail/order-detail.component';

import { VJAPI } from '../../../services/vj.services';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {
  @ViewChild('o') o: ElementRef;
  @ViewChild('d') d: ElementRef;
  @ViewChild('i') i: ElementRef;
  @ViewChild('c') c: ElementRef;
  @ViewChild('checkbox') checkbox: ElementRef;

  orderSerial: string;
  mobile: string;
  orderId: number;

  date1: Date = new Date();
  date2: Date = new Date();
  dp: DatePipe = new DatePipe('en_US');


  orderStatus: number;
  deliveryStatus: number;
  invoiceStatus: number;
  commentStatus: number;

  keyword: string;

  orderSerialDisabled: boolean = false;
  mobileDisabled: boolean = false;
  keywordDisabled: boolean = false;
  queryByDate: boolean = false;

  settings = {
      bigBanner: false,
      timePicker: true,
      format: 'yyyy-MM-dd',
      defaultOpen: false,
  }
  
  orders: Order[];
  displayDetail: boolean = false;
  selectedOrder: number;
  iconDisabled: boolean = true;

  constructor(private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute) {
    this.orders = new Array<Order>(new Order());
  }
  

  ngOnInit() {
  }

  query() {
    this.displayDetail = false;
    this.iconDisabled = false;
    let body = this.prepareQueryData();

    this.vjApi.queryOrderByConditions(body).subscribe((o) => {
      this.orders = [];
      if(o.length > 0)
        this.orders = o;
    })
  }

  prepareQueryData() {
    let body = {
      'order_serial': this.orderSerial ? this.orderSerial : '',
      'mobile': this.mobile ? this.mobile : '',
      'order_status': this.orderStatus ? this.orderStatus : 0,
      'delivery_status': this.deliveryStatus ? this.deliveryStatus : 0,
      'invoice_status': this.invoiceStatus ? this.invoiceStatus : 0,
      'comment_status': this.commentStatus ? this.commentStatus : 0,
      'query_by_date': this.queryByDate,
      'date1': this.dp.transform(this.date1, 'yyyy-MM-dd 00:00:00'),
      'date2': this.dp.transform(this.date2, 'yyyy-MM-dd 23:59:59'),
      'keyword': this.keyword ? this.keyword.trim() : ''
    }

    return body;
  }

  orderStatusSelected(event) {
    this.orderStatus = event.target.value;
  }

  deliveryStatusSelected(event) {
    this.deliveryStatus = event.target.value;
  }

  invoiceStatusSelected(event) {
    this.invoiceStatus = event.target.value;
  }

  commentStatusSelected(event) {
    this.commentStatus = event.target.value;
  }

  orderSerialChanged() {
    if(this.orderSerial.length > 0) {
      this.mobileDisabled = true;
      this.keywordDisabled = true;
      this.o.nativeElement.value = 0;
      this.d.nativeElement.value = 0;
      this.i.nativeElement.value = 0;
      this.c.nativeElement.value = 0;
    } else {
      this.mobileDisabled = false;
      this.keywordDisabled = false;
    }
    this.checkbox.nativeElement.checked = false;
  }

  keywordChanged() {
    if(this.keyword.length > 0) {
      this.orderSerialDisabled = true;
    } else {
      this.orderSerialDisabled = false;
    }
  }

  mobileChanged() {
    if(this.mobile.length > 0) {
      this.orderSerialDisabled = true;
    } else {
      this.orderSerialDisabled = false;
    }
  }

  checkboxSelected(event) {
    this.queryByDate = !this.queryByDate;
    console.log(this.queryByDate);
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
}
