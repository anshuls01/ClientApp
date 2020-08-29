import { AbstractControl, ValidatorFn } from '@angular/forms';

export class ExistIteminArrayValidators {

    static check(items: string[]): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean } | null => {
            let value: string = c.value.toString();
            let upperCaseArray: string[] = items.map(function (value) {
                return value.toUpperCase();
            });
            if (c.value && upperCaseArray.indexOf(value.toUpperCase()) >= 0) {

                return { 'exist': true };
            }
            return null;
        };
    }
}
