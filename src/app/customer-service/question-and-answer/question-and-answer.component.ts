import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-question-and-answer',
  templateUrl: './question-and-answer.component.html',
  styleUrls: ['./question-and-answer.component.css']
})
export class QuestionAndAnswerComponent implements OnInit {

  selectedItem: number;
  qna: any;

  displayEdit: boolean = false;

  constructor(private vjApi: VJAPI, private router: Router, private actRoute: ActivatedRoute) { 
	this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      let obj:NavigationEnd = event;

 //     console.log(obj);
      let re1 = /\/customerservice\/qna\/add/;
      if(obj.url.search(re1)) {
        this.getQnA();
      }
    });
  }

  ngOnInit() {
  	this.getQnA();
  }

  ngAfterViewInit() {
  	this.getQnA();
  }

  getQnA() {
  	this.qna = [];
  	this.vjApi.getQnA().subscribe((q) => {
  		if(q.json().length > 0) {
  			this.qna = q.json();
 // 			console.log(q.json());
  		}
  	})  	
  }

  edit(index) {
  	this.selectedItem = index;
    console.log(this.qna[index]);
    this.router.navigate(['edit/' + this.qna[index].id], { relativeTo: this.actRoute});
  }

  delete(index) {
  	this.selectedItem = index;
  }

  deleteConfirmed() {
  	this.vjApi.deleteQnA(this.qna[this.selectedItem].id).subscribe((resp) => console.log(resp));
  	this.getQnA();
  }

  add() {
  	this.router.navigate(['add'], { relativeTo: this.actRoute});
  }
}
