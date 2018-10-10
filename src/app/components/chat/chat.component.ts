import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';
import { Message } from '../../../models/message.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @Input() mobile: string;
  @ViewChild('chat_area') chat_area: ElementRef;

  messages: Message[];
  message: string;
  timer: any;

  constructor(private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute, private cs: CookieService) { 
  	this.messages = new Array<Message>();
  }

  ngOnInit() {
  	this.timer = setInterval(() => {
  		this.getMessages();
  //		this.chat_area.nativeElement.scrollToBottom();
  	}, 1000);
  }

  ngOnDestroy() {
  	clearInterval(this.timer);
  }

  getMessages() {
   	if(this.mobile) {
	  	this.vjApi.getMessagesByMobile(this.mobile).subscribe((m) => {
//	  		console.log(m);
	  		if(m) {
	  			this.messages = m;
	  		}
	  	})
	} 	
  }

  send() {
  	let body = {
  		'mobile': this.mobile,
  		'message': this.message,
  		'responder': this.cs.get('username'),
  		'processed': true,
  		'who': 2

  	}

  	this.vjApi.sendMessage(body).subscribe((r) => {
  		//console.log(r);
  		this.message = '';
  		this.getMessages();
  	})
  }
}
