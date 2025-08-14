import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  template: `
<div class="input-group">
  <label [for]="id">{{ label }}</label>
  <div class="input-container">
    <input 
      [type]="type === 'password' ? (showPassword ? 'text' : 'password') : type" 
      [id]="id" 
      [formControl]="control" 
      [attr.required]="required ? true : null" 
    />
    <span *ngIf="type === 'password'" class="eye-icon" (click)="togglePasswordVisibility()">
      <i class="pi" [ngClass]="showPassword ? 'pi-eye' : 'pi-eye-slash'"></i>
    </span>
  </div>
  <div *ngIf="control.invalid && control.touched">
    <p class="error" *ngIf="control.errors?.['required']">{{ label }} is required</p>
    <p class="error" *ngIf="control.errors?.['email']">Invalid {{ label }} format</p>
    <p class="error" *ngIf="control.errors?.['pattern']">Invalid {{ label }}</p>
  </div>
</div>
  `,
  styleUrls: ['./input.component.css'],
  imports: [ReactiveFormsModule, CommonModule], 
})
export class InputComponent {
  @Input() label!: string;
  @Input() id!: string;
  @Input() type: string = 'text';
  @Input() control!: FormControl;
  @Input() required: boolean = false;

  showPassword: boolean = false;
  timeoutId: any;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    clearTimeout(this.timeoutId);
    if (this.showPassword) {
      this.timeoutId = setTimeout(() => {
        this.showPassword = false;
      }, 3000);
    }
  }
}