import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { TelAreaCode } from '../../../models/chinese-tel-area-code';

@Component({
  selector: 'app-distributor-contact-form',
  templateUrl: './distributor-contact-form.component.html',
  styleUrls: ['./distributor-contact-form.component.css']
})
export class DistributorContactFormComponent implements OnInit {
  @ViewChild('area') area: ElementRef;
  form: FormGroup;
  areaCode: any[];
  isDefaultContact: boolean = true;
  distributorId: number;
  contactId: number;

  sub: any;
  code: string;

  formFunction: string = 'add';
  caption: string = '增加联系人';
  upperLink: string;

  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private router: Router, private vjApi: VJAPI) { 
  	this.areaCode = new Array<any>();

  	this.areaCode = TelAreaCode.areaCode;

  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('^1[0-9]{10}$')])],
      phoneAreaCode: [''],
      tel: ['', Validators.pattern('^[1-9][0-9]{7}$')]
    });

    this.sub = this.actRoute.params.subscribe((params) => {
  		this.distributorId = +params['id'];
      this.contactId = +params['contactId'];

      if(this.contactId) {
        this.formFunction = 'edit';
        this.caption = '编辑联系人';
        this.upperLink = '/distributor/edit/' + this.distributorId;

        this.vjApi.queryDistributorContactById(this.contactId).subscribe((c) => {
          if(c.json().length > 0) {
            let contact = c.json();
            this.form.controls['name'].setValue(contact[0].name);
            this.form.controls['mobile'].setValue(contact[0].mobile);
            this.form.controls['tel'].setValue(contact[0].telephone);
            this.isDefaultContact = contact[0].default_contact;

            let k = 0;
            while(k < this.areaCode.length) {
              if(this.areaCode[k].value == contact[0].phone_area_code) break;
              k++;
            }

            this.area.nativeElement.selectedIndex = k;
            this.form.controls['phoneAreaCode'].setValue(this.areaCode[k].value);
          }
      });
      }
  	});
  }

  ngOnDestroy() {
  	this.sub.unsubscribe();
  }

  onChkBoxChange(event) {
  	this.isDefaultContact = event.target.checked;
  }

  selectCode(event) {
  	this.code =  event.target.value;
  }

  save() {
  	let body = {
      "id": this.contactId,
  		"name": this.form.get('name').value,
  		"mobile": this.form.get('mobile').value,
  		"phone_area_code": this.code || '',
  		"telephone": this.form.get('tel').value || '',
  		"distributor_id": this.distributorId,
  		"default_contact": this.isDefaultContact
  	}

  	this.vjApi.updateDistributorContact(JSON.stringify(body)).subscribe((data) => {

      if(this.formFunction == 'edit') {
        this.router.navigate(['distributor/edit/' + this.distributorId]);
      } else
  		  this.router.navigate(['../../'], {relativeTo: this.actRoute});
  	})
  		
  }
}
