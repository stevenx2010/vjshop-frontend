import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ProcessConsultingComponent } from './process-consulting/process-consulting.component';

import { ComponentsModule } from '../components/components.module';
import { customerServiceRoutes } from './customer-service.routing';
import { QuestionAndAnswerComponent } from './question-and-answer/question-and-answer.component';
import { QuestionAndAnswerFormComponent } from './question-and-answer-form/question-and-answer-form.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    RouterModule.forChild(customerServiceRoutes),
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [ProcessConsultingComponent, QuestionAndAnswerComponent, QuestionAndAnswerFormComponent]
})
export class CustomerServiceModule { }
