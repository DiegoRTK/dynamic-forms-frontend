import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="invalid-feedback d-block" *ngIf="control && control.invalid && (control.dirty || control.touched)">
      {{ getMessage() }}
    </div>
  `,
})
export class ValidationMessageComponent {
  @Input({ required: true }) control!: AbstractControl | null;
  @Input() label = 'Campo';

  getMessage(): string {
    if (!this.control?.errors) return '';

    if (this.control.hasError('required')) return `${this.label} es obligatorio.`;
    if (this.control.hasError('email')) return `${this.label} debe ser un correo válido.`;
    if (this.control.hasError('min')) return `${this.label} debe ser mayor o igual a ${this.control.errors['min'].min}.`;
    if (this.control.hasError('max')) return `${this.label} debe ser menor o igual a ${this.control.errors['max'].max}.`;
    if (this.control.hasError('minlength')) return `${this.label} debe tener mínimo ${this.control.errors['minlength'].requiredLength} caracteres.`;
    if (this.control.hasError('maxlength')) return `${this.label} debe tener máximo ${this.control.errors['maxlength'].requiredLength} caracteres.`;
    if (this.control.hasError('pattern')) return `${this.label} no tiene el formato esperado.`;

    return `${this.label} es inválido.`;
  }
}
