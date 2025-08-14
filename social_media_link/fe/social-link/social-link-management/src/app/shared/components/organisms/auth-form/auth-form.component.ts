import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';
import { SignupFormComponent } from '../../molecules/signup-form/signup-form.component';


@Component({
  selector: 'app-auth-form',
  standalone: true,
  templateUrl:'./auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, LoginFormComponent, SignupFormComponent]
})
export class AuthFormComponent {
  @Input() isLoginVisible = true;
  @Input() isSignupVisible = false;
  @Input() loginForm!: FormGroup;
  @Input() signupForm!: FormGroup;
  @Input() passwordMismatch = false;

  @Output() showSignup = new EventEmitter<void>();
  @Output() showLogin = new EventEmitter<void>();
  @Output() login = new EventEmitter<void>();
  @Output() signup = new EventEmitter<void>();

  onShowSignup() {
    this.loginForm.reset()
    this.showSignup.emit();
  }

  onShowLogin() {
    this.signupForm.reset()
    this.showLogin.emit();
  }

  onLogin() {
    this.login.emit();
  }

  onSignup() {
    this.signup.emit();
  }
}