import { Component } from '@angular/core';
import { DynamicFormComponent } from './pages/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <main class="app-shell">
      <app-dynamic-form />
    </main>
  `,
})
export class AppComponent {}
