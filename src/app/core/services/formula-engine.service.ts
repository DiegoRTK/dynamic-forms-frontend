import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { evaluate } from 'mathjs';
import { DynamicField } from '../models/dynamic-form.model';

@Injectable({
  providedIn: 'root'
})
export class FormulaEngineService {

  calculateAll(form: FormGroup, fields: DynamicField[]): void {
    const formulaFields = fields.filter(
      field => field.type === 'formula' && field.formula
    );

    const values = form.getRawValue();

    formulaFields.forEach(field => {
      const result = this.evaluateFormula(
        field.formula!,
        values
      );

      form.get(field.key)?.setValue(
        this.round(result),
        { emitEvent: false }
      );
    });
  }

  private evaluateFormula(
    formula: string,
    values: Record<string, unknown>
  ): number {
    try {
      const scope = Object.entries(values).reduce(
        (acc, [key, value]) => {
          acc[key] = Number(value) || 0;
          return acc;
        },
        {} as Record<string, number>
      );

      const result = evaluate(formula, scope);

      return Number(result) || 0;
    } catch {
      return 0;
    }
  }

  private round(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}