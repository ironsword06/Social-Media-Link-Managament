import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-form',
  standalone: true,
  templateUrl:'./login-form.component.html',
  imports: [CommonModule, InputComponent, ButtonComponent, ReactiveFormsModule]
})
export class LoginFormComponent {
  constructor(private toastr:ToastrService){}
  @Input() loginForm!: FormGroup;
  @Output() login = new EventEmitter<void>();

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }

  loginBtn() {
    if (this.loginForm.valid) {
      this.login.emit();
    }else{
      this.toastr.error('Please fill in the fields correctly','Error')
    }
  }
}