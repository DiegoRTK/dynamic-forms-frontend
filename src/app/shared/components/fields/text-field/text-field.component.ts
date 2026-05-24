import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicField } from '../../../../core/models/dynamic-form.model';
import { ValidationMessageComponent } from '../../validation-message/validation-message.component';

@Component({
  selector: 'app-text-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './text-field.component.html',
})
export class TextFieldComponent {
  @Input({ required: true }) field!: DynamicField;
  @Input({ required: true }) form!: FormGroup;
}
