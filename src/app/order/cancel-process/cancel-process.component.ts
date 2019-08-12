import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Order } from '../../../models/order.model';
import { Refund } from '../../../models/refund.model';

import  { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-cancel-process',
  templateUrl: './cancel-process.component.html',
  styleUrls: ['./cancel-process.component.css']
})
export class CancelProcessComponent implements OnInit {

  @ViewChild('checkbox') checkbox: ElementRef;
  orderSerial: string;
  mobile: string;
  orderId: number;
  keyword: string;
  queryByDate: boolean =false;
  orders: Order[];


  date: Date = new Date();
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
  refundBtnDisabled: boolean = true;
  refundDisplay: boolean = false;

  refundBtnText: string = '去退单';

  form: FormGroup;
  refundId: number;
  refunds: Refund[];

  constructor(private vjApi: VJAPI, private fb: FormBuilder) { 
  	this.orders = new Array<Order>(new Order());
    this.refunds = new Array<Refund>(new Refund());
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		refund_status: ['1', Validators.required],
  		refund_reason: ['', Validators.required],
  		refund_amount: [0.00, Validators.compose([Validators.required, Validators.pattern('^[0-9]+[.][0-9]{2}$')])],
  		approved_by: ['', Validators.required],
  		audited_by: []
  	});
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

  toProcessRefund(index) {
    this.orderId = this.orders[index].id;
    
    // fill the form with previous data
    this.getRefundInfo(this.orderId);

    this.selectedOrder = index;
    this.refundDisplay = !this.refundDisplay;
    this.refundBtnText = this.refundDisplay ? '关闭退单' : '去退单';
    if(!this.refundDisplay) this.query();
  }

  getRefundInfo(orderId) {
    this.refunds = [];
    this.vjApi.getRefundByOrderId(orderId).subscribe((r) => {
      console.log(r);
      if(r.length > 0) {
        this.refunds = r;

        // fill the form
        this.form.controls.refund_status.setValue(this.refunds[0].refund_status + '');
        this.form.controls.refund_reason.setValue(this.refunds[0].refund_reason);
        this.form.controls.refund_amount.setValue(this.refunds[0].refund_amount);
        this.form.controls.approved_by.setValue(this.refunds[0].approved_by);
        this.form.controls.audited_by.setValue(this.refunds[0].audited_by);

        this.date = new Date(this.refunds[0].refund_date);
      } else {
        this.form.controls.refund_status.setValue('1');
        this.form.controls.refund_reason.setValue('');
        this.form.controls.refund_amount.setValue(this.orders[this.selectedOrder].total_price);
        this.form.controls.approved_by.setValue('');
        this.form.controls.audited_by.setValue('');   

        this.date = new Date();     
      }
    })
  } 

  query() {
    this.displayDetail = false;
    this.iconDisabled = false;
    let body = this.prepareQueryData();

    this.vjApi.queryOrderByConditions(body).subscribe((o) => {
      this.orders = [];
      if(o.length > 0) {
        this.orders = o;
        this.refundBtnDisabled = false;
      }
    })
  }

  prepareQueryData() {
    let body = {
      'order_serial': this.orderSerial ? this.orderSerial : null,
      'mobile': this.mobile ? this.mobile : null,
      'query_by_date': this.queryByDate,
      'date1': this.dp.transform(this.date1, 'yyyy-MM-dd 00:00:00'),
      'date2': this.dp.transform(this.date2, 'yyyy-MM-dd 23:59:59'),
      'keyword': this.keyword ? this.keyword.trim() : '',
      'refund_process': true
    }

    return body;
  }

  prepareFormData() {
  	let body = new FormData();
  	if(this.refundId) {
  		body.append('refund_id', this.refundId + '');
  	}

  	body.append('order_id', this.orderId + '');
    body.append('refund_status', this.form.get('refund_status').value);
    body.append('refund_reason', this.form.get('refund_reason').value);
    body.append('refund_amount', this.form.get('refund_amount').value);
    body.append('refund_date', this.dp.transform(this.date, 'yyyy-MM-dd hh:mm:ss'));
    body.append('approved_by', this.form.get('approved_by').value);
    body.append('audited_by', this.form.get('audited_by').value);

    return body;
  }

  save() {
    let body = this.prepareFormData();
    
    this.vjApi.updateRefundInfo(body).subscribe((resp) => {
      console.log(resp);
      this.query();
    })
  }


  keywordChanged() {
    if(this.keyword.length > 0) {
      this.orderSerialDisabled = true;
    } else {
      this.orderSerialDisabled = false;
    }
  }
}
