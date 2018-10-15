import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Order } from '../../../models/order.model';

import  { VJAPI } from '../../../services/vj.services';


@Component({
  selector: 'app-invoice-process',
  templateUrl: './invoice-process.component.html',
  styleUrls: ['./invoice-process.component.css']
})
export class InvoiceProcessComponent implements OnInit {
  @ViewChild('checkbox') checkbox: ElementRef;
  orderSerial: string;
  mobile: string;
  orderId: number;
  keyword: string;
  queryByDate: boolean =false;
  orders: Order[];


  date1: Date = new Date();
  date2: Date = new Date();
  dp: DatePipe = new DatePipe('en_US');
  settings = {
      bigBanner: false,
      timePicker: true,
      format: 'yyyy-MM-dd',
      defaultOpen: false,
  }

  orderSerialDisabled: boolean = false;
  mobileDisabled: boolean = false;
  keywordDisabled: boolean = false;
  iconDisabled: boolean = true;
  displayDetail: boolean = false;
  selectedOrder: number;
  invoiceBtnDisabled: boolean = true;
  invoiceDisplay: boolean = false;

  invoiceBtnText: string = '去开票';


  constructor(private vjApi: VJAPI) { 
  	this.orders = new Array<Order>(new Order());
  }

  ngOnInit() {
  }

  orderSerialChanged() {
    if(this.orderSerial.length > 0) {
      this.mobileDisabled = true;
      this.keywordDisabled = true;
    } else {
      this.mobileDisabled = false;
      this.keywordDisabled = false;
    }
    this.checkbox.nativeElement.checked = false;
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

  toIssueInvoice(index) {
    this.orderId = this.orders[index].id;
    this.selectedOrder = index;
    this.invoiceDisplay = !this.invoiceDisplay;
    this.invoiceBtnText = this.invoiceDisplay ? '关闭开票' : '去开票';
    if(!this.invoiceDisplay) this.query();
  }

query() {
    this.displayDetail = false;
    this.iconDisabled = false;
    let body = this.prepareQueryData();

    this.vjApi.queryOrderByConditions(body).subscribe((o) => {
      this.orders = [];
      if(o.length > 0) {
        this.orders = o;
        this.invoiceBtnDisabled = false;
      }
    })
  }

  prepareQueryData() {
    let body = {
      'order_serial': this.orderSerial ? this.orderSerial : '',
      'mobile': this.mobile ? this.mobile : '',
      'query_by_date': this.queryByDate,
      'date1': this.dp.transform(this.date1, 'yyyy-MM-dd 00:00:00'),
      'date2': this.dp.transform(this.date2, 'yyyy-MM-dd 23:59:59'),
      'keyword': this.keyword ? this.keyword.trim() : '',
      'invoice_required': true
    }

    return body;
  }

  keywordChanged() {
    if(this.keyword.length > 0) {
      this.orderSerialDisabled = true;
    } else {
      this.orderSerialDisabled = false;
    }
  }
}
