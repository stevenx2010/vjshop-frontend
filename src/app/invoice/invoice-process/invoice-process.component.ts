import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Order } from '../../../models/order.model';

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


  constructor() { 
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

  query(){

  }
}
