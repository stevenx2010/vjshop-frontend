import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { API_BASE_URL } from '../../../models/constants';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})

export class OrderDetailComponent implements OnInit {

  @Input() orderid: number = 0;
  orderDetail: any;
  customer: any;
  shippingAddress: any;
  products: any;
  distributor: any;
  distributorAddress: any;
  distributorContact: any;

  baseUrl: string = API_BASE_URL;

  constructor(private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute) { 
  	this.orderid = this.actRoute.snapshot.params['id'];
  	console.log(this.actRoute.snapshot.url);
  }

  ngOnInit() {}

  ngOnChanges() {
  	if(this.orderid) {
	  	this.vjApi.queryOrderDetailByOrderId(this.orderid).subscribe((d) => {
	  		this.orderDetail = d.json();

	  		if(this.orderDetail) {
	  			let customer = this.orderDetail.customer;
	  			if(customer.length > 0) {
	  				this.customer = customer[0];
	  			}
	  			
	  			let shippingAddress = this.orderDetail.shipping_address;
	  			if(shippingAddress.length > 0) {
	  				this.shippingAddress = shippingAddress[0];
	  			}

	  			let products = this.orderDetail.products;
	  			if(products.length > 0) {
	  				this.products = products;
	  			}

	  			let distributor = this.orderDetail.distributor;
	  			if(distributor.length > 0) {
	  				this.distributor = distributor[0];
	  			}

	  			let distributorAddress = this.orderDetail.distributor_address;
	  			if(distributorAddress.length > 0) {
	  				this.distributorAddress = distributorAddress[0];
	  			}

	  			let distributorContact = this.orderDetail.distributor_contact;
	  			if(distributorContact.length > 0) {
	  				this.distributorContact = distributorContact[0];
	  			}
	  		}
	  	});
	  }
  }

}
