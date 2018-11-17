import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator } from '@angular/forms';

@Directive({
  selector: '[appMax]',
  providers: [{
  	provide: NG_VALIDATORS, 
  	useExisting: MaxValidatorDirective, 
  	multi: true}]
})
export class MaxValidatorDirective implements Validator {
//   @Input('appMax') maxValue: number;
 
  validate(control: AbstractControl): {[key: string]: any} | null {
    return Number(control.value) > 100 ? {'max': true}
                              : null;
  }

}

export function maxValidator(maxValue: number): ValidatorFn {
	return (control: AbstractControl): {[key: string]: any} | null => {
		console.log(control.value);
		if(control.value !== undefined && Number(control.value) > maxValue)
			return {'max': true};

		return null;
	}
}
