import { Component, OnInit } from '@angular/core';

import{ VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-process-consulting',
  templateUrl: './process-consulting.component.html',
  styleUrls: ['./process-consulting.component.css']
})
export class ProcessConsultingComponent implements OnInit {

  numOfNewMessages: any;
  timer: any;
  mobile: string;

  selectedItem: number;

  constructor(private vjApi: VJAPI) { }

  ngOnInit() {
  	this.timer = setInterval(()=>{
  		this.getListOfMessages()
  	}, 1000);
  }

  ngOnDestroy() {
  	clearInterval(this.timer);
  }

  getListOfMessages()
  {
   	this.vjApi.checkNewMessages().subscribe((n) => {
 // 		console.log(n);
  		if(n.json().length > 0) {
  			this.numOfNewMessages = n.json();
  		}
  	}); 	
  }

  toChat(index) {
  	this.mobile = this.numOfNewMessages[index].mobile;
  //	console.log(this.mobile);
  	this.selectedItem = index;
  }
}
