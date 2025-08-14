import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../atoms/input/input.component';
import { ButtonComponent } from '../../atoms/button/button.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  imports: [CommonModule, InputComponent, ButtonComponent, ReactiveFormsModule],
  standalone: true,
})
export class SignupFormComponent implements OnChanges {
  constructor(private toastr: ToastrService) {}

  @Input() signupForm!: FormGroup;
  @Input() passwordMismatch: boolean = false;
  @Output() signupClicked = new EventEmitter<void>();

  get usernameControl(): FormControl {
    return this.signupForm.get('username') as FormControl;
  }

  get emailControl(): FormControl {
    return this.signupForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.signupForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.signupForm.get('confirmPassword') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['signupForm']) {
      this.signupForm.valueChanges.subscribe(() => {
        this.checkPasswordMismatch();
      });
    }
  }

  private checkPasswordMismatch() {
    const password = this.passwordControl.value;
    const confirmPassword = this.confirmPasswordControl.value;
    this.passwordMismatch = password !== confirmPassword;
  }

  signup() {
    if (this.signupForm.valid && !this.passwordMismatch) {
      this.signupClicked.emit();
    } else {
      this.toastr.error('Please fill in the fields correctly', 'Error');
    }
  }
}
