import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DynamicField, DynamicFormSchema } from '../models/dynamic-form.model';
import { DynamicValidatorsService } from './dynamic-validators.service';

@Injectable({ providedIn: 'root' })
export class DynamicFormBuilderService {
  constructor(private readonly validatorsService: DynamicValidatorsService) {}

  buildForm(schema: DynamicFormSchema): FormGroup {
    const group = new FormGroup({});

    this.getFields(schema).forEach((field) => {
      const validators = this.validatorsService.buildValidators(field.validators);
      const initialValue = field.value ?? this.getDefaultValue(field);

      group.addControl(
        field.key,
        new FormControl(
          {
            value: initialValue,
            disabled: Boolean(field.disabled),
          },
          validators,
        ),
      );
    });

    return group;
  }

  getFields(schema: DynamicFormSchema): DynamicField[] {
    return schema.sections.flatMap((section) => section.fields);
  }

  private getDefaultValue(field: DynamicField): string | number | boolean | null {
    if (field.type === 'number' || field.type === 'formula') return 0;
    return '';
  }
}
