import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { DynamicFieldValidators } from '../models/dynamic-form.model';

@Injectable({ providedIn: 'root' })
export class DynamicValidatorsService {
  buildValidators(config?: DynamicFieldValidators): ValidatorFn[] {
    const validators: ValidatorFn[] = [];

    if (!config) return validators;

    if (config.required) validators.push(Validators.required);
    if (config.min !== undefined) validators.push(Validators.min(config.min));
    if (config.max !== undefined) validators.push(Validators.max(config.max));
    if (config.minLength !== undefined) validators.push(Validators.minLength(config.minLength));
    if (config.maxLength !== undefined) validators.push(Validators.maxLength(config.maxLength));
    if (config.email) validators.push(Validators.email);
    if (config.pattern) validators.push(Validators.pattern(config.pattern));

    return validators;
  }
}
