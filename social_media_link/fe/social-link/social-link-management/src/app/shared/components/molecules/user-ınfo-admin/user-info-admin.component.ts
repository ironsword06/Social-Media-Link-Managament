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
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { UserState } from '../../../states/user.state';
import { Store } from '@ngxs/store';
import { AdminDeactivateUser, AdminUpdateUser, GetUserInfo } from '../../../states/actions/user.actions';
import { SocialLink } from '../../../actions/states/services/models/social-link.model';

@Component({
  selector: 'app-user-info-admin',
  templateUrl: './user-info-admin.component.html',
  styleUrls: ['./user-info-admin.component.css'],
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
export class UserInfoAdminComponent implements OnInit {
  visible: boolean = true;
  isEditMode: boolean = false;
  editForm!: FormGroup;
  passwordMismatch: boolean = false;
  email:string;
  username:string;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private store:Store,
    @Inject(MAT_DIALOG_DATA) public data: SocialLink,
    private dialogRef: MatDialogRef<UserInfoAdminComponent>
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.loadUserInfo(this.data.user_id);
    }
    this.initForm();
  }

  initForm() {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadUserInfo(userId: number) {
    this.store.dispatch(new GetUserInfo(userId)).subscribe(() => {
      const user = this.store.selectSnapshot(UserState.getUser);
      if (user) {
        this.email = user.email
        this.username = user.username
        this.editForm.patchValue({
          username: user.username,
          email: user.email,
        });
      }
    });
  }

  onEdit(): void {
    this.isEditMode = true;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCancelEdit(): void {
    this.isEditMode = false;
    const user = this.store.selectSnapshot(UserState.getUser)
    this.editForm.reset({
      username: user.username,
      email: user.email,
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.toastr.error('Please fill in the fields correctly.', 'Error');
      return;
    }
    this.store.dispatch(new AdminUpdateUser(this.data.user_id, this.editForm.value))
      .subscribe({
        next: () => {
          this.toastr.success('User updated successfully!', 'Success');
          this.isEditMode = false;
          this.dialogRef.close(true);
          window.location.reload()
        },
        error: (err) => {
          this.toastr.error(err.error.error, 'Error');
        }
      });
  }

  onDelete(): void {
    this.store.dispatch(new AdminDeactivateUser(this.data.user_id)).subscribe({
      next: () => {
        this.toastr.success('User deactivated successfully!', 'Success');
        this.isEditMode = false;
        this.dialogRef.close(true);
        window.location.reload()
      },
      error: (err) => {
        this.toastr.error(err.error.error, 'Error');
      }
    });
  }

  get usernameControl(): FormControl {
    return this.editForm.get('username') as FormControl;
  }

  get emailControl(): FormControl {
    return this.editForm.get('email') as FormControl;
  }
}
