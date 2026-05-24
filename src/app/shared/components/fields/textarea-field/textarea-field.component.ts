import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicField } from '../../../../core/models/dynamic-form.model';
import { ValidationMessageComponent } from '../../validation-message/validation-message.component';

@Component({
  selector: 'app-textarea-field',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ValidationMessageComponent],
  templateUrl: './textarea-field.component.html',
})
export class TextareaFieldComponent {
  @Input({ required: true }) field!: DynamicField;
  @Input({ required: true }) form!: FormGroup;
}
