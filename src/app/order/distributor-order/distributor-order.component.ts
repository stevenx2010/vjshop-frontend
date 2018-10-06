import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { VJAPI } from '../../../services/vj.services';
import { Order } from '../../../models/order.model';
import { Distributor } from '../../../models/distributor.model';

@Component({
  selector: 'app-distributor-order',
  templateUrl: './distributor-order.component.html',
  styleUrls: ['./distributor-order.component.css']
})
export class DistributorOrderComponent implements OnInit {

  date1: Date = new Date();
  date2: Date = new Date();
  dp: DatePipe = new DatePipe('en_US');

  settings = {
      bigBanner: false,
      timePicker: true,
      format: 'yyyy-MM-dd',
      defaultOpen: false,
  }

  orderSerial: string;
  orders: Order[];
  orderId: number;

  queryByDate: boolean = false; 
  deliveryStatus: number;

  keyword: string;
  selectedOrder: number;

  displayDetail: boolean = false;  
  iconDisabled: boolean = true;
  orderSerialDisabled: boolean = true;
  keywordDisabled: boolean = true;
  queryBtnDisabled: boolean = true;

  distributors: Distributor[];
  searchText: string;
  tableDisplay: boolean = false;
  distributorName: string;
  distributorId: number;

  constructor(private vjApi: VJAPI) { 
  	this.orders = new Array<Order>(new Order());
    this.distributors = new Array<Distributor>(new Distributor());
  }

  ngOnInit() {
  }

  query() {
    this.iconDisabled = false;
    let body = this.prepareQueryData();
    this.vjApi.queryOderByConditionsForDistributor(body).subscribe((o) => {
      console.log(o);
      this.orders = [];
      if(o.length > 0) {
        this.orders = o;
      }
    })
  }

  prepareQueryData() {
    let body = {
      'distributor_id': this.distributorId,
      'order_serial': this.orderSerial ? this.orderSerial : '',
      'delivery_status': this.deliveryStatus ? this.deliveryStatus : 0,
      'query_by_date': this.queryByDate,
      'date1': this.dp.transform(this.date1, 'yyyy-MM-dd 00:00:00'),
      'date2': this.dp.transform(this.date2, 'yyyy-MM-dd 23:59:59'),
      'keyword': this.keyword ? this.keyword : ''
    }

    return body;
  }

  deliveryStatusSelected(event) {
    this.deliveryStatus = event.target.value;
    console.log(this.deliveryStatus);
  }

  checkboxSelected($event) {
    this.queryByDate = !this.queryByDate;
  }

  search() {

    this.vjApi.queryDistributorInfo(this.searchText).subscribe((data) => {
      this.distributors = [];
      console.log(data.json());
      if(data.json().length > 0) {

        this.distributors = data.json();
        this.tableDisplay = true;
      }
    }, (err) => {
      console.log(err.status);
    })
  }

  selected(event, i) {
    this.distributorName = this.distributors[i].name;
    this.distributorId = this.distributors[i].id;
    this.tableDisplay = false;
    this.orderSerialDisabled = false;
    this.keywordDisabled = false;
    this.queryBtnDisabled = false;
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
