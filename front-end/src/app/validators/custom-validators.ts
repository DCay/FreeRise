import { ValidatorFn, ValidationErrors, AbstractControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { OnDestroy } from "@angular/core";

export class CustomValidators implements OnDestroy {
    mustMatchChanges: Subscription;
    sameValueChanges: Subscription;

    ngOnDestroy() {
        if (this.mustMatchChanges) {
            this.mustMatchChanges.unsubscribe();
        }

        if (this.sameValueChanges) {
            this.sameValueChanges.unsubscribe();
        }
    }

    mustMatch(otherControlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {

            if (!control.parent) return null;
            const thisControl: AbstractControl = control;
            const otherControl: AbstractControl = control.parent.get(otherControlName);
            this.mustMatchChanges = otherControl.valueChanges.subscribe(() => thisControl.updateValueAndValidity());

            return thisControl.value !== otherControl.value ? { 'mustMatch': true } : null;
        };
    }

    valueHasNotChanged(): ValidatorFn {
        let valueHasNotChanged = {'valueHasNotChanged': true};
        return (control: AbstractControl): ValidationErrors | null => {
            control.valueChanges.subscribe(() => valueHasNotChanged = null);
            return valueHasNotChanged;
        }
    }
}