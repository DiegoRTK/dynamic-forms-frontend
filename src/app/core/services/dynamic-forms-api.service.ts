import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicFormSchema } from '../models/dynamic-form.model';

@Injectable({ providedIn: 'root' })
export class DynamicFormsApiService {
  private readonly apiUrl = 'http://localhost:3000/api/forms';

  constructor(private readonly http: HttpClient) {}

  getFormById(id: number): Observable<DynamicFormSchema> {
    return this.http.get<DynamicFormSchema>(`${this.apiUrl}/${id}`);
  }
}
