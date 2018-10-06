import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import{ VJAPI } from '../../../services/vj.services';
import { Invoice } from '../../../models/invoice.model';

@Component({
  selector: 'app-invoice-issue',
  templateUrl: './invoice-issue.component.html',
  styleUrls: ['./invoice-issue.component.css']
})
export class InvoiceIssueComponent implements OnInit {
  @Input() orderid: number = 0;
  @ViewChild('preview') preview: ElementRef;

  date: Date = new Date();
  dp: DatePipe = new DatePipe('en_US');
  settings = {
      bigBanner: false,
      timePicker: true,
      format: 'yyyy-MM-dd',
      defaultOpen: false,
  }

  invoiceImageFile: File;
  invoiceImage: any;
  invoice_id: number;

  form: FormGroup;

  invoice: Invoice;

  constructor(private vjApi: VJAPI, private renderer: Renderer2, private fb: FormBuilder) { 
  	this.form = this.fb.group({
  		invoice_number: ['', Validators.required],
  		invoice_amount: [0.00, Validators.compose([Validators.pattern('^[0-9]+[.][0-9]{2}$'), Validators.required])],
  		approved_by: [''],
  		audited_by: [''],
      issued_by: ['', Validators.required]
  	});

    this.invoice = new Invoice();
  }

  ngOnInit() {
  }

  previewInvoiceImage(event) {
    if(this.invoiceImage) {
      this.renderer.removeChild(this.preview.nativeElement, this.invoiceImage);
    }
    
  	if(event.target.files) {
  		this.invoiceImageFile = event.target.files[0];
  	}

  	let img = this.renderer.createElement('img');
    this.invoiceImage = img;
  	this.renderer.setAttribute(img, 'src', URL.createObjectURL(this.invoiceImageFile));
  	this.renderer.setAttribute(img, 'width', '200');
  	this.renderer.appendChild(this.preview.nativeElement, img);
  }

  prepareUpdateData() {
    let body = new FormData();

    if(this.invoice_id) {
      body.append('invoice_id', this.invoice_id + '');
    }

    if(this.orderid) {
      body.append('order_id', this.orderid + '');
    }

    body.append('invoice_number', this.form.get('invoice_number').value);
    console.log(this.form.get('invoice_number').value);
    body.append('invoice_amount', this.form.get('invoice_amount').value + '');
    body.append('audited_by', this.form.get('audited_by').value);
    body.append('approved_by', this.form.get('approved_by').value);
    body.append('issued_by', this.form.get('issued_by').value);
    body.append('date', this.dp.transform(this.date, 'yyyy-MM-dd HH:mm:ss'));
    if(this.invoiceImageFile) {
      body.append('image_file', this.invoiceImageFile);
    }

    return body;
  }

  update() {
    let body = this.prepareUpdateData();

    this.vjApi.updateInvoice(body).subscribe((resp) => {
      if(resp.json()) {
        this.invoice = resp.json();
        console.log(this.invoice);
        this.invoice_id = this.invoice.id;
        console.log(this.invoice_id);
      }
    })
  }
}
