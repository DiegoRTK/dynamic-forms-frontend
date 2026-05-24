import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicField } from '../models/dynamic-form.model';

@Injectable({ providedIn: 'root' })
export class FormulaEngineService {
  calculateAll(form: FormGroup, fields: DynamicField[]): void {
    const formulaFields = fields.filter((field) => field.type === 'formula' && field.formula);

    formulaFields.forEach((field) => {
      const result = this.evaluate(field.formula ?? '', form.getRawValue());
      form.get(field.key)?.setValue(this.round(result), { emitEvent: false });
    });
  }

  private evaluate(formula: string, values: Record<string, unknown>): number {
    try {
      const sanitizedValues = Object.entries(values).reduce<Record<string, number>>((acc, [key, value]) => {
        acc[key] = Number(value) || 0;
        return acc;
      }, {});

      const keys = Object.keys(sanitizedValues);
      const args = keys.map((key) => sanitizedValues[key]);
      const fn = new Function(...keys, `return ${formula};`);
      const result = Number(fn(...args));

      return Number.isFinite(result) ? result : 0;
    } catch {
      return 0;
    }
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}
