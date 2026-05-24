import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicField, DynamicFormSchema } from '../../core/models/dynamic-form.model';
import { DynamicFormBuilderService } from '../../core/services/dynamic-form-builder.service';
import { DynamicFormsApiService } from '../../core/services/dynamic-forms-api.service';
import { FormulaEngineService } from '../../core/services/formula-engine.service';
import { DateFieldComponent } from '../../shared/components/fields/date-field/date-field.component';
import { EmailFieldComponent } from '../../shared/components/fields/email-field/email-field.component';
import { FormulaFieldComponent } from '../../shared/components/fields/formula-field/formula-field.component';
import { NumberFieldComponent } from '../../shared/components/fields/number-field/number-field.component';
import { SelectFieldComponent } from '../../shared/components/fields/select-field/select-field.component';
import { TextFieldComponent } from '../../shared/components/fields/text-field/text-field.component';
import { TextareaFieldComponent } from '../../shared/components/fields/textarea-field/textarea-field.component';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFieldComponent,
    NumberFieldComponent,
    EmailFieldComponent,
    DateFieldComponent,
    FormulaFieldComponent,
    TextareaFieldComponent,
    SelectFieldComponent,
  ],
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  public schema?: DynamicFormSchema;
  public dynamicForm: FormGroup = new FormGroup({});
  public submittedData?: Record<string, unknown>;
  public isLoading = true;
  public errorMessage = '';

  private fields: DynamicField[] = [];
  private formSubscription?: Subscription;

  constructor(
    private readonly apiService: DynamicFormsApiService,
    private readonly formBuilderService: DynamicFormBuilderService,
    private readonly formulaEngineService: FormulaEngineService,
  ) {}

  ngOnInit(): void {
    this.loadForm();
  }

  ngOnDestroy(): void {
    this.formSubscription?.unsubscribe();
  }

  public submit(): void {
    this.dynamicForm.markAllAsTouched();

    if (this.dynamicForm.invalid) return;

    this.submittedData = this.dynamicForm.getRawValue();
  }

  public resetForm(): void {
    if (!this.schema) return;

    this.dynamicForm = this.formBuilderService.buildForm(this.schema);
    this.listenFormChanges();
    this.formulaEngineService.calculateAll(this.dynamicForm, this.fields);
    this.submittedData = undefined;
  }

  private loadForm(): void {
    this.apiService.getFormById(1).subscribe({
      next: (schema) => {
        this.schema = schema;
        this.fields = this.formBuilderService.getFields(schema);
        this.dynamicForm = this.formBuilderService.buildForm(schema);
        this.listenFormChanges();
        this.formulaEngineService.calculateAll(this.dynamicForm, this.fields);
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'No fue posible cargar el formulario dinámico.';
        this.isLoading = false;
      },
    });
  }

  private listenFormChanges(): void {
    this.formSubscription?.unsubscribe();

    this.formSubscription = this.dynamicForm.valueChanges.subscribe(() => {
      this.formulaEngineService.calculateAll(this.dynamicForm, this.fields);
    });
  }
}
