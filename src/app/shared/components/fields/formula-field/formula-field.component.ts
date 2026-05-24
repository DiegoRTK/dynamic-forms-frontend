import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicField } from '../../../../core/models/dynamic-form.model';
import { ValidationMessageComponent } from '../../validation-message/validation-message.component';

@Component({
  selector: 'app-formula-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './formula-field.component.html',
})
export class FormulaFieldComponent {
  @Input({ required: true }) field!: DynamicField;
  @Input({ required: true }) form!: FormGroup;
}
