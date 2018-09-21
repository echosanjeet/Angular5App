import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
    selector: '[appConfirmEqualValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ConfirmEqualValidatorDirective,
        multi: true
    }]
})
export class ConfirmEqualValidatorDirective implements Validator
{
    validate(passwordGroup: AbstractControl): { [key: string]: any } | null 
    {
        const passwordFeild = passwordGroup.get('password');
        const confirmPasswordFeild = passwordGroup.get('confirmPassword');

        return passwordFeild && confirmPasswordFeild && passwordFeild.value !== confirmPasswordFeild.value ? { 'notEqual': true} : null;
    }
}