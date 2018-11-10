import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { VJAPI } from '../../../services/vj.services';

@Component({
  selector: 'app-question-and-answer-form',
  templateUrl: './question-and-answer-form.component.html',
  styleUrls: ['./question-and-answer-form.component.css']
})
export class QuestionAndAnswerFormComponent implements OnInit {
  form: FormGroup;
  formFunction: string = 'add';
  qId: number ;
  question: any;

  constructor(private vjApi: VJAPI, private fb: FormBuilder, private router: Router, private actRoute: ActivatedRoute) { 
    console.log(this.actRoute.snapshot.params);
    this.qId = this.actRoute.snapshot.params['q'];
    if(this.qId) {
      this.formFunction = 'edit';

      this.vjApi.getQnAById(this.qId).subscribe((q) => {
        console.log(q.json());
        if(q.json().length > 0) {
          this.question = (q.json())[0];
          this.form.controls.question.setValue(this.question.question);
          this.form.controls.answer.setValue(this.question.answer);
        }
      });   
    }
  }

  ngOnInit() {
  	this.form = this.fb.group({
  		question: ['', Validators.required],
  		answer: ['', Validators.required]
  	})
  }

  submit() {
  	let body = {
      'id': this.qId,
  		'question': this.form.get('question').value,
  		'answer': this.form.get('answer').value
  	}

  	this.vjApi.updateQnA(body).subscribe((resp) => {
 // 		console.log(resp)
  		if(this.formFunction == 'edit') {
      this.router.navigate(['../../'], {relativeTo: this.actRoute});
    } else {
      this.router.navigate(['../'], {relativeTo: this.actRoute});
    }
  	});
  }

  cancel() {
    if(this.formFunction == 'edit') {
      this.router.navigate(['../../'], {relativeTo: this.actRoute});
    } else {
  	  this.router.navigate(['../'], {relativeTo: this.actRoute});
    }
  }
}
