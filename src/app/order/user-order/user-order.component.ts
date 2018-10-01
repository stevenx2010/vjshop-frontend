import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';

import { VJAPI } from '../../../services/vj.services';

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

  orderSerial: string;
  mobile: string;

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

  settings = {
      bigBanner: false,
      timePicker: true,
      format: 'dd-MM-yyyy',
      defaultOpen: false,
  }
     
  constructor(private vjApi: VJAPI) { }

  ngOnInit() {
  }

  query() {
    let body = this.prepareQueryData();

    this.vjApi.queryOrderByConditions(body).subscribe((o) => {
      console.log(o);
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
      'date1': this.dp.transform(this.date1, 'yyyy-MM-dd 00:00:00'),
      'date2': this.dp.transform(this.date2, 'yyyy-MM-dd 23:59:59')
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
  }

  keywordChanged() {
    if(this.keyword.length > 0) {s
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
}
