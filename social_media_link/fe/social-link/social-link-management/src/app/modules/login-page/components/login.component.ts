import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/guard/auth.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common';
import { Signup } from '../../../shared/states/actions/user.actions';
import { ToastrService } from 'ngx-toastr';
import { AtomButtonComponent } from '../../../shared/components/atoms/atom-btn/atom-btn.component';
import { AuthFormComponent } from '../../../shared/components/organisms/auth-form/auth-form.component';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AuthFormComponent,
    AtomButtonComponent,
    ButtonModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;
  isSignupVisible = false;
  isLoginVisible = true;
  passwordMismatch = false;

  constructor(
    private authService: AuthService,
    private store: Store,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForms();
  }

  private createForms() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(24),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/
          ),
        ],
      ],
      confirmPassword: ['', Validators.required],
    });
  }

  showSignup() {
    this.isSignupVisible = true;
    this.isLoginVisible = false;
  }

  showLogin() {
    this.isSignupVisible = false;
    this.isLoginVisible = true;
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigateByUrl('/dashboard');
          this.toastr.success('Successfully logined.', 'Success');
        },
        error: (err) => {
          this.toastr.error(err.error.error, 'Error');
        },
      });
    }
  }

  signup() {
    if (this.signupForm.valid) {
      const { username, email, password } = this.signupForm.value;
      const request = this.signupForm.value;
      this.store.dispatch(new Signup(request)).subscribe(() => {
        this.toastr.success('Sign Up Successful!', 'Success');
        this.isLoginVisible = true;
        this.isSignupVisible = false;
        this.signupForm.reset();
      });
    } else {
      this.passwordMismatch = this.signupForm.hasError('passwordMismatch');
    }
  }
}
