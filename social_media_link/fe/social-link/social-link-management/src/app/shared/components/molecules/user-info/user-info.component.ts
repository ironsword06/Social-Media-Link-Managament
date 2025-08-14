import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../actions/states/services/models/user.model';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UpdateUserInfo } from '../../../states/actions/user.actions';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserInfoComponent implements OnInit {
  visible: boolean = true;
  isEditMode: boolean = false;
  editForm!: FormGroup;
  passwordMismatch: boolean = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: User | null,
    private dialogRef: MatDialogRef<UserInfoComponent>
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.editForm = this.fb.group({
      username: [this.data?.username, Validators.required],
      email: [this.data?.email, [Validators.required, Validators.email]],
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

    this.editForm.valueChanges.subscribe(() => {
      this.checkPasswordMismatch();
    });
  }

  checkPasswordMismatch() {
    const password = this.editForm.get('password')?.value;
    const confirmPassword = this.editForm.get('confirmPassword')?.value;
    this.passwordMismatch = password !== confirmPassword;
  }

  onEdit(): void {
    this.isEditMode = true;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCancelEdit(): void {
    this.isEditMode = false;
    this.editForm.reset({
      username: this.data?.username,
      email: this.data?.email,
    });
  }

  onSubmit(): void {
    if (this.editForm.valid && !this.passwordMismatch) {
      this.store.dispatch(new UpdateUserInfo(this.editForm.value));
      this.toastr.success('User updated successfully!', 'Success');
      this.isEditMode = false;
      window.location.reload();
    } else {
      this.toastr.error('Please fill in the fields correctly.', 'Error');
    }
  }

  get usernameControl(): FormControl {
    return this.editForm.get('username') as FormControl;
  }

  get emailControl(): FormControl {
    return this.editForm.get('email') as FormControl;
  }

  get passwordControl(): FormControl {
    return this.editForm.get('password') as FormControl;
  }

  get confirmPasswordControl(): FormControl {
    return this.editForm.get('confirmPassword') as FormControl;
  }
}
