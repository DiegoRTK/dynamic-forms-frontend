export type DynamicFieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'date'
  | 'textarea'
  | 'select'
  | 'formula';

export interface DynamicFieldOption {
  label: string;
  value: string | number | boolean;
}

export interface DynamicFieldValidators {
  required?: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: string;
}

export interface DynamicField {
  key: string;
  label: string;
  type: DynamicFieldType;
  placeholder?: string;
  value?: string | number | boolean | null;
  readonly?: boolean;
  disabled?: boolean;
  validators?: DynamicFieldValidators;
  options?: DynamicFieldOption[];
  formula?: string;
  dependsOn?: string[];
  description?: string;
  cssClass?: string;
}

export interface DynamicFormSection {
  title: string;
  description?: string;
  fields: DynamicField[];
}

export interface DynamicFormSchema {
  id: number;
  code: string;
  name: string;
  description: string;
  version: string;
  sections: DynamicFormSection[];
}
