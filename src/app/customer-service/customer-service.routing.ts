import { Routes } from '@angular/router';

import { ProcessConsultingComponent } from './process-consulting/process-consulting.component';
import { QuestionAndAnswerComponent } from './question-and-answer/question-and-answer.component';
import { QuestionAndAnswerFormComponent } from './question-and-answer-form/question-and-answer-form.component';

export const customerServiceRoutes: Routes = [
	{ path: 'customerservice/process', component: ProcessConsultingComponent },
	{ path: 'customerservice/qna', component: QuestionAndAnswerComponent,
		children: [
			{path: 'add', component: QuestionAndAnswerFormComponent},
			{path: 'edit/:q', component: QuestionAndAnswerFormComponent}
		]
	 }
];